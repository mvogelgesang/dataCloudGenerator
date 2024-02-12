import { faker } from "@faker-js/faker";
import { GenerateData, generatedCsvData, generatedData } from "./GenerateData";
import { Customer } from "../schemas/customer";

export class CustomerDataGenerator implements GenerateData {
  data: generatedData[] = [];

  generateData(numRecords: number) {
    // Set the seed for the random number generator
    faker.seed(123);
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

    this.data = [{ data: customerData, type: "customer" }];
    return this.data;
  }

  toCSV() {
    const csvArray: generatedCsvData[] = [];
    const header: (keyof Customer)[] = Object.keys(
      this.data[0].data[0]
    ) as (keyof Customer)[];
    const rows = this.data[0].data.map((obj) =>
      header.map((fieldName) => JSON.stringify(obj[fieldName])).join(",")
    );
    csvArray.push({
      data: [header.join(","), ...rows].join("\r\n"),
      type: this.data[0].type,
    });
    return csvArray;
  }
}
