import fs from "node:fs";

export function writeCSV(dataType: string, data: string): {fileName: string, dir: string, dataType: string} {
  const folderPath = `data/${dataType}`;
  const currentTimestamp = new Date().toISOString();
  // check if the folderPath exists, if not create it recursively
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath,{recursive:true });
  }

  const filePathAndName = `${dataType}_${currentTimestamp}.csv`;
  fs.writeFileSync(`${folderPath}/${filePathAndName}`, data);
  return {fileName: filePathAndName, dir: folderPath, dataType: dataType};
}

