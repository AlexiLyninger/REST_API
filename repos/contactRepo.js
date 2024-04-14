let fs = require('fs');

const FILE_NAME = './assets/contacts.json';

let contactRepo = {
    get: function(resolve, reject) {
       fs.readFile(FILE_NAME, function (err, data) {
        if (err) {
            reject(err);
        }
        else {
            resolve(JSON.parse(data));
        }
       });
    }
};

module.exports = contactRepo;