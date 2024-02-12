// import all of the files in the generators folder and export them from the index.ts file. This will allow the main entry point to import all of the generators using a single import statement.

import { AdDataGenerator } from "./AdDataGenerator";
import { CustomerDataGenerator } from "./CustomerDataGenerator";
import DataGeneratorFactory from "./DataGeneratorFactory";
import { EcommerceAnalyticsDataGenerator } from "./EcommerceAnalyticsDataGenerator";
import { GenerateData,generatedData, generatedCsvData } from "./GenerateData";
import { OrderDataGenerator } from "./OrderDataGenerator";
import { ProductDataGenerator } from "./ProductDataGenerator";
import { StorePurchaseDataGenerator } from "./StorePurchaseDataGenerator";

export {
  AdDataGenerator,
  CustomerDataGenerator,
  DataGeneratorFactory,
  EcommerceAnalyticsDataGenerator,
  GenerateData,
  generatedData,
  generatedCsvData,
  OrderDataGenerator,
  ProductDataGenerator,
  StorePurchaseDataGenerator
};
