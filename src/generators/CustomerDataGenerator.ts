import { faker } from "@faker-js/faker";
import { AbstractDataGenerator, DataGenerator, GeneratedCsvData, GeneratedData } from "./GenerateData";
import { Customer } from "../schemas/customer";

export class CustomerDataGenerator extends AbstractDataGenerator<Customer> {
  generateData(numRecords: number, seed: boolean = false): GeneratedData<Customer> {
    if (seed) {
      faker.seed(this.seedValue);
    }
    const customerDate = faker.date.recent({ days: 60 });
    // Generate customer data and return it
    const customerData: Customer[] = Array(numRecords)
      .fill(null)
      .map(() => {
        return {
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          email: faker.internet.email(),
          address: faker.location.streetAddress(),
          city: faker.location.city(),
          postalCode: faker.location.zipCode(),
          country: faker.location.country(),
          createdAt: customerDate,
          modifiedAt: faker.date.between({
            from: customerDate,
            to: faker.date.soon(),
          }),
        };
      });

    return { data: customerData, type: "customer" };
  }

  toCSV(createdData: GeneratedData<Customer>) {
    const csvArray: GeneratedCsvData[] = [];
    const header: (keyof Customer)[] = Object.keys(
      createdData.data[0]
    ) as (keyof Customer)[];
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
