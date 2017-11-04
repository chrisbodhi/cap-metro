const fs = require('fs');

const got = require('got');

const fileUrl = 'https://data.texas.gov/download/cuc7-ywmd/text%2Fplain';

if (!fs.existsSync('tmp')) {
  fs.mkdirSync('tmp');
}

got.stream(fileUrl).pipe(fs.createWriteStream('tmp/positions.json'));
