import { Component, Input } from '@angular/core';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast'; // Add this import
import { DataService } from 'src/app/Services/data.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
  providers: [MessageService]

})
export class ImportComponent {
  uploadedFiles: any[] = [];
  constructor(private messageService: MessageService, private dataService: DataService, private router: Router) {}

  onUpload(event: FileUploadEvent) {
    console.log("clicked");
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

    this.dataService.uploadFiles(this.uploadedFiles).subscribe(
      (response) => {
        // Handle the response from the server (e.g., success message, etc.)
        console.log('Upload response:', response);
        this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: 'Files have been uploaded to the server.' });
        this.dataService.setData(response);
        console.log(response);
        this.router.navigate(['analysis', 'summaryview'])
      },
      (error) => {
        // Handle the error
        console.error('Upload error:', error);
        this.messageService.add({ severity: 'error', summary: 'File Upload Error', detail: 'An error occurred while uploading files.' });
      }
    );}
onToastClose() {}

}
