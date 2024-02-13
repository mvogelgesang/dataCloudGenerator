import { faker } from "@faker-js/faker";
import { Ecommerce } from "../schemas/ecommerce";
import { AbstractDataGenerator, GeneratedCsvData, GeneratedData } from "./GenerateData";

export class EcommerceAnalyticsDataGenerator extends AbstractDataGenerator<Ecommerce> {
  generateData(numRecords: number, seed: boolean = false) {
    if (seed) {
      faker.seed(this.seedValue);
    }
    // Generate ecommerce data and return it
    const ecommerceArray: Ecommerce[] = Array(numRecords)
      .fill(null)
      .map(() => {
        return {
          userId: faker.string.uuid(),
          sessionId: faker.string.uuid(),
          page: faker.helpers.arrayElement([
            "Home",
            "Product",
            "Cart",
            "Checkout",
          ]),
          action: faker.helpers.arrayElement([
            "Add to Cart",
            "Checkout Complete",
            "Checkout Start",
            "Click",
            "Remove from Cart",
            "View",
          ]),
          createdAt: faker.date.recent(),
        };
      });
    return { data: ecommerceArray, type: "ecommerce" };
  }

  toCSV(createdData: GeneratedData<Ecommerce>) {
    const csvArray: GeneratedCsvData[] = [];
    const header: (keyof Ecommerce)[] = Object.keys(
      createdData.data[0]
    ) as (keyof Ecommerce)[];

    const rows = createdData.data.map(obj =>
      header.map((fieldName) => JSON.stringify(obj[fieldName])).join(",")
    );
    csvArray.push({
      data: [header.join(","), ...rows].join("\r\n"),
      type: createdData.type,
    });
    return csvArray;
  }
}
