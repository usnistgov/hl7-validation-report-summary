export interface Detection {
    location: string;
    line: string;
    column: string;
    classification: string;
    category: string;
    total: number;
    // byMsg: {
  //   id: number;
    //   count: number;
    // }[];
    
      id: number;
      description: string;
    
  }
  
  export interface Detections {
    detections: Detection[];
  }