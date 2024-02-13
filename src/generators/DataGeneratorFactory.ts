import { AbstractDataGenerator } from "./GenerateData";
import { OrderDataGenerator } from "./OrderDataGenerator";
import { AdDataGenerator } from "./AdDataGenerator";
import { CustomerDataGenerator } from "./CustomerDataGenerator";
import { EcommerceAnalyticsDataGenerator } from "./EcommerceAnalyticsDataGenerator";
import { ProductDataGenerator } from "./ProductDataGenerator";
import { StorePurchaseDataGenerator } from "./StorePurchaseDataGenerator";
export default class DataGeneratorFactory {
  
  static createDataGenerator<T>(type: string): AbstractDataGenerator<T> | null {
    console.log("Creating data generator for type:", type);
    switch (type) {
      case "ad":
        return new AdDataGenerator() as AbstractDataGenerator<T>;
      case "customer":
        return new CustomerDataGenerator() as AbstractDataGenerator<T>;
      case "ecommerce":
        return new EcommerceAnalyticsDataGenerator() as AbstractDataGenerator<T>;
      case "order":
        return new OrderDataGenerator() as AbstractDataGenerator<T>;
      case "product":
        return new ProductDataGenerator() as AbstractDataGenerator<T>;
      case "store-purchase":
        return new StorePurchaseDataGenerator() as AbstractDataGenerator<T>;
      default:
        return null;
    }
  }
}
