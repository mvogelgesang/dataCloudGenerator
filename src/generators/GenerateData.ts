export type generatedData = {
  data: any[];
  type: string;
};
export type generatedCsvData = {
  data: string;
  type: string;
};
export interface DataGenerator {
  data: generatedData[];
  // add a seed param that is a boolean and defaults to false
  generateData(count: number, seed?: boolean): generatedData[];
  toCSV(): generatedCsvData[];
}

/* Abstract class ensures that a common seed value is used across all implementations of the class */
export abstract class AbstractDataGenerator implements DataGenerator {
  protected seedValue: number;
  constructor() {
    this.seedValue = 123;
  }
  data: generatedData[] = [];
  abstract generateData(count: number, seed?: boolean): generatedData[];
  abstract toCSV(): generatedCsvData[];
}
