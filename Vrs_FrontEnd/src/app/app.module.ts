import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { AnalysisComponent } from './Components/analysis/analysis.component';
import { SummaryViewComponent } from './Components/summary-view/summary-view.component';
import { DataOverviewComponent } from './Components/data-overview/data-overview.component';
import { DataService } from './Services/data.service';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ChartModule } from 'primeng/chart';
import { ErrorsByLocationComponent } from './Components/summary-view/errors-by-location/errors-by-location.component';
import { ErrorsByCategoryComponent } from './Components/summary-view/errors-by-category/errors-by-category.component';
import { GeneralInfoComponent } from './Components/summary-view/general-info/general-info.component';
import { TableModule } from 'primeng/table';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import { ErrorsDialogComponent } from './Components/data-overview/errors-dialog/errors-dialog.component';
import { FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { MultiSelectModule } from 'primeng/multiselect';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ImportComponent } from './Components/import/import.component'; // Add this import













@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AnalysisComponent,
    SummaryViewComponent,
    DataOverviewComponent,
    ErrorsByLocationComponent,
    ErrorsByCategoryComponent,
    GeneralInfoComponent,
    ErrorsDialogComponent,
    ImportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    ChartModule,
    TableModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    ToggleButtonModule,
    HttpClientModule,
    MultiSelectModule,
    FileUploadModule,
    ToastModule,
    

  ],
  providers: [DataService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
