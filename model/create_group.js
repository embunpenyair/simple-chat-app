const { queryWithCache } = require("../utils/db_helper")

module.exports.createGroup = () => {
    const query = `
        INSERT INTO chat_group (created_at) VALUES(NOW()) RETURNING id
    `
    const params = []
    return queryWithCache(query,params,null,"all");
}

module.exports.isExistUserInGroup = (me_id, user_id) => {
    const query = `
    select group_id, COUNT(group_id) as g from chat_group_user where user_id = $1 or user_id = $2   group by group_id having count(group_id) = 2
    `
    const params = [me_id, user_id]
    return queryWithCache(query,params,200)
}

module.exports.createGroupChat = (group_id, user_id) => {
    const query = `
        INSERT INTO chat_group_user (
            user_id, group_id, created_at 
        )
        VALUES(
            $1, $2, NOW()
        )
    `
    const params = [user_id, group_id]
    return queryWithCache(query,params,null,"all")
}