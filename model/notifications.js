const { queryWithCache } = require("../utils/db_helper")
const { pagination } = require("../utils/helper")

module.exports.getNotifications = (user_id, page) => {
    const query = `
        SELECT id, user_id, title, body, content, created_at FROM notifications WHERE user_id = $1 ORDER BY created_at DESC ${pagination(page)}
    `
    const params = [user_id]
    return queryWithCache(query,params,200);
}

module.exports.addNotifications = (title,body,content, user_id) => {
    const query = `
        INSERT INTO notifications (
            user_id, title, body, content, created_at
        )
        VALUES(
            $1, $2, $3, $4, NOW()
        )
    `
    const params = [user_id, title, body, content]
    return queryWithCache(query,params,null,"all");
}

module.exports.getNotificationTotalUnread = (user_id) => {
    const query = `
        SELECT COUNT(id) as total FROM notifications WHERE user_id = $1 AND is_read = FALSE
    `
    const params = [user_id]
    return queryWithCache(query,params,100);
}

