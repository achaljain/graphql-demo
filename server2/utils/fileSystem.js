const fs = require('fs');

function writeFile(filePath, data) {
  let jsonStr = JSON.stringify(data);
  fs.writeFileSync(filePath, jsonStr);
}

module.exports = {
  writeFile,
};
