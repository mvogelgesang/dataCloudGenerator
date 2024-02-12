#!/usr/bin/env node
import fs from "node:fs";
const path = require("path");
import { DataGeneratorFactory, generatedCsvData } from "./generators";
import { writeCSV } from "./files";
import { localToS3 } from "./s3";
import { exit } from "node:process";
export interface DCGeneratorConfig {
  awsBucketName: string;
  awsProfileName: string;
  awsRegion: string;
}

// This is the main entry point for the application. It will be called from the command line using npm run start. It will generate the data and write it to a file.

// configuration data will be stored in a dcGenerator_config.js file in the root of the project. This file will be used to configure the application. It will contain the following:
// module.exports = {
// awsBucketName: "",
// awsProfileName: "",
// awsRegion: "",
// };
// The configuration data will be used to configure the AWS SDK to upload the data to an S3 bucket.
// if a configuration file is not present, the application will throw an error and exit
if (!fs.existsSync("dcGenerator_config.js")) {
  console.error(
    "No configuration file found. Please create a dcGenerator_config.js file."
  );
  // print out the configuration file to help users get started
  console.log(`module.exports = {
    awsBucketName: "your-bucket-name",
    awsProfileName: "your-profile-name",
    awsRegion: "your-region",
  };`);
  exit(1);
}
// read in values from the configuration file
// this file should be in the root of the project, this should work when this application is installed as an npm package
const configPath = path.join(process.cwd(), "dcGenerator_config.js");
const config: DCGeneratorConfig = require(configPath);

// this fill will be called from npm run start and be passed two arguments. The first will be the data type which must be a valid schema type. The second will be the number of records to generate.
let dataType = process.argv[2];
if (!dataType) {
  throw new Error("No data type specified. Please specify a data type.");
} else {
  // make this lower case
  dataType = dataType.toLowerCase();
}
// check that datatype is a valid schema type
const validDataTypes = [
  "ad",
  "customer",
  "ecommerce",
  "order",
  "product",
  "store-purchase",
];
if (!validDataTypes.includes(dataType)) {
  throw new Error(
    `Invalid data type: ${dataType}. Must be one of: ${validDataTypes.join(
      ", "
    )}`
  );
}

const numRecords = process.argv[3] ? parseInt(process.argv[3]) : 10;
console.log(`Generating ${numRecords} records of type ${dataType}`);
const dataGenerator = DataGeneratorFactory.createDataGenerator(dataType);
const data = dataGenerator?.generateData(numRecords);
const csvArray: generatedCsvData[] | undefined = dataGenerator?.toCSV();
if (csvArray) {
  for (const item of csvArray) {
    const fileData = writeCSV(item.type, item.data);
    localToS3(fileData.fileName, fileData.dir, fileData.dataType, config);
  }
}
