const { setToken } = require("../config/auth")
const { getUserByEmail } = require("../model/login")
const { response, decrypt } = require("../utils/helper")

module.exports = (req,res) => {
    return res.render("login/index.html")
}

module.exports.login = async (req,res) => {
    const { email, password } = req.body
    try {  
      const users = await getUserByEmail(email);
      if(users.length === 0) return response(res,401,"fail","Invalid password or email")
      const _plain_password = decrypt(users[0].password)
      if(_plain_password !== password) return response(res,401,"fail","Invalid password or email")
      return response(res,200,'success',"sucess login",{
          token:setToken(users[0])
      })
    } catch (error) {
      console.log(error)
      return response(res,422,'error','Something is not right 001')
    }
    
}