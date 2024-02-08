import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AggregatedReport } from 'src/app/Model/aggregatedReport.model';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent {
  data$: Observable<AggregatedReport>;

  constructor(private dataService: DataService) {
    this.data$ = dataService.data.asObservable();
  }

}
