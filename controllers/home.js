const { verifyToken } = require("../config/auth")
const { cookie } = require("../utils/helper")


module.exports = (req,res) => {
    const _cookie = cookie(req)
    try {
        if(_cookie === "") throw ""
        const jwt = verifyToken(_cookie)
    } catch (error) {
        return res.send("<h1>404 Not found</h1>")
    }
    return res.render("home/index.html")
}