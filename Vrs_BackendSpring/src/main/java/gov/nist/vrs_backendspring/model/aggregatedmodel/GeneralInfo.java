package gov.nist.vrs_backendspring.model.aggregatedmodel;

public class GeneralInfo {
    private int messagesNumber;
    private String ProfileName;
    private int reportsWithoutErrors;
    private int reportsWithErrors;

    public int getMessagesNumber() {
        return messagesNumber;
    }

    public void setMessagesNumber(int messagesNumber) {
        this.messagesNumber = messagesNumber;
    }

    public String getProfileName() {
        return ProfileName;
    }

    public void setProfileName(String profileName) {
        ProfileName = profileName;
    }

    public int getReportsWithoutErrors() {
        return reportsWithoutErrors;
    }

    public void setReportsWithoutErrors(int reportsWithoutErrors) {
        this.reportsWithoutErrors = reportsWithoutErrors;
    }

    public int getReportsWithErrors() {
        return reportsWithErrors;
    }

    public void setReportsWithErrors(int reportsWithErrors) {
        this.reportsWithErrors = reportsWithErrors;
    }
}
