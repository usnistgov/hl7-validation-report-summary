import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisComponent } from './Components/analysis/analysis.component';
import { SummaryViewComponent } from './Components/summary-view/summary-view.component';
import { DataOverviewComponent } from './Components/data-overview/data-overview.component';
import { ImportComponent } from './Components/import/import.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'import',
    pathMatch: 'full',
  },
  {
    path: 'analysis',
    component: AnalysisComponent,
    children: [
      {
        path: 'summaryview',
        component : SummaryViewComponent,

      },
      {
        path: 'dataoverview',
        component : DataOverviewComponent,

      }
    ]
  },
  {
    path: 'import',
    component: ImportComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
