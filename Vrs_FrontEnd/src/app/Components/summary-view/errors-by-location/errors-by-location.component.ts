import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ErrorsByLocation } from 'src/app/Model/errorsByLocation.model';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-errors-by-location',
  templateUrl: './errors-by-location.component.html',
  styleUrls: ['./errors-by-location.component.scss']
})
export class ErrorsByLocationComponent {
  errorsByLocation: MatTableDataSource<ErrorsByLocation> = new MatTableDataSource([]);
  listErrorsByLocation!: ErrorsByLocation[];
  displayedColumns: string[] = ['rank', 'location', 'number'];
  pieOptions: any;
  pieData: any;


  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getErrorsByLocation().subscribe((errorsByLocationData) => {
      // Assign the data to your component variable
      this.listErrorsByLocation = errorsByLocationData;
      console.log("errorsByLocationData : " , errorsByLocationData);

      
     this.errorsByLocation.data = this.listErrorsByLocation;



    // Sort the errorsByCategory list by rank (assuming rank is numeric)
    const sortedErrors = this.listErrorsByLocation.sort((a, b) => parseInt(a.rank) - parseInt(b.rank));

    // Get the top 5 ranking elements
    const top5Errors = sortedErrors.slice(0, 5);

    // Extract the labels and data from the top 5 errors
    const labels: string[] = top5Errors.map((error) => error.location);
    const data: number[] = top5Errors.map((error) => parseInt(error.number));

    // Generate the backgroundColor and hoverBackgroundColor arrays dynamically
    const backgroundColors: string[] = top5Errors.map((_, index) => {
      const colorNames = ['lightblue']; // Add more colors if needed
      return colorNames[index % colorNames.length];
    });

    const hoverBackgroundColors: string[] = backgroundColors;

    // Create the final pieData object
    this.pieData = {
      labels,
      datasets: [
        {
          label: 'Number of errors by location',
          data,
          backgroundColor: backgroundColors,
          hoverBackgroundColor: hoverBackgroundColors,
        },
      ],
    };

    console.log(this.pieData);

    // Example pieOptions (you can customize as needed)
    this.pieOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: 'gray',
          },
        },
      },
    };
  }); 

  }

  ngAfterViewInit() {
    this.errorsByLocation.paginator = this.paginator;
  }


}
