package gov.nist.vrs_backendspring.model.aggregatedmodel;

public class ErrorsByLocation {
    public String location;
    public String number;
    public String rank;

    public ErrorsByLocation(String location, String number, String rank) {
        this.location = location;
        this.number = number;
        this.rank = rank;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
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
