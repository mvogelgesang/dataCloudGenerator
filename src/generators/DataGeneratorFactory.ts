import { GenerateData, generatedData } from "./GenerateData";
import { OrderDataGenerator } from "./OrderDataGenerator";
import { AdDataGenerator } from "./AdDataGenerator";
import { CustomerDataGenerator } from "./CustomerDataGenerator";
import { EcommerceAnalyticsDataGenerator } from "./EcommerceAnalyticsDataGenerator";
import { ProductDataGenerator } from "./ProductDataGenerator";
import { StorePurchaseDataGenerator } from "./StorePurchaseDataGenerator";
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
        case "order":
          return new OrderDataGenerator();
      case "product":
        return new ProductDataGenerator();
      case "store-purchase":
        return new StorePurchaseDataGenerator();
      default:
        return null;
    }
  }
}
