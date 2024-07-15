const controller = require("../Controller/user")
const express = require("express")
const router = express.Router()

router.post("/register",controller.Adduser)
router.post("/login",controller.Login)
router.get("/getdata",controller.GetData)

module.exports = router