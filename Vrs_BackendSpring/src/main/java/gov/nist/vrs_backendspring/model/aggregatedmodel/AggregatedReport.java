package gov.nist.vrs_backendspring.model.aggregatedmodel;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class AggregatedReport {
    public GeneralInfo generalInfo;
    Map<String, String> detectionCounts;
    List<ErrorsByCategory> errorsByCategory = new ArrayList<ErrorsByCategory>();

    List<ErrorsByLocation> errorsByLocation = new ArrayList<ErrorsByLocation>();

    List<Detection> detections = new ArrayList<Detection>();

    public AggregatedReport() {
        // Default constructor
    }

    public AggregatedReport(GeneralInfo generalInfo, Map<String, String> detectionCounts, List<ErrorsByCategory> errorsByCategory, List<ErrorsByLocation> errorsByLocation, List<Detection> detections) {
        this.generalInfo = generalInfo;
        this.detectionCounts = detectionCounts;
        this.errorsByCategory = errorsByCategory;
        this.errorsByLocation = errorsByLocation;
        this.detections = detections;
    }

    public List<Detection> getDetections() {
        return detections;
    }

    public void setDetections(List<Detection> detections) {
        this.detections = detections;
    }

    public List<ErrorsByLocation> getErrorsByLocation() {
        return errorsByLocation;
    }

    public void setErrorsByLocation(List<ErrorsByLocation> errorsByLocation) {
        this.errorsByLocation = errorsByLocation;
    }

    public List<ErrorsByCategory> getErrorsByCategory() {
        return errorsByCategory;
    }

    public void setErrorsByCategory(List<ErrorsByCategory> errorsByCategory) {
        this.errorsByCategory = errorsByCategory;
    }

    public GeneralInfo getGeneralInfo() {
        return generalInfo;
    }

    public void setGeneralInfo(GeneralInfo generalInfo) {
        this.generalInfo = generalInfo;
    }

    public Map<String, String> getDetectionCounts() {
        return detectionCounts;
    }

    public void setDetectionCounts(Map<String, String> detectionCounts) {
        this.detectionCounts = detectionCounts;
    }

}
