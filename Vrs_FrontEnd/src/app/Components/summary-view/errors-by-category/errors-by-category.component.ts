import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { ErrorsByCategory } from 'src/app/Model/errorsByCategory.model';
import { DataService } from 'src/app/Services/data.service';


@Component({
  selector: 'app-errors-by-category',
  templateUrl: './errors-by-category.component.html',
  styleUrls: ['./errors-by-category.component.scss']
})
export class ErrorsByCategoryComponent {
  errorsByCategory: MatTableDataSource<ErrorsByCategory> = new MatTableDataSource([]);
  listErrorsByCategory!: ErrorsByCategory[];
  displayedColumns: string[] = ['rank', 'category', 'number'];
  pieOptions: any;
  pieData: any;
  


  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private dataService: DataService) { }
  
  // testFunction() {
  //   console.log("Before Subscribe");
  //   of([1]).subscribe((data) => {
  //     console.log("Inside Subscribe");
  //   });
  //   console.log("After Subscribe");
  // }

  ngOnInit() {

    this.dataService.getErrorsByCategory().subscribe((errorsByCategoryData) => {
      // Assign the data to your component variable
      this.listErrorsByCategory = errorsByCategoryData;
      console.log("Look Here component : " , errorsByCategoryData);


      // this.listErrorsByCategory = this.dataService.getErrorsByCategory();
      this.errorsByCategory.data = this.listErrorsByCategory;

      // Sort the errorsByCategory list by rank (assuming rank is numeric)
      const sortedErrors = this.listErrorsByCategory.sort((a, b) => parseInt(a.rank) - parseInt(b.rank));

      // Get the top 5 ranking elements
      const top5Errors = sortedErrors.slice(0, 5);

      // Extract the labels and data from the top 5 errors
      const labels: string[] = top5Errors.map((error) => error.category);
      const data: number[] = top5Errors.map((error) => parseInt(error.number));

      // Generate the backgroundColor and hoverBackgroundColor arrays dynamically
      const backgroundColors: string[] = top5Errors.map((_, index) => {
        const colorNames = ['orange', 'green', 'blue', 'red', 'purple']; // Add more colors if needed
        return colorNames[index % colorNames.length];
      });

      const hoverBackgroundColors: string[] = backgroundColors;

      // Create the final pieData object
      this.pieData = {
        labels,
        datasets: [
          {
            data,
            backgroundColor: backgroundColors,
            hoverBackgroundColor: hoverBackgroundColors,
          },
        ],
      };

      console.log(this.pieData);

      // Example pieOptions (you can customize as needed)
      this.pieOptions = {
        cutout: '60%',
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
    this.errorsByCategory.paginator = this.paginator;
  }

 
}
