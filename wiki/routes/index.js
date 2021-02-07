const express = require('express');
const router = express.Router();
const wiki = require("./wiki");
const user = require("./user")

const { User, Page } = require('../models');



router.use("/user", user)
router.use("/wiki", wiki)
router.use("/", wiki)

module.exports = router;