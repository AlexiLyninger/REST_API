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
    },
    getByID: function (Email, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let contacts = JSON.parse(data).find(c => c.Email === Email);
                resolve(contacts);
            }
        });
    },
    search: function (searchObject, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let contacts = JSON.parse(data);
                //Perform search
                if (searchObject) {
                    //Example search object
                    //let searchObject = {
                    //  "name": 'A'
                    // };
                    contacts = contacts.filter(
                        c => (searchObject.Email ? c.Email.toLowerCase().indexOf(searchObject.Email.toLowerCase()) >= 0 : true) && 
                        (searchObject.Name ? c.Name.toLowerCase().indexOf(searchObject.Name.toLowerCase()) >= 0 : true) &&
                        (searchObject.Phone ? c.Phone.indexOf(searchObject.Phone) >= 0 : true));
                }
                resolve(contacts);
            }
        });
    },
    insert: function (newData, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let contacts = JSON.parse(data);
                contacts.push(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(contacts), function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(newData);
                    }
                });
            }
        });
    },
};

module.exports = contactRepo;