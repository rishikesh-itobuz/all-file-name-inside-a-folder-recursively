const fs = require("fs");

const readFilesAndFolder = async (folderName) => {
  const allFilesAndFolders = fs.readdirSync(folderName);
  const allFiles = allFilesAndFolders.filter((e) => e.includes("."));
  const allFolder = allFilesAndFolders.filter((e) => !e.includes("."));

  if (!allFolder.length) {
    return allFiles;
  }
  let data = [];
  for (let i = 0; i < allFolder.length; i++) {
    data = [
      ...data,
      ...(await readFilesAndFolder(`${folderName}/${allFolder[i]}`)),
    ];
  }

  return [...allFiles, ...data];
};

const data = readFilesAndFolder("abc").then((data) => {
  console.log(data);
});

// console.log(data)
