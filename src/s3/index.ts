import { exec } from "node:child_process";

export function localToS3(
  localFilePath: string,
  bucketName: string,
  profile: string
) {
  exec(
    `aws s3 cp ${localFilePath} s3://${bucketName}/${localFilePath} --profile ${profile}`,
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
