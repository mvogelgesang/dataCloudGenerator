import { faker } from "@faker-js/faker";
import { Ad } from "../schemas/ad";
import {
  AbstractDataGenerator,
  GeneratedCsvData,
  GeneratedData,
} from "./GenerateData";

export class AdDataGenerator extends AbstractDataGenerator<Ad> {
  generateData(numRecords: number, seed: boolean = false) {
    if (seed) {
      faker.seed(this.seedValue);
    }
    // Generate ad data and return it
    const dataArray: Ad[] = Array(numRecords)
      .fill(null)
      .map(() => {
        return {
          adId: faker.string.uuid(),
          userId: faker.string.uuid(),
          createdAt: faker.date.recent(),
          location: faker.location.country(),
          device: faker.helpers.arrayElement(["Mobile", "Desktop", "Tablet"]),
        };
      });

    return { data: dataArray, type: "ad" };
  }

  toCSV(createdData: GeneratedData<Ad>) {
    const csvArray: GeneratedCsvData[] = [];
    const header: (keyof Ad)[] = Object.keys(
      createdData.data[0]
    ) as (keyof Ad)[];

    const rows = createdData.data.map((obj) =>
      header.map((fieldName) => JSON.stringify(obj[fieldName])).join(",")
    );
    csvArray.push({
      data: [header.join(","), ...rows].join("\r\n"),
      type: createdData.type,
    });

    return csvArray;
  }
}
