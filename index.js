//Bring in the express server and create application
let express = require('express');
let app = express();
let contactRepo = require('./repos/contactRepo.js');

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

//Configure router so all routes are prefixed with /api/v1
app.use('/api/', router);

//Create server to listen on port 5000
const server = app.listen(5000, function () {
    console.log('Node server is running on http://localhost:5000..');
});
