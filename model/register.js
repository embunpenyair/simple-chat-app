const { queryWithCache } = require("../utils/db_helper")


/**
 * @description 
 */
module.exports.register = (name, email, password) => {
    const query  = `
        INSERT INTO users 
        (name, email, password)
        VALUES($1, $2, $3)
    `
    const params = [name, email, password]
    return queryWithCache(query,params,null,"all")
}