const express = require("express")
const { authV2 } = require("../config/auth")
const app     = express.Router()

app.post("/register",require("../controllers/register").register)
app.post("/login",require("../controllers/login").login)
module.exports = app