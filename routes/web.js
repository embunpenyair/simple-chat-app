const express = require("express")
const app     = express.Router()
const webpush  = require("web-push")
const { cookie } = require("../utils/helper")
const { saveSubscriptionToDB } = require("../model/subscription")
const { verifyToken } = require("../config/auth")

const vapid_keys = {
    publicKey:"BIPn9t1pzWM6S59Mw06vfSnJPb6xA9_TAJRAPR5l1JlJcl2-xh4e4y9Rji2HZbHdL2c7_HIXV2FBTT2bqCOU17w",
    privateKey:"d9imBMRfY7gBW2lUytyqtx2PW8Oj0776uw_IkymE1To"
}

webpush.setVapidDetails(
    'mailto:zulfikralahmudin@gmail.com',
    vapid_keys.publicKey,
    vapid_keys.privateKey
)

const sendNotification = (subscription,dataToSend="") => {
    webpush.sendNotification(subscription,dataToSend)
}

app.get("/",require("../controllers/home"))
app.get("/login",require("../controllers/login"))

app.get("/chat",(req,res) => {
    return res.render("index.html")
})

app.get("/login",(req,res) => {
    return res.render("login/index.html")
})
app.get("/register",require("../controllers/register"))

const dummy_memory = {subscription:null}

const saveToDatabase = async (subscription) =>{
    dummy_memory.subscription = subscription
}

app.get("/send_message/:id",(req,res) => {
    console.log("TRIGERED FROM SEND MESSAGE ", req.params.id)
    return res.send("hello world")
})

app.post("/save-subscription",async(req,res) => {
    console.log("headers")
    const session = cookie(req)
    const user = verifyToken(session)
    console.log()
    const subscription = req.body 
    await saveSubscriptionToDB(user.id, JSON.stringify(subscription))
    console.log("SUbscription >>>>>>>>>>>>")
    console.log(req.body)
    console.log("SUbscription >>>>>>>>>>>>")
    await saveToDatabase(subscription)
    return res.json({ message:"success" })
})

app.get("/send-notification",async (req,res) => {
    const subscription = dummy_memory
    console.log("dummy memory >>>>>>>>>>>>>>")
    console.log(dummy_memory.subscription)
    console.log("dummy memory >>>>>>>>>>>>>>")
    const message = "Hello world"
    sendNotification(subscription.subscription,message)
    return res.json({ message:"Success" })
})
/**
 * main app
 */
app.get("/dashboard",require("../controllers/dashboard"))
module.exports = app
module.exports.sendNotification = sendNotification