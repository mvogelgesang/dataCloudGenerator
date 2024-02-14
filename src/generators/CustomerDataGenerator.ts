import { faker } from "@faker-js/faker";
import { AbstractDataGenerator, DataGenerator, GeneratedCsvData, GeneratedData } from "./GenerateData";
import { Customer } from "../schemas/customer";

export class CustomerDataGenerator extends AbstractDataGenerator<Customer> {
  generateData(numRecords: number, seed: boolean = false): GeneratedData<Customer> {
    // customers should always be seeded
    faker.seed(this.seedValue);

    // Generate customer data and return it
    const customerData: Customer[] = Array(numRecords)
      .fill(null)
      .map(() => {
        return {
          id: faker.string.uuid(),
          loyaltyId: faker.string.numeric({allowLeadingZeros: true, length: 15}),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phone: faker.phone.number(),
          email: faker.internet.email(),
          address: faker.location.streetAddress(),
          city: faker.location.city(),
          stateProvince: faker.location.state(),
          postalCode: faker.location.zipCode(),
          country: faker.location.country(),
          createdAt: faker.date.recent({ days: 60, refDate: "2024-01-01T00:00:00.000Z" }),
          modifiedAt: new Date(),
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
