import { exec } from "node:child_process";
import { DCGeneratorConfig } from "..";


export function localToS3(
  fileName: string,
  localFolderPath: string,
  dataType: string,
  config: DCGeneratorConfig
) {
  exec(
    `aws s3 cp ${localFolderPath}/${fileName} s3://${config.awsBucketName}/${dataType}/${fileName} --profile ${config.awsProfileName}`,
    (error: any, stdout: any, stderr: any) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`CSV file uploaded successfully:\n${stdout}`);
    }
  );
}
