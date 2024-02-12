import { faker } from "@faker-js/faker";
import { StorePurchase, StorePurchaseItem } from "../schemas";
import { GenerateData, generatedData, generatedCsvData } from "./GenerateData";

export class StorePurchaseDataGenerator implements GenerateData {
  data: generatedData[] = [];
  generateData(count: number) {
    console.log("Generating StorePurchase data");
    const storePurchases: generatedData = { data: [], type: "store-purchase" };
    const storePurchaseItems: generatedData = {
      data: [],
      type: "store-purchase-item",
    };

    for (let i = 0; i < count; i++) {
      const storePurchaseDate = faker.date.recent({ days: 2 });
      const storePurchase: StorePurchase = {
        id: faker.string.uuid(),
        storeId: faker.location.buildingNumber(),
        loyaltyId: faker.string.uuid(),
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
      storePurchaseItems.data.push(storePurchaseItem);
      storePurchase.total +=
        storePurchaseItem.price * storePurchaseItem.quantity;
      storePurchases.data.push(storePurchase);
    }
    this.data = [storePurchases, storePurchaseItems];
    return this.data;
  }

  toCSV() {
    // Convert the data to CSV format
    // this.data is an array of generatedData objects, and each object has a data property that is an array of objects. This function should return an array containing CSV's of each generatedData object's data property.
    const csvArray: generatedCsvData[] = [];

    for (const data of this.data) {
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
