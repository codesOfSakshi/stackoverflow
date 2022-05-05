const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");

const topicName = "shop";

//1
//Get products of that particular shop
router.get("/getAllProducts", async (req, res) => {
  // try {
  //   const results = await Product.find({idshop:req.params.id});
  //   res.send(results);
  // } catch (err) {
  //   console.log("get products");
  // }

  req.body.parameter=1
  msg = {};
  msg.params = req.params
  msg.body = req.body;
  kafka.make_request(topicName, msg, (err, results) => {
    res.send(results);
  });
});

module.exports = router;