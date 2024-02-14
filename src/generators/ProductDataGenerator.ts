import { faker } from "@faker-js/faker";
import {
  AbstractDataGenerator,
  GeneratedCsvData,
  GeneratedData,
} from "./GenerateData";
import { Product } from "../schemas/product";


export class ProductDataGenerator extends AbstractDataGenerator<Product> {
  generateData(count: number, seed: boolean = false) {
    // for the purposes of this library, seed is always needed for products.
    faker.seed(this.seedValue);

    const products: Product[] = [];

    for (let i = 0; i < count; i++) {
      const product: Product = {
        id: faker.commerce.isbn(),
        description: faker.commerce.productDescription(),
        name: faker.commerce.productName(),
        price: faker.number.float({ min: 1, max: 150, fractionDigits: 2 }),
        createdAt: faker.date.recent({ days: 2, refDate: "2024-01-01T00:00:00.000Z"}),
        modifiedAt: new Date(),
      };

      products.push(product);
    }

    return { data: products, type: "product" };
  }
  toCSV(createdData: GeneratedData<Product>): GeneratedCsvData[] {
    const csvArray: GeneratedCsvData[] = [];
    const header: (keyof Product)[] = Object.keys(
      createdData.data[0]
    ) as (keyof Product)[];
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
