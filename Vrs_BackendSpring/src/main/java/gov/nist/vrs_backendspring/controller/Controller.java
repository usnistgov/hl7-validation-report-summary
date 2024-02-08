package gov.nist.vrs_backendspring.controller;

import gov.nist.vrs_backendspring.Parser.XMLParser;
import gov.nist.vrs_backendspring.model.aggregatedmodel.AggregatedReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/vrs")
public class Controller {
    @Autowired
    private XMLParser xmlParser;
    @CrossOrigin(origins = "http://localhost:8080")

//    @GetMapping("/aggregatedReport")
//    public AggregatedReport getAggregatedReport() {
//        // Create an instance of AggregatedReport (replace with your logic to populate the object)
//        AggregatedReport aggregatedReport = xmlParser.run();
//        return aggregatedReport; // Spring Boot will serialize it to JSON automatically
//    }
    @PostMapping("/uploadFiles")
    public AggregatedReport handleFileUpload(@RequestParam("files") List<MultipartFile> files) {
        System.out.println("in upload files" );
        System.out.println("Received files: " + files.size() + " files.");

        for (MultipartFile file : files) {
            System.out.println("found one");

            if (!file.isEmpty()) {
                String fileName = file.getOriginalFilename();
                System.out.println("Received file: " + fileName);
                // You can further process the file here, save it, or perform any necessary operations.
            }
        }
         return xmlParser.run(files);
    }
}
