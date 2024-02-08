import { Component } from '@angular/core';
import { Detection, Detections } from 'src/app/Model/detection.model';
import { DataService } from 'src/app/Services/data.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ErrorsDialogComponent } from './errors-dialog/errors-dialog.component';
import { Classification } from 'src/app/Model/errorCounts.model';
import { MultiSelectModule } from 'primeng/multiselect';




@Component({
  selector: 'app-data-overview',
  templateUrl: './data-overview.component.html',
  styleUrls: ['./data-overview.component.scss']
})
export class DataOverviewComponent {
  detections!: Detections;
  filteredDetections!: Detections;
  locations: string[] = [];
  categories: string[] = [];
  columns: {key: string, value: string }[] = [];
  selectedColumns: {key: string, value: string }[] = [
    { key: 'location', value: 'Location' },
    { key: 'total', value: 'Total' },
  ];
  data: Array<Record<string, string>> = [];
  hoveredCell: any;
  // checked: boolean = false;

  selectedDetectionTypes: { name: string, value: Classification }[] = []; // Stores the selected detection types


  // listener = (a, b) => {
  //   console.log(a, b);
  //   return b.valid;
  // }
  detectionsType: { name: string, value: Classification }[] = [
    { name: 'Error', value: Classification.ERROR },
    { name: 'Warning', value: Classification.WARNING },
    { name: 'Informational', value: Classification.INFORMATIONAL },
    { name: 'Affirmative', value: Classification.AFFIRMATIVE },
    { name: 'Alert', value: Classification.ALERT }
  ];

  constructor(private detectionService: DataService, public dialog: MatDialog) { }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(ErrorsDialogComponent, {
      data: data
    });
  }

  getSelectedColumnKeys(): string[] {
    return this.selectedColumns.map(column => column.value);
  }

  getData(selectedTypes: Classification[]): Array<Record<string, any>> {
    if (!this.detections) {
      return [];
    }

    const data = [];
    for (const location of this.locations) {
      let categoriesMap: Record<string, Detection[]> = {};

      for (const category of this.categories) {
        categoriesMap[category] = this.getDetectionsByLocationAndCategoryAndClassification(
          location,
          category,
          selectedTypes
        );
      }

      const total = Object.keys(categoriesMap).reduce((acc, a) => {
        return acc + categoriesMap[a].length;
      }, 0);

      // Only add to data if there are matching detections
      if (total > 0) {
        data.push({
          location,
          ...categoriesMap,
          total,
        });
      }
    }

    this.columns = [
      { key: 'location', value: 'Location' },
      { key: 'total', value: 'Total' },
      ...this.categories.map((category) => ({ key: category, value: category })),
    ];

    return data;
  }

 

  ngOnInit() {
    this.selectedDetectionTypes = [
      { name: 'Error', value: Classification.ERROR }
    ];
    this.detectionService.getDetections().subscribe((detections) => {
      this.detections = detections;
      console.log('Detections:', detections);
      this.extractLocations();
      this.extractCategories();
      this.data = [...this.getData(this.getSelectedClassificationValues())];
      this.selectedColumns = [
        ...this.columns,
      ]
      // console.log('Locations and Categories:', this.locations, this.categories);
      // console.log('Data:', this.data);
      // console.log('Columns:', this.columns);
    });
  }

  private extractLocations(): void {
    this.locations = [...new Set(this.detections.detections.map(detection => detection.location))];
  }

  private extractCategories(): void {
    this.categories = [...new Set(this.detections.detections.map(detection => detection.category))];
  }

  getCountByLocationAndCategory(location: string, category: string): number {
    return this.detections.detections.filter(
      detection => detection.location === location && detection.category === category
    ).length;
  }

  getDetectionsByLocationAndCategoryAndClassification(
    location: string,
    category: string,
    selectedTypes: Classification[]
  ): Detection[] {
    const filteredDetections = this.detections.detections.filter((detection) => {
      const classification = detection.classification.toUpperCase() as Classification; // Type assertion
      return (
        detection.location === location &&
        detection.category === category &&
        (selectedTypes.includes(classification))
      );
    });
    // console.log("Filtered Detections for", location, category, selectedTypes, filteredDetections);
    return filteredDetections;
  }

  onToggleChangeDetection(selected: any): void {
    this.data = [...this.getData(this.getSelectedClassificationValues())];
    console.log("selectedDetectionTypes", this.selectedDetectionTypes);
    console.log("filteredData", this.data);
  }

  onToggleChangeColumns(selected: any): void {
    this.data = [...this.getData(this.getSelectedClassificationValues())];
  }

  getSelectedClassificationValues() {
    return this.selectedDetectionTypes.map((classification) => classification.value.toUpperCase() as Classification);
  }

  isHovered(cell: any): boolean {
    return this.hoveredCell === cell;
  }

  onCellHover(cell: any): void {
    this.hoveredCell = cell;
  }

  onCellLeave(): void {
    this.hoveredCell = null;
  }

  // onToggleChange(checked: boolean): void {
  //   this.data = [... this.getData(checked)];
  // }
}
