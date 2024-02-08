package gov.nist.vrs_backendspring.Parser;

import gov.nist.healthcare.unified.model.impl.*;
import gov.nist.vrs_backendspring.model.aggregatedmodel.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Collections;

@Service
public class ModelTransformer {
    public AggregatedReport transform(List<ModelImpl> validationReports) {
        AggregatedReport aggregatedReport = new AggregatedReport();
        GeneralInfo generalInfo = transformGeneralInfo(validationReports);
        List<Entry> allEntries = extractAllEntries(validationReports);
        Map<String, String> detectionCounts = transformDetectionCounts(allEntries);
        List<Detection> allDetections = extractAllDetections(allEntries);
        List<ErrorsByCategory> errorsByCategory = transformErrorsByCategory(allEntries);
        List<ErrorsByLocation> errorsByLocation = transformErrorsByLocation(allEntries);
        aggregatedReport.setGeneralInfo(generalInfo);
        aggregatedReport.setErrorsByCategory(errorsByCategory);
        aggregatedReport.setErrorsByLocation(errorsByLocation);
        aggregatedReport.setDetections(allDetections);
        aggregatedReport.setDetectionCounts(detectionCounts);
        return aggregatedReport;
    }

    public Map<String, String> transformDetectionCounts(List<Entry> allEntries) {
        // Create a map to store the count of each classification
        Map<String, Integer> classificationCountMap = new HashMap<>();

        // Count occurrences of each classification
        for (Entry entry : allEntries) {
            String classification = entry.getClassification();
            classificationCountMap.put(classification, classificationCountMap.getOrDefault(classification, 0) + 1);
        }

        // Convert the count map to a map of classification to count strings
        Map<String, String> detectionCounts = new HashMap<>();
        for (Map.Entry<String, Integer> entry : classificationCountMap.entrySet()) {
            detectionCounts.put(entry.getKey(), String.valueOf(entry.getValue()));
        }

        return detectionCounts;
    }


    public int calculateNumberOfErrorsByCategory(List<Entry> allEntries) {
        int count = 0;

        for (Entry entry : allEntries) {
            if (entry.getCategory() != null && entry.getCategory().equals("PREDICATE_SUCCESS")) {
                count++;
            }
        }

        return count;
    }

    public List<Entry> extractAllEntries(List<ModelImpl> validationReports) {
        List<Entry> allEntries = new ArrayList<>();

        // Iterate through each validation report
        for (ModelImpl report : validationReports) {
            // Extract entries from the report
            List<Entry> reportEntries = extractEntriesFromReport(report);
            allEntries.addAll(reportEntries);
        }
//        System.out.println("allEntries: "  + String.valueOf(this.calculateNumberOfErrorsByCategory(allEntries)));


        return allEntries;
    }

    private List<Entry> extractEntriesFromReport(ModelImpl report) {
        List<gov.nist.healthcare.unified.model.impl.Entry> reportEntries = new ArrayList<>();

        // Extract entries from the classification groups in the report
        for (ClassificationGroup classificationGroup : report.getClassifications()) {
            // Extract entries from the category groups in the classification group
            for (CategoryGroup categoryGroup : classificationGroup.getCategories()) {
                // Add entries to the reportEntries list
                reportEntries.addAll(categoryGroup.getEntries());
            }
        }
        return reportEntries;
    }

    public List<ErrorsByCategory> transformErrorsByCategory(List<Entry> allEntries) {
        // Create a map to store the count of each category for entries with a classification of "error"
        Map<String, Integer> categoryCountMap = new HashMap<>();

        // Count occurrences of each category for entries that have a classification of "error"
        for (Entry entry : allEntries) {
            String classification = entry.getClassification();
            if ("error".equalsIgnoreCase(classification)) {
                String category = entry.getCategory();
                categoryCountMap.put(category, categoryCountMap.getOrDefault(category, 0) + 1);
            }
        }

        // Create a list of ErrorsByCategory objects
        List<ErrorsByCategory> errorsByCategoryList = new ArrayList<>();

        // Iterate through the category counts and create ErrorsByCategory objects
        for (Map.Entry<String, Integer> entry : categoryCountMap.entrySet()) {
            String category = entry.getKey();
            int count = entry.getValue();

            errorsByCategoryList.add(new ErrorsByCategory(category, String.valueOf(count), ""));
        }

        // Sort the list by category counts (descending order)
        Collections.sort(errorsByCategoryList, (a, b) -> Integer.parseInt(b.getNumber()) - Integer.parseInt(a.getNumber()));

        // Assign ranks based on the sorted order
        for (int i = 0; i < errorsByCategoryList.size(); i++) {
            errorsByCategoryList.get(i).setRank(String.valueOf(i + 1));
        }

        return errorsByCategoryList;
    }

