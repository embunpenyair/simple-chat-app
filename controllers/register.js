const { register } = require("../model/register")
const { response, encrypt } = require("../utils/helper")
/**
 * @description view
 * @param {*} req 
 * @param {*} res 
 */
module.exports = (req,res) => {
    return res.render("register/index.html")
}

module.exports.register =  async(req,res) => {
    let {name,email,password } = req.body
        password = encrypt(password)
    try {  
      const reg =   await  register(name,email,password);

      return response(res,200,'success',"Success register")
    } catch (error) {
      if(error.code === "23505") return response(res,422,"fail",`email ${email} is already used`)
      return response(res,422,'error','Something is not right 001')
    }
}