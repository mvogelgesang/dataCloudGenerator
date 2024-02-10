import { GenerateData, generatedData } from "./GenerateData";
import { OrderDataGenerator } from "./OrderDataGenerator";
import { AdDataGenerator } from "./AdDataGenerator";
import { CustomerDataGenerator } from "./CustomerDataGenerator";
import { EcommerceAnalyticsDataGenerator } from "./EcommerceAnalyticsDataGenerator";
import { ProductDataGenerator } from "./ProductDataGenerator";
export default class DataGeneratorFactory {
  static createDataGenerator(type: string): GenerateData | null {
    console.log("Creating data generator for type:", type);
    switch (type) {
      case "ad":
        return new AdDataGenerator();
      case "customer":
        return new CustomerDataGenerator();
      case "ecommerce":
        return new EcommerceAnalyticsDataGenerator();
      case "product":
        return new ProductDataGenerator();
      case "order":
        return new OrderDataGenerator();
      default:
        return null;
    }
  }
}
