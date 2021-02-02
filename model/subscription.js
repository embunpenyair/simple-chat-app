const { queryWithCache } = require("../utils/db_helper")

module.exports.saveSubscriptionToDB = (user_id, subscription) => {
    const query = `UPDATE users SET subscription = $1 WHERE id = $2`
    const params = [subscription, user_id]
    queryWithCache(query,params,null,"all")
}