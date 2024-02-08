import { Component, OnInit, ViewChild } from '@angular/core';
import { ErrorCounts, Classification } from 'src/app/Model/errorCounts.model';
import { GeneralInfo } from 'src/app/Model/generalInfo.model';
import { DataService } from 'src/app/Services/data.service';


@Component({
  selector: 'app-summary-view',
  templateUrl: './summary-view.component.html',
  styleUrls: ['./summary-view.component.scss']
})
export class SummaryViewComponent implements OnInit {
  generalInfo!: GeneralInfo;
  errorCounts!: ErrorCounts[];





  constructor(private dataService: DataService) { }

  ngOnInit() {
    // this.generalInfo = this.dataService.getGeneralInfo();
    // this.errorCounts = this.dataService.getErrorCounts();

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
