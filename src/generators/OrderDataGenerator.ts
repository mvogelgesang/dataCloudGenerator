import { faker } from "@faker-js/faker";
import { Order, OrderItem } from "../schemas/";
import { AbstractDataGenerator, GeneratedData, GeneratedCsvData } from "./GenerateData";
import { CustomerDataGenerator } from "./CustomerDataGenerator";
import { Address } from "../types/Address";

export class OrderDataGenerator extends AbstractDataGenerator<Order | OrderItem>{
  generateData(count: number, seed: boolean = false): GeneratedData<Order|OrderItem>[]{ 
    if (seed) {
      faker.seed(this.seedValue);
    }
    const customers = new CustomerDataGenerator().generateData(200, true);
    const orders: Order[] = [];
    const orderItems: OrderItem[] = [];

    // would have made this a separate function but it was causing type errors
    const generateAddress = (): Address => {
      return {
      street: faker.location.streetAddress(),
      street2: faker.number.int({min:0, max:4}) === 0 ? faker.location.secondaryAddress() : "",
      city: faker.location.city(),
      stateProvince: faker.location.state(),
      postalCode: faker.location.zipCode(),
      country: "United States of America",
    }};

    for (let i = 0; i < count; i++) {
      const orderDate = faker.date.recent({ days: 2 });
      const orderId = faker.string.hexadecimal({ length: 10, casing: 'upper' });
      
      const {address, city, stateProvince, postalCode, country} = faker.helpers.arrayElement(customers.data);
      const billingAddress = {
        street:address,city, stateProvince, postalCode, country, street2: ""
      }
      const shippingAddress = faker.number.int({min:0,max:10}) < 7 ? billingAddress : generateAddress();

      const order: Order = {
        id: orderId,
        customerId: faker.helpers.arrayElement(customers.data).id,
        totalPrice: 0,
        createdAt: orderDate,
        modifiedAt: faker.date.between({
          from: orderDate,
          to: faker.date.soon(),
        }),
        billing_street: billingAddress.street,
        billing_street2: "",
        billing_city: billingAddress.city,
        billing_state: billingAddress.stateProvince,
        billing_postalCode: billingAddress.postalCode,
        billing_country: billingAddress.country,
        shipping_street: shippingAddress.street,
        shipping_street2: shippingAddress.street2,
        shipping_city: shippingAddress.city,
        shipping_state: shippingAddress.stateProvince,
        shipping_postalCode: shippingAddress.postalCode,
        shipping_country: shippingAddress.country,
      };

      const orderItem: OrderItem = {
        id: faker.string.uuid(),
        orderId: orderId,
        productId: faker.commerce.isbn(),
        quantity: faker.number.int(10),
        price: faker.number.float({ min: 1, max: 150, fractionDigits: 2 }),
        createdAt: orderDate,
        modifiedAt: orderDate,
      };
      orderItems.push(orderItem);
      order.totalPrice += orderItem.price * orderItem.quantity;
      orders.push(order);
    }

    return [{ data: orders, type: "order" }, { data: orderItems, type: "order-item" }];
  }

  toCSV(createdData: GeneratedData<Order|OrderItem>[]) {
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
