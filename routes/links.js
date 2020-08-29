const express = require("express");
const router = express.Router();
const controller = require("../controllers/links");

/* GET links listing. */
router.get("/", controller.get);
//res.send('respond with a resource');

router.post("/", controller.post);

router.get("/:id", controller.get_linkId);

module.exports = router;
