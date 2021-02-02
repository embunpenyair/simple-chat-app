const { queryWithCache } = require("../utils/db_helper")

module.exports.getUserByEmail = (email) => {
    const query = `
        SELECT id, email, password, name FROM users WHERE email = $1
    `
    const params = [email]
    return queryWithCache(query,params,200);
}