import { faker } from "@faker-js/faker";
import {
  AbstractDataGenerator,
  GeneratedCsvData,
  GeneratedData,
} from "./GenerateData";
import { Product } from "../schemas/product";


export class ProductDataGenerator extends AbstractDataGenerator<Product> {
  generateData(count: number, seed: boolean = false) {
    if (seed) {
      faker.seed(this.seedValue);
    }
    const productDate = faker.date.recent({ days: 2 });

    const products: Product[] = [];

    for (let i = 0; i < count; i++) {
      const product: Product = {
        id: faker.commerce.isbn(),
        description: faker.commerce.productDescription(),
        name: faker.commerce.productName(),
        price: faker.number.float({ min: 1, max: 150, fractionDigits: 2 }),
        createdAt: productDate,
        modifiedAt: faker.date.between({
          from: productDate,
          to: faker.date.soon(),
        }),
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
