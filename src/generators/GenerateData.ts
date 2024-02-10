export type generatedData = {
  data: any[];
  type: string;
};
export type generatedCsvData = {
  data: string;
  type: string;
};
export interface GenerateData {
  data: generatedData[];
  generateData(count: number): generatedData[];
  toCSV(): generatedCsvData[];
}
