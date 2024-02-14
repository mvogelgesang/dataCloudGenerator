import { faker } from "@faker-js/faker";
import { Ecommerce, PageActionMapType, pageActionMap } from "../schemas/ecommerce";
import { AbstractDataGenerator, GeneratedCsvData, GeneratedData } from "./GenerateData";
import { ProductDataGenerator } from "./ProductDataGenerator";
import { CustomerDataGenerator } from "./CustomerDataGenerator";

export class EcommerceAnalyticsDataGenerator extends AbstractDataGenerator<Ecommerce> {
  generateData(numRecords: number, seed: boolean = false) {
    if (seed) {
      faker.seed(this.seedValue);
    }
    // generate product data to fill in the product field
    const products = new ProductDataGenerator().generateData(200, true).data;
    const customers = new CustomerDataGenerator().generateData(200, true).data;

    // Generate ecommerce data and return it
    const ecommerceArray: Ecommerce[] = Array(numRecords)
      .fill(null)
      .map(() => {
        const page = faker.helpers.arrayElement([
          "Home",
          "Product",
          "Cart",
          "Checkout",
        ]) as unknown as keyof PageActionMapType;
        const actionArray = pageActionMap[page];
        return {
          customerId: faker.helpers.arrayElement(customers).id,
          sessionId: faker.string.uuid(),
          page: page,
          product: page === "Product" ? faker.helpers.arrayElement(products).id : "",
          action: faker.helpers.arrayElement(actionArray),
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
