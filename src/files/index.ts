import fs from "node:fs";

export function writeCSV(dataType: string, data: string): {file: string, type: string} {
  const folderPath = `data/${dataType}`;
  const currentTimestamp = new Date().toISOString();
  // check if the folderPath exists, if not create it recursively
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath,{recursive:true });
  }

  const filePathAndName = `${folderPath}/${dataType}_${currentTimestamp}.csv`;
  fs.writeFileSync(filePathAndName, data);
  return {file: filePathAndName, type: dataType};
}