    private List<ErrorsByCategory> transformErrorsByCategory2(List<ModelImpl> validationReports) {
        // Initialize a map to store category counts
        Map<String, Integer> categoryCounts = new HashMap<>();

        // Iterate through validation reports
        for (ModelImpl model : validationReports) {
            ArrayList<ClassificationGroup> classificationGroups = model.getClassifications();

            // Iterate through classification groups
            for (ClassificationGroup classificationGroup : classificationGroups) {
                ArrayList<CategoryGroup> categoryGroups = classificationGroup.getCategories();

                // Iterate through category groups
                for (CategoryGroup categoryGroup : categoryGroups) {
                    String category = categoryGroup.getCategory();

                    // Check if the category exists in the map, if not, initialize it to 0
                    categoryCounts.putIfAbsent(category, 0);

                    // Increment the category count
                    categoryCounts.put(category, categoryCounts.get(category) + 1);
                }
            }
        }
        // Create a list of ErrorsByCategory objects from the categoryCounts map
        List<ErrorsByCategory> errorsByCategoryList = new ArrayList<>();
        int rank = 1; // Initialize rank

        for (Map.Entry<String, Integer> entry : categoryCounts.entrySet()) {
            String category = entry.getKey();
            String number = entry.getValue().toString();
            String rankStr = String.valueOf(rank);

            ErrorsByCategory errorsByCategory = new ErrorsByCategory(category, number, rankStr);
            errorsByCategoryList.add(errorsByCategory);

            rank++; // Increment rank for the next category
        }

        return errorsByCategoryList;
    }


    public List<ErrorsByLocation> transformErrorsByLocation(List<Entry> allEntries) {
        // Create a map to store the count of each location for entries with a classification of "error"
        Map<String, Integer> locationCountMap = new HashMap<>();

        // Count occurrences of each location for entries that have a classification of "error"
        for (Entry entry : allEntries) {
            String classification = entry.getClassification();
            if ("error".equalsIgnoreCase(classification)) {
                String location = entry.getPath(); // Assuming location is stored in the 'path' attribute
                locationCountMap.put(location, locationCountMap.getOrDefault(location, 0) + 1);
            }
        }

        // Create a list of ErrorsByLocation objects
        List<ErrorsByLocation> errorsByLocationList = new ArrayList<>();

        // Iterate through the location counts and create ErrorsByLocation objects
        for (Map.Entry<String, Integer> entry : locationCountMap.entrySet()) {
            String location = entry.getKey();
            int count = entry.getValue();

            errorsByLocationList.add(new ErrorsByLocation(location, String.valueOf(count), ""));
        }

        // Sort the list by location counts (descending order)
        Collections.sort(errorsByLocationList, (a, b) -> Integer.parseInt(b.getNumber()) - Integer.parseInt(a.getNumber()));

        // Assign ranks based on the sorted order
        for (int i = 0; i < errorsByLocationList.size(); i++) {
            errorsByLocationList.get(i).setRank(String.valueOf(i + 1));
        }

        return errorsByLocationList;
    }


    private GeneralInfo transformGeneralInfo(List<ModelImpl> validationReports) {
        GeneralInfo generalInfo = new GeneralInfo();

        // Initialize variables to track general info
        int reportsNumber = validationReports.size();
        int reportsWithoutErrors = 0;
        int reportsWithErrors = 0;
        String profileName = null;

        // Iterate through the validation reports
        for (ModelImpl model : validationReports) {
            Metadata metadata = model.getMetadata();
            ArrayList<ClassificationGroup> classificationGroups = model.getClassifications();

            // Check if profileName is the same for all reports
            if (profileName == null) {
                profileName = metadata.getProfileMessageType();
            } else if (!profileName.equals(metadata.getProfileMessageType())) {
                // If profileName is different in any report, set it to null (not all the same)
                profileName = null;
            }

            // Iterate through classification groups
            for (ClassificationGroup classificationGroup : classificationGroups) {
                ArrayList<CategoryGroup> categoryGroups = classificationGroup.getCategories();

                // Iterate through category groups
                for (CategoryGroup categoryGroup : categoryGroups) {
                    ArrayList<Entry> entries = categoryGroup.getEntries();

                    // Check if any entry has errors
                    boolean hasErrors = entries.stream().anyMatch(entry -> !entry.getStacktrace().isEmpty());

                    if (hasErrors) {
                        reportsWithErrors++;
                    } else {
                        reportsWithoutErrors++;
                    }
                }
            }
        }

        // Set the calculated values in the GeneralInfo object
        generalInfo.setMessagesNumber(reportsNumber);
        generalInfo.setProfileName(profileName);
        generalInfo.setReportsWithoutErrors(reportsWithoutErrors);
        generalInfo.setReportsWithErrors(reportsWithErrors);

        return generalInfo;
    }


    public List<Detection> extractAllDetections(List<Entry> allEntries) {
        List<Detection> allDetections = new ArrayList<>();

        for (Entry entry : allEntries) {
            // Check if the entry has the required attributes to create a Detection
            if (entry != null) {

                // Create a new Detection object and set its attributes
                Detection detection = new Detection();
                detection.setLocation(entry.getPath()); // Use "path" for location
                detection.setLine(String.valueOf(entry.getLine()));
                detection.setColumn(String.valueOf(entry.getColumn()));
                detection.setClassification(entry.getClassification());
                detection.setCategory(entry.getCategory());
//                detection.setTotal(entry.getTotal());
//                detection.setId(entry.getId());
                detection.setDescription(entry.getDescription());

                // Add the Detection object to the list
                allDetections.add(detection);
            }
        }

        return allDetections;
    }
}






