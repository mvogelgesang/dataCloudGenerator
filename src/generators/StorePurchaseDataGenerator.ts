import { faker } from "@faker-js/faker";
import { StorePurchase, StorePurchaseItem } from "../schemas";
import { AbstractDataGenerator, GeneratedData, GeneratedCsvData } from "./GenerateData";
import { CustomerDataGenerator } from "./CustomerDataGenerator";

export class StorePurchaseDataGenerator extends AbstractDataGenerator<StorePurchase|StorePurchaseItem> { 
  generateData(count: number, seed: boolean = false): GeneratedData<StorePurchase|StorePurchaseItem>[]{
    if (seed) {
      faker.seed(this.seedValue);
    }
    const customers = new CustomerDataGenerator().generateData(200, true);
    const storePurchases: StorePurchase[] = []
    const storePurchaseItems: StorePurchaseItem[] = [];

    for (let i = 0; i < count; i++) {
      const storePurchaseDate = faker.date.recent({ days: 2 });
      const storePurchase: StorePurchase = {
        id: faker.string.uuid(),
        storeId: faker.location.buildingNumber(),
        loyaltyId: faker.helpers.arrayElement(customers.data).loyaltyId,
        total: 0,
        createdAt: storePurchaseDate,
        modifiedAt: faker.date.between({
          from: storePurchaseDate,
          to: faker.date.soon(),
        }),
      };

      const storePurchaseItem: StorePurchaseItem = {
        id: faker.string.uuid(),
        storePurchaseId: storePurchase.id,
        productId: faker.commerce.isbn(),
        quantity: faker.number.int(10),
        price: faker.number.float({ min: 1, max: 150, fractionDigits: 2 }),
        createdAt: storePurchaseDate,
        modifiedAt: faker.date.between({
          from: storePurchaseDate,
          to: faker.date.soon(),
        }),
      };
      storePurchaseItems.push(storePurchaseItem);
      storePurchase.total +=
        storePurchaseItem.price * storePurchaseItem.quantity;
      storePurchases.push(storePurchase);
    }
    return [{data: storePurchases, type: "store-purchase" }, {data: storePurchaseItems, type: "store-purchase-item" }];
  }

  toCSV(createdData: GeneratedData<StorePurchase|StorePurchaseItem>[]) {
    // Convert the data to CSV format
    // this.data is an array of generatedData objects, and each object has a data property that is an array of objects. This function should return an array containing CSV's of each generatedData object's data property.
    const csvArray: GeneratedCsvData[] = [];

    for (const data of createdData) {
      const header = Object.keys(data.data[0]);
      const rows = data.data.map((obj: any) =>
        header
          .map((fieldName: string) => JSON.stringify(obj[fieldName]))
          .join(",")
      );
      csvArray.push({
        data: [header.join(","), ...rows].join("\r\n"),
        type: data.type,
      });
    }
    return csvArray;
  }
}
