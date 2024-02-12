import { faker } from "@faker-js/faker";
import { Order, OrderItem } from "../schemas/";
import { GenerateData, generatedData, generatedCsvData } from "./GenerateData";

export class OrderDataGenerator implements GenerateData {
  data: generatedData[] = [];
  generateData(count: number) {
    console.log("Generating Order data");
    const orders: generatedData = { data: [], type: "order" };
    const orderItems: generatedData = { data: [], type: "order-item" };

    for (let i = 0; i < count; i++) {
      const orderDate = faker.date.recent({ days: 2 });
      const order: Order = {
        id: i,
        customerId: faker.string.uuid(),
        totalPrice: 0,
        createdAt: orderDate,
        modifiedAt: faker.date.between({
          from: orderDate,
          to: faker.date.soon(),
        }),
      };

      const orderItem: OrderItem = {
        id: faker.string.uuid(),
        productId: faker.commerce.isbn(),
        quantity: faker.number.int(10),
        price: faker.number.float({ min: 1, max: 150, fractionDigits: 2 }),
        createdAt: orderDate,
        modifiedAt: orderDate,
      };
      orderItems.data.push(orderItem);
      order.totalPrice += orderItem.price * orderItem.quantity;
      orders.data.push(order);
    }

    this.data = [orders, orderItems];
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
