const express = require('express');
const router = express.Router();
const wiki = require("./wiki");
const user = require("./user")

const { User, Page } = require('../models');



router.use("/user", user)
router.use("/wiki", wiki)

router.get('/', (req, res, next) => {
   
    res.render('index');
})
module.exports = router;