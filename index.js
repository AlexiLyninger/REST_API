//Bring in the express server and create application
let express = require('express');
let app = express();
let contactRepo = require('./repos/contactRepo.js');
let errorHelper = require('./helpers/errorHelpers');

//Use the express Router object
let router = express.Router();

//Configure middleware to support JSON data parsing in request object
app.use(express.json());

//Create GET
router.get('/', function (req, res, next) {
    contactRepo.get(function (data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All contact entries retrieved.",
            "data": data
        });
    }, function(err) {
        next(err);
    });
});

//Create GET/search?Email=str&Name=str&Phone=n to search for contacts by Email and/or Name and/or Phone
router.get('/search', function (req, res, next) {
    let searchObject = {
        "Email": req.query.Email,
        "Name": req.query.Name,
        "Phone": req.query.Phone
    };

    contactRepo.search(searchObject, function (data) {
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "All applicable contacts retrieved.",
                "data": data
            });
    }, function(err) {
        next(err);
    });
});

//Create GET/Email to return a single contact
router.get('/:Email', function (req, res, next) {
    contactRepo.getByID(req.params.Email, function (data) {
        if (data) {
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "All contact entries retrieved.",
                "data": data
            });
        } else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": "The conatact '" + req.params.Email + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The conatact '" + req.params.Email + "' could not be found."
                }
            });
        }
    }, function(err) {
        next(err);
    });
});

//Add new contact
router.post('/', function (req, res, next) {
    contactRepo.insert(req.body, function(data) {
        res.status(201).json({
            "status": 201,
            "statusText": "Created",
            "message": "New contact Added.",
            "data": data
        });
    },
    function(err) {
        next(err);
    });
});

//Update contact
router.put('/:Email', function (req, res, next) {
    contactRepo.getByID(req.params.Email, function (data) {
        if (data) {
            contactRepo.update(req.body, req.params.Email, function (data) {
                res.status(200).json({
                    "status": 200,
            "statusText": "OK",
            "message": "Contact '" + req.params.Email + "' updated.",
            "data": data
                });
            });
        } else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": "The conatact '" + req.params.Email + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The conatact '" + req.params.Email + "' could not be found."
                }
            });
        }
    }, function(err) {
        next(err);
    });
});

//Patch contact
router.patch('/:Email', function (req, res, next) {
    contactRepo.getByID(req.params.Email, function (data) {
        if (data) {
            contactRepo.update(req.body, req.params.Email, function (data) {
                res.status(200).json({
                    "status": 200,
            "statusText": "OK",
            "message": "Contact '" + req.params.Email + "' updated.",
            "data": data
                });
            });
        } else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": "The conatact '" + req.params.Email + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The conatact '" + req.params.Email + "' could not be found."
                }
            });
        }
    }, function(err) {
        next(err);
    });
});

//Delete contact
router.delete('/:Email', function (req, res, next) {
    contactRepo.getByID(req.params.Email, function (data) {
        if (data) {
            contactRepo.delete(req.params.Email, function (data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "The contact '" + req.params.Email + "' deleted.",
                    "data": data
                });
            });
        } else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": "The conatact '" + req.params.Email + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The conatact '" + req.params.Email + "' could not be found."
                }
            });
        }
    }, function(err) {
        next(err);
    });
});

//Configure router so all routes are prefixed with /api/v1
app.use('/api/', router);

//Configure exception logger to console
app.use(errorHelper.logErrorsToConsole);
//Configure client error handler
app.use(errorHelper.clientErrorHandler);
//Configure catch-all exception middleware
app.use(errorHelper.errorHandler);

//Create server to listen on port 5000
const server = app.listen(5000, function () {
    console.log('Node server is running on http://localhost:5000..');
});
