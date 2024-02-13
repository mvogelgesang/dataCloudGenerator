import { faker } from "@faker-js/faker";
import { Ecommerce } from "../schemas/ecommerce";
import { AbstractDataGenerator, generatedCsvData, generatedData } from "./GenerateData";

export class EcommerceAnalyticsDataGenerator extends AbstractDataGenerator {
  data: generatedData[] = [];

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
    this.data = [{ data: ecommerceArray, type: "ecommerce" }];
    return this.data;
  }

  toCSV() {
    const csvArray: generatedCsvData[] = [];
    const header: (keyof Ecommerce)[] = Object.keys(
      this.data[0].data[0]
    ) as (keyof Ecommerce)[];

    const rows = this.data[0].data.map(obj =>
      header.map((fieldName) => JSON.stringify(obj[fieldName])).join(",")
    );
    csvArray.push({
      data: [header.join(","), ...rows].join("\r\n"),
      type: this.data[0].type,
    });
    return csvArray;
  }
}
