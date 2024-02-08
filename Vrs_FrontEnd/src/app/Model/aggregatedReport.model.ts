import { Detection } from "./detection.model";
import { ErrorsByCategory } from "./errorsByCategory.model";
import { ErrorsByLocation } from "./errorsByLocation.model";
import { GeneralInfo } from "./generalInfo.model";

export class AggregatedReport {
    generalInfo!: GeneralInfo;
    detectionCounts!: Record<string, string> ;
    errorsByCategory: ErrorsByCategory[] = [];
    errorsByLocation: ErrorsByLocation[] = [];
    detections: Detection[] = [];
}