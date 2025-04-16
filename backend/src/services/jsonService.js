const fs = require('fs');
const path = require('path');

exports.readJSON = (fileName) => {
  const filePath = path.join(__dirname, '../data', fileName);
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};