import {faker} from '@faker-js/faker';
import { AbstractDataGenerator, generatedCsvData, generatedData } from './GenerateData';
import { Product } from '../schemas/product';

export class ProductDataGenerator extends AbstractDataGenerator {
  // create a constructor that sets the seed property to a string, this should be an optional parameter
  data: generatedData[] = [];
  
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
        })
      };

      products.push(product);
    }

    this.data = [{ data: products, type: 'product' }];
    return this.data;
  }
  toCSV(): generatedCsvData[] {
    const csvArray: generatedCsvData[] = [];
    const header: (keyof Product)[] = Object.keys(this.data[0].data[0]) as (keyof Product)[];
    const rows = this.data[0].data.map(obj => header.map((fieldName) => JSON.stringify(obj[fieldName])).join(','));
    csvArray.push({data:[header.join(','), ...rows].join('\r\n'), type: this.data[0].type});

    return csvArray;
  }
}
