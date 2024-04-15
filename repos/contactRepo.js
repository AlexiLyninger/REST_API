let fs = require('fs');

const FILE_NAME = './assets/contacts2.json';

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
    update: function (newData, Email, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let contacts = JSON.parse(data);
                let contact = contacts.find(c => c.Email === Email);
                if (contact) {
                    Object.assign(contact, newData);
                    fs.writeFile(FILE_NAME, JSON.stringify(contacts), function (err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(newData);
                        }
                    });
                }
            }
        });
    },
    delete: function (Email, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let contacts = JSON.parse(data);
                let index = contacts.findIndex(c => c.Email === Email);
                if (index != -1) {
                    contacts.splice(index, 1);
                    fs.writeFile(FILE_NAME, JSON.stringify(contacts), function (err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(index);
                        }
                    });
                }
            }
        });
    }
};

module.exports = contactRepo;