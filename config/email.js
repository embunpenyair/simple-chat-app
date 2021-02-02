const nodemailer    = require('nodemailer')
const env           = require('../env.json')
/**
 * @description configuration of email
 */
module.exports.mail = () => {
    const transport = nodemailer.createTransport(env.email)
    return transport
}

module.exports.sendEmail = async (args = {to:'', from:'', subject:'',text:'' }, attachment = []) => {
    if(attachment.length > 0){
        args.attachments = attachment
    }
    console.log("data >>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    console.log(args)
    console.log("data >>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    const info = await this.mail().sendMail(args)
    console.log("message send : " + info.messageId)
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return Promise.resolve();
}