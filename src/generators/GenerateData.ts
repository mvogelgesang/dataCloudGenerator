export type GeneratedData<T> = {
  data: T[];
  type: string;
};

export type GeneratedCsvData = {
  data: string;
  type: string;
};

export interface DataGenerator<T> {
  generateData(count: number, seed?: boolean): GeneratedData<T>| GeneratedData<T>[];
  toCSV(createdData: GeneratedData<T>): GeneratedCsvData[];
}

export abstract class AbstractDataGenerator<T> implements DataGenerator<T> {
  protected seedValue: number;
  constructor() {
    this.seedValue = 123;
  }
  abstract generateData(count: number, seed?: boolean): GeneratedData<T>|GeneratedData<T>[];
  abstract toCSV(createdData: GeneratedData<T>|GeneratedData<T>[]): GeneratedCsvData[];
}
