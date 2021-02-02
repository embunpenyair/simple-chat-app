const connection            = require('../config/database')
const { pool,sql }   = require('../config/database')
const nodemailer = require('nodemailer')
const env = require('../env.json')
const Cryptr = require('cryptr')
const cryptr = new Cryptr(env.private_key);
const { mail }  = require('../config/email')

module.exports.encrypt = (plain_text)   => cryptr.encrypt(plain_text)
module.exports.decrypt = (chipper_text) =>  cryptr.decrypt(chipper_text)

module.exports.PostgresQuery    = (query,value) => sql(pool,query,value);

/**
 * @description this is helper to send email
 */
module.exports.sendEmail = async (from = '',to = '', subject = '', text = '', html = '', attachments = []) => {
    const messages = {from,to,subject,text,html};
    if(attachments.length > 0) messages.attachments = attachments
    let info = await mail().sendMail(messages)
    console.log("message send : ", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

if(connection){
    const MysqlQuery = (sql, fields) => {
        return new Promise((resolve, reject) => {
            connection.getConnection((err, conn) => {
                if (err) return reject(err)
                if (fields !== undefined) {
                    conn.query(sql, fields, (err, result) => {
                        conn.release()
                        if (err)
                            return reject(err)
                        else
                            return resolve(result)
                    })
                } else {
                    conn.query(sql, (err, result) => {
                        conn.release()
                        if (err)
                            return reject(err)
                        else
                            return resolve(result)
                    })
                }
            })
        })
    }
    module.exports.MysqlQuery = MysqlQuery
}
/**
 * 
 * @param {*} min minimal value example ==> 10000
 * @param {*} max maximal value example ==> 90000
 */
const randomNumber = (min, max) => Math.floor(Math.random() * max) + min;

module.exports.isSimilar = (first_value, second_value) => {
    if (first_value === second_value) {
        return true
    }
    return false
}

module.exports.isEmpty = (value) => {
    if (value === null || value === undefined || value === '') {
        return true
    }
    return false
}

module.exports.filterNullData = (data) => {
    for (const key in data) {
        if (data[key] === null || data[key] === undefined) {
            delete data[key]
        }
    }
    return data
}

module.exports.countNullValue = (data, value) => {
    let count = 0;
    for (const key in data) {
        if (data[key] === value) {
            count++
        }
    }
    return count
}

module.exports.response = (res,status_code = 200, status = 'success' || 'fail' || 'error',message,data = {}, total_data = 0, page_active = 0) => {
    let response = {
        status_code,
        status,
        message,
        data,
    }
    if(total_data !== 0){
        response["total_data"] = total_data
    }
    if(page_active !== 0){
        response["page_active"] = page_active
    }
    
    return res
        .status(status_code)
        .json(response)
}
module.exports.getMimetype = (mime) => {
    mime = mime.split('/')
    return mime[1];
}
module.exports.randomNumber = randomNumber
module.exports.addLogs = (activity = '',user_id = null) => {
    let values = [activity,user_id]
    let query = `INSERT INTO logs (activity,user_id) VALUES($1,$2)`
    return sql(query,values);
}
module.exports.pagination = (page = Number) => {
    let _page        = (this.isEmpty(page) === true || page === 1 || page === 0) ? 0 : page * 10 - 10
        _page        = (isNaN(parseInt(_page))) ? 1 : (_page < 0) ? 0 : parseInt(_page)
    let page_str    = `LIMIT 10 OFFSET ${_page}`
    return page_str
}
module.exports.filterSqlInjection = (string) => {
    string = string.replace(/SELECT/g,'')
    string = string.replace(/select/g,'')
    string = string.replace(/WHERE/g,'')
    string = string.replace(/where/g,'')
    string = string.replace(/UNION/g,'')
    string = string.replace(/union/g,'')
    string = string.replace(/INNER/g,'')
    string = string.replace(/inner/g,'')
    string = string.replace(/JOIN/g,'')
    string = string.replace(/join/g,'')
    return string
}
module.exports.checkConditionalSql = (fetch) => {
    if(fetch.rows.length > 0) return true 
    return false
}
module.exports.unformatDateToFormated = (value, type = 'dd/mm/yyyy') => {
    switch (type) {
        case "dd/mm/yyyy":
            value = value.split("/")
            value = value[2] + '-' + value[1] + '-' + value[0]
            return value
    
        default:
            break;
    }
}
module.exports.getContentCount = async (table_name, where) => {
    let query = `SELECT COUNT(*) as total_content FROM ${table_name} ` 
    if(! this.isEmpty(where)){
        query += where
    }
    const fetch = await sql(query)
    return parseInt(fetch.rows[0].total_content)
}

const stringToCurrency = (value) => {
    let main_value = value.substring(0,value.length - 2)
    let end_value  = value.substring(value.length - 2, value.length ) 
    return `${main_value}.${end_value}`
}

module.exports.cookie = (req) => {
    const cookie = req.headers.cookie || ""
    const _cookie = cookie.split("=")
    return _cookie[1]
}