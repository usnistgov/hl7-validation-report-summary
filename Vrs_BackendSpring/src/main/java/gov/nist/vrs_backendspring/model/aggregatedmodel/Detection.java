package gov.nist.vrs_backendspring.model.aggregatedmodel;

public class Detection {
    private String location;
    private String line;
    private String column;
    private String classification;
    private String category;
    private int total;
    private int id;
    private String description;

    // Constructors, getters, and setters for Detection class go here

    public Detection() {
        // Default constructor
    }

    public Detection(String location, String line, String column, String classification, String category, int total, int id, String description) {
        this.location = location;
        this.line = line;
        this.column = column;
        this.classification = classification;
        this.category = category;
        this.total = total;
        this.id = id;
        this.description = description;
    }

    // Add getters and setters for all fields

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getLine() {
        return line;
    }

    public void setLine(String line) {
        this.line = line;
    }

    public String getColumn() {
        return column;
    }

    public void setColumn(String column) {
        this.column = column;
    }

    public String getClassification() {
        return classification;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
