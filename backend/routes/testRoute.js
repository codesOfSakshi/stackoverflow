const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json(
    `Hi, the server is working fine and listening on port ${process.env.PORT}`
  );
});

module.exports = router;
