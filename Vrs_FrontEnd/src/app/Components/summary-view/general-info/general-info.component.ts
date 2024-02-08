import { Component } from '@angular/core';
import { ErrorCounts, Classification } from 'src/app/Model/errorCounts.model';
import { GeneralInfo } from 'src/app/Model/generalInfo.model';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent {
  generalInfo!: GeneralInfo;
  errorCounts!: ErrorCounts[];





  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getGeneralInfo().subscribe((generalInfo) => {
      this.generalInfo = generalInfo;
      console.log("General Info in generalinfo comp : " , this.generalInfo);
    });
  // this.dataService.getGeneralInfo().subscribe((detectionCounts) => {
  //   this.errorCounts = detectionCounts;
  // });

    // this.generalInfo = this.dataService.getGeneralInfo();
    this.dataService.getErrorCounts().subscribe((errorCounts) => {
      this.errorCounts = errorCounts;
      console.log("ErrorCounts in generalinfo comp : " , this.errorCounts);
    });

  }

  getCountClass(errorType: string): string {
    switch (errorType) {
      case Classification.ERROR:
        return 'error';
      case Classification.WARNING:
        return 'warning';
      case Classification.INFORMATIONAL:
        return 'informational';
      case Classification.ALERT:
        return 'alert';
      case Classification.AFFIRMATIVE:
        return 'affirmative';
      default:
        return '';
    }
  }

}
