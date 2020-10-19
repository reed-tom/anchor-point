var express = require("express");
var router = express.Router();
var routerPromise = require("express-promise-router");
const fetch = require("node-fetch");
const config = require("../config.json");

var request = require("request");

const routeWait = new routerPromise();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send(JSON.stringify({ title: "anchor-point api" }));
});



module.exports = router;
// module.exports = routeWait;
