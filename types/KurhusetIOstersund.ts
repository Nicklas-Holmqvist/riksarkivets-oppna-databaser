export interface KurhusetListItem {
  list_order: number;
  number: number;
  date_of_enrollment: string;
  first_name: string;
  last_name: string;
  full_name: string;
  age: string;
  title: string;
  family: string;
  village: string;
  parish: string;
  disease: string;
  disease_description: string;
  disease_treatment: string;
  discharge_date: string;
  discharge_status: string;
  period_of_care: string;
  observation: string;
  arkiv: string;
  volume: number;
}

export interface KurhusetList {
  list_order: number;
  number: number;
  date_of_enrollment: string;
  first_name: string;
  last_name: string;
  age: string;
  disease: string;
  discharge_date: string;
  discharge_status: string;
}
