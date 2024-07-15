const controller = require("../Controller/Auth")
const express = require("express")
const router = express.Router()

router.post("/register",controller.AddAuth)
router.post("/login",controller.Login)
router.get("/getdata",controller.GetData)

module.exports = router