package gov.nist.vrs_backendspring.model.aggregatedmodel;

public class ErrorsByCategory {
    public String category;
    public String number;
    public String rank;

    public ErrorsByCategory(String category, String number, String rank) {
        this.category = category;
        this.number = number;
        this.rank = rank;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }
}