const { queryWithCache } = require("../utils/db_helper")

module.exports.getUsersWithoutMe = (id) => {
    const query = ` SELECT id, name, email FROM users WHERE id <> $1`
    const params = [id]
    return queryWithCache(query,params,500);
}