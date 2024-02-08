import { Component, Input } from '@angular/core';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast'; // Add this import



import { HeaderComponent } from './Components/header/header.component';
import { DataService } from './Services/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]

})
export class AppComponent {
  
  title = 'Vrs_Tool';
  uploadedFiles: any[] = [];
  constructor(private messageService: MessageService, private dataService: DataService) {}

  onUpload(event: FileUploadEvent) {
    console.log("clicked");
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

    this.dataService.uploadFiles(event.files).subscribe(
      (response) => {
        // Handle the response from the server (e.g., success message, etc.)
        console.log('Upload response:', response);
        this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: 'Files have been uploaded to the server.' });
      },
      (error) => {
        // Handle the error
        console.error('Upload error:', error);
        this.messageService.add({ severity: 'error', summary: 'File Upload Error', detail: 'An error occurred while uploading files.' });
      }
    );}
onToastClose() {}

}


