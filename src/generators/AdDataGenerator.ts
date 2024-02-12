import { faker } from "@faker-js/faker";
import { Ad } from "../schemas/ad";
import { GenerateData, generatedCsvData, generatedData } from "./GenerateData";

export class AdDataGenerator implements GenerateData {
  data: generatedData[] = [];

  generateData(numRecords: number) {
    // Generate ad data and return it
    const dataArray = Array(numRecords).fill(null).map(() => {
      return {
        adId: faker.string.uuid(),
        userId: faker.string.uuid(),
        timestamp: faker.date.recent(),
        location: faker.address.country(),
        device: faker.helpers.arrayElement(['Mobile', 'Desktop', 'Tablet']),
      };
    });

    this.data = [{ data: dataArray, type: 'ad' }];
    return this.data;
  }

  toCSV() {
    const csvArray: generatedCsvData[] = [];
    const header: (keyof Ad)[] = Object.keys(this.data[0].data) as (keyof Ad)[];
    
    const rows = this.data[0].data.map(obj => header.map((fieldName) => JSON.stringify(obj[fieldName])).join(','));
    csvArray.push({data:[header.join(','), ...rows].join('\r\n'), type: this.data[0].type});

    return csvArray;
  }
}