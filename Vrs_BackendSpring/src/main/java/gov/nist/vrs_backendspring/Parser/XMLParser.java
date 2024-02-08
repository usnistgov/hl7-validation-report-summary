package gov.nist.vrs_backendspring.Parser;


import gov.nist.healthcare.unified.model.EnhancedReport;
import gov.nist.healthcare.unified.model.impl.ModelImpl;
import gov.nist.vrs_backendspring.model.aggregatedmodel.AggregatedReport;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.net.URL;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;
import java.util.UUID;

@Service
public class XMLParser {

    public  List<ModelImpl> processFolder(String folderPath) {
        List<ModelImpl> validationReports = new ArrayList<ModelImpl>();
        try {
            Files.walkFileTree(Paths.get(folderPath), EnumSet.noneOf(FileVisitOption.class), 1, new SimpleFileVisitor<Path>() {
                @Override
                public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                    ModelImpl validationReport = processFile(file.toString());
                    validationReports.add(validationReport);
                    return FileVisitResult.CONTINUE;
                }
            });
        } catch (IOException e) {
            e.printStackTrace();
        }
        return validationReports;
    }

    public  ModelImpl processFile(String filePath) {
        File file = new File(filePath);
        try {
            FileInputStream fis = new FileInputStream(file);
            InputStreamReader isr = new InputStreamReader(fis);
            BufferedReader br = new BufferedReader(isr);

            StringBuilder content = new StringBuilder();
            String line;

            while ((line = br.readLine()) != null) {
                content.append(line).append('\n');
            }

            br.close(); // Close the BufferedReader when done

            String fileContent = content.toString();
            EnhancedReport validationReport = EnhancedReport.from("xml", fileContent);
            ModelImpl reportModel = (ModelImpl) validationReport.to("model");
            return reportModel;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }


    public  AggregatedReport run(List<MultipartFile> files) {
        try {
            List<ModelImpl> validationReports = processFolder(createTemporaryFolder(files).toString());
            ModelTransformer modelTransformer = new ModelTransformer();
            AggregatedReport aggregatedReport = modelTransformer.transform(validationReports);
            System.out.println("DONE: ");
            return aggregatedReport;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public  Path createTemporaryFolder(List<MultipartFile> files) {
        try {
            // Create a unique temporary directory
            String uniqueDirectoryName = UUID.randomUUID().toString();
            Path tempDirectory = Files.createTempDirectory(uniqueDirectoryName);

            // Store each uploaded file in the temporary directory
            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    String uniqueFileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
                    Path filePath = tempDirectory.resolve(uniqueFileName);
                    Files.copy(file.getInputStream(), filePath);
                }
            }

            return tempDirectory;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
    public  void deleteTemporaryFolder(Path tempDirectory) {
        if (tempDirectory == null || !Files.exists(tempDirectory)) {
            return;
        }

        try {
            // Walk the directory tree and delete all files and directories
            Files.walkFileTree(tempDirectory, EnumSet.noneOf(FileVisitOption.class), Integer.MAX_VALUE, new SimpleFileVisitor<Path>() {
                @Override
                public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                    Files.delete(file);
                    return FileVisitResult.CONTINUE;
                }

                @Override
                public FileVisitResult visitFileFailed(Path file, IOException exc) throws IOException {
                    // Handle error during file visiting (if needed)
                    return FileVisitResult.CONTINUE;
                }

                @Override
                public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
                    Files.delete(dir);
                    return FileVisitResult.CONTINUE;
                }
            });
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
