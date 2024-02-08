export interface ErrorCounts {
  type: string;
  count: number;
}

export enum Classification {
  ERROR = "Error",
  WARNING = "Warning",
  INFORMATIONAL = "Informational",
  AFFIRMATIVE = "Affirmative",
  ALERT = "Alert"

}