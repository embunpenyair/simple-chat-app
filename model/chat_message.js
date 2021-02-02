const { queryWithCache } = require("../utils/db_helper")

module.exports.getMessage = (group_id) => {
    const query = `
        SELECT id, group_id, user_id, message, created_at FROM chat_message 
        WHERE group_id = $1
    `
    const params = [group_id]
    return queryWithCache(query,params,200);
}

module.exports.sendMessage = (message, user_id, group_id) => {
    const query = `
        INSERT INTO chat_message (
            group_id, user_id, message, created_at
        )
        VALUES(
            $1, $2, $3, NOW()
        )
    `
    const params = [group_id, user_id, message]
    return queryWithCache(query,params,null,"all")
}

module.exports.getUserChat = (group_id, user_id) => {
    const query = `
        SELECT user_id, group_id FROM chat_group_user WHERE group_id = $1  AND user_id <> $2 LIMIT 1
    `
    const params = [group_id, user_id]
    return queryWithCache(query,params,100);
}

module.exports.getSubscription = (user_id) => {
    const query = `SELECT subscription FROM users WHERE id = $1`
    const params = [user_id]
    return queryWithCache(query,params,200);
}