import { BehaviorSubject, filter, map, Observable, of } from "rxjs";
import { Classification, ErrorCounts } from "../Model/errorCounts.model";
import { GeneralInfo } from "../Model/generalInfo.model";
import { ErrorsByCategory } from "../Model/errorsByCategory.model";
import { ErrorsByLocation } from "../Model/errorsByLocation.model";
import { Detection, Detections } from "../Model/detection.model";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AggregatedReport } from "../Model/aggregatedReport.model";

@Injectable({
  providedIn: 'root' // This specifies that the service is provided at the root level
})

export class DataService {

  private baseUrl = 'http://localhost:8080/vrs/';
  data: BehaviorSubject<AggregatedReport> = new BehaviorSubject(undefined);
  constructor(private http: HttpClient) {
    // this.getAggregatedModel().pipe(
    //   map((model) => {
    //     this.data.next(model)
    //   })
    // ).subscribe();
  }

  uploadFiles(files: File[]): Observable<AggregatedReport> {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
  }
   
    // Replace 'your_upload_url' with your actual backend API endpoint for file upload
    console.log('Uploading files:', files);

    return this.http.post<AggregatedReport>(this.baseUrl + "uploadFiles", formData);
  }

  setData(report: AggregatedReport) {
    this.data.next(report);
  }

  getAggregatedModel(): Observable<AggregatedReport> {
    return this.http.get<AggregatedReport>(this.baseUrl + "aggregatedReport");
  }

  getErrorsByCategory(): Observable<ErrorsByCategory[]> {
    return this.data.pipe(
      map((aggregatedReport) => {
        if (aggregatedReport) {
          return aggregatedReport.errorsByCategory;
        } else {
          // Return an empty array or handle the case when 'data' is undefined
          return [];
        }
      })
    );
  }

  getErrorsByLocation(): Observable<ErrorsByLocation[]> {
    return this.data.pipe(
      map((aggregatedReport) => {
        if (aggregatedReport) {
          return aggregatedReport.errorsByLocation;
        } else {
          // Return an empty array or handle the case when 'data' is undefined
          return [];
        }
      })
    );
  }

  getDetections(): Observable<Detections> {
    return this.data.pipe(
      filter((data) => data !== undefined),
      map((aggregatedReport) => {
        return { detections: aggregatedReport.detections }; // Wrap the detections in a Detections object
      })
    );
  }
  // getGeneralInfo(): GeneralInfo {
  //     const generalInfo: GeneralInfo = {
  //       messagesNumber: '100',
  //       profileName: 'VXU',
  //       passedMessagesNumber: '80',
  //       failedMessagesNumber: '20'
  //     };

  getGeneralInfo(): Observable<GeneralInfo> {
    return this.data.pipe(
      filter((data) => data !== undefined),
      map((aggregatedReport) => {
        return aggregatedReport.generalInfo;
      })
    );
  }

  getErrorCounts(): Observable<any> {
    return this.data.pipe(
      filter((data) => data !== undefined),
      map((aggregatedReport) => {
        return aggregatedReport.detectionCounts;
      })
    );
  }

  // getErrorCounts(): { type: string, count: number }[] {

  //   const  errorCounts: ErrorCounts[] = [
  //       { type: Classification.ERROR, count: 68 },
  //       { type: Classification.WARNING, count: 13 },
  //       { type: Classification.INFORMATIONAL, count: 40 },
  //       { type: Classification.ALERT, count: 40 },
  //       { type: Classification.AFFIRMATIVE, count: 40 },
  //       { type: 'Total', count: 201 }

  //       // Add more dummy error counts as needed
  //     ];

  //   return errorCounts;
  // }
  // getErrorsByCategory(): ErrorsByCategory[] {
  //   const categories: string[] = [
  //     "Usage",
  //     "O-Usage",
  //     "Cardinality",
  //     "Length",
  //     "Length Spec Error",
  //     "Format",
  //     "Invalid Content",
  //     "Unescaped Separator",
  //     "Constant Value",
  //   ];

  //   const errorsByCategory: ErrorsByCategory[] = [];

  //   // Generate data for each category
  //   for (let i = 0; i < categories.length; i++) {
  //     const category = categories[i];
  //     let errorNumber: string;
  //     if (category === "Usage") {
  //       errorNumber = "98";
  //     } else {
  //       errorNumber = (Math.floor(Math.random() * 50) + 1).toString();
  //     }
  //     errorsByCategory.push({ category, number: errorNumber, rank: "" });
  //   }

  //   // Determine the ranking based on the number of errors
  //   errorsByCategory.sort((a, b) => parseInt(b.number) - parseInt(a.number));
  //   errorsByCategory.forEach((error, index) => {
  //     error.rank = (index + 1).toString();
  //   });

  //   return errorsByCategory;
  // }




  // getErrorsByLocation(): ErrorsByLocation[] {
  //   const locations: string[] = [
  //     "PID",
  //     "PID-1.2",
  //     "MSH",
  //     "MSH-3",
  //     "OBX-2",
  //     "OBX-1.6",
  //     "OBX",
  //     "OBX-1.5",
  //     "OBX-1.5.3",
  //   ];

  //   const errorsByLocation: ErrorsByLocation[] = [];

  //   // Generate data for each location
  //   for (let i = 0; i < locations.length; i++) {
  //     const location = locations[i];
  //     let errorNumber: string;
  //     if (location === "OBX-2") {
  //       errorNumber = "76";
  //     } else {
  //       errorNumber = (Math.floor(Math.random() * 50) + 1).toString();
  //     }
  //     errorsByLocation.push({ location, number: errorNumber, rank: "" });
  //   }

  //   // Determine the ranking based on the number of errors
  //   errorsByLocation.sort((a, b) => parseInt(b.number) - parseInt(a.number));
  //   errorsByLocation.forEach((error, index) => {
  //     error.rank = (index + 1).toString();
  //   });

  //   return errorsByLocation;
  // }

  populateDetections(): Detections {
    const detections: Detection[] = [];
    const totalDetections = 100;
    const errorCount = 20;
    const warningCount = 30;
    const affirmativeCount = 40;
    const alertCount = 10;

    let currentErrorCount = 0;
    let currentWarningCount = 0;
    let currentAffirmativeCount = 0;
    let currentAlertCount = 0;

    for (let i = 0; i < totalDetections; i++) {
      let classification!: string;
      let category!: string;

      if (currentErrorCount < errorCount) {
        classification = 'error';
        category = this.getRandomCategory();
        currentErrorCount++;
      } else if (currentWarningCount < warningCount) {
        classification = 'warning';
        category = this.getRandomCategory();
        currentWarningCount++;
      } else if (currentAffirmativeCount < affirmativeCount) {
        classification = 'affirmative';
        category = this.getRandomCategory();
        currentAffirmativeCount++;
      } else if (currentAlertCount < alertCount) {
        classification = 'alert';
        category = this.getRandomCategory();
        currentAlertCount++;
      }

      const location = this.getRandomLocation();
      const line = this.getRandomNumber(1, 100).toString();
      const column = this.getRandomNumber(1, 10).toString();
      const total = this.getRandomNumber(1, 5);
      const id = this.getRandomNumber(1, 10);
      const description = 'Sample description';

      const detection: Detection = {
        location,
        line,
        column,
        classification,
        category,
        total,
        id,
        description,
      };

      detections.push(detection);
    }

    return { detections };
  }

  private getRandomLocation(): string {
    const locations: string[] = [
      'OBX[3]-14[1]',
      'OBX[4]-14[1]',
      'OBX[5]-14[1]',
      'ORC[1]-17[1]',
      'ORC[1]-12[1].13',
      'ORC[1]-12[1].4',
      'ORC[1]-10[1].13',
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  }

  private getRandomCategory(): string {
    const categories: string[] = [
      'USAGE',
      'LENGTH',
      'FORMAT',
      'CARDINALITY',
      'INVALID CONTENT',
      'UNESCAPED SEPARATOR',
      'CONSTANT VALUE',
    ];
    return categories[Math.floor(Math.random() * categories.length)];
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}


