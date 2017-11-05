const fs = require('fs');

const got = require('got');

const fileUrl = 'https://data.texas.gov/download/cuc7-ywmd/text%2Fplain';

const pwd = process.env.PWD;

const dirCheck = (dir) => {
  if (!fs.existsSync(`${dir}/tmp`)) {
    fs.mkdirSync(`${dir}/tmp`);
  }
};

const getGot = (dir, filename) => {
  console.log('>>> Starting got.stream');
  got.stream(fileUrl)
    .on('error', (err) => {
      console.error(err);
    })
    .pipe(fs.createWriteStream(`${dir}/tmp/${filename}`));
};

/**
 * Creates a tmp directory if needed, then gets to vehicle data
 */
const request = (filename) => {
  dirCheck(pwd);
  getGot(pwd, filename);
};

exports.request = request;
