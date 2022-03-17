var express = require('express');
var router = express.Router();
var axios =  require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({"status": "success"});
});

router.get('/ipgeo', function(req, res, next) {
  const ipRes = axios.get('https://ipinfo.io/161.185.160.93/geo').then(function (response) {
    console.log(response.data);
    res.send(response.data);
  });  
});

router.get('/app1', function(req, res, next) {
  const ipRes = axios.get('http://nodejs-app1/').then(function (response) {
    console.log(response.data);
    res.send(response.data);
  });  
});

module.exports = router;
