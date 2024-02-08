import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Detection } from 'src/app/Model/detection.model';

interface Column {
  field: string;
  header: string;
}



@Component({
  selector: 'app-errors-dialog',
  templateUrl: './errors-dialog.component.html',
  styleUrls: ['./errors-dialog.component.scss']
})
export class ErrorsDialogComponent {
  cols!: Column[];

  constructor(
    public dialogRef: MatDialogRef<ErrorsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Detection[],
  ) {}

  ngOnInit() {
    this.cols = [
        { field: 'location', header: 'Location' },
        { field: 'line', header: 'Line' },
        { field: 'column', header: 'Column' },
        { field: 'classification', header: 'Classification' },
        { field: 'category', header: 'Category' },
        { field: 'total', header: 'Total' },
        { field: 'description', header: 'Description' },
      ];

    }
  
}

// interface Detection {
//   location: string;
//   line: string;
//   column: string;
//   classification: string;
//   category: string;
//   total: number;
//   byMsg: {
//     id: number;
//     count: number;
//   }[];
//   detailsByMsg: {
//     id: number;
//     description: string;
//   }[];
// }