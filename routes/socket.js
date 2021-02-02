const { verifyToken } = require("../config/auth")
const { getMessage, sendMessage, getUserChat, getSubscription } = require("../model/chat_message")
const { createGroup } = require("../controllers/create_group")
const { getUsers, getUsersWithoutMe } = require("../model/users")
const { getNotifications, addNotifications, getNotificationTotalUnread } = require("../model/notifications")
const { sendNotification } = require("./web")


module.exports.Socket = (io,socket) => {
   socket.on("/users",async(auth,callback) => {
       try {
           const user = verifyToken(auth.token)
           const get_users = await getUsersWithoutMe(user.id)
           return callback({
               message:"success get users",
               data:get_users,
               status:"success"
           })
       } catch (error) {
           console.log(error)
           return callback({message:"unauthorization",status:"fail",data:""})
       }
   })


   socket.on("/create_group",async (auth,data,callback) => {
       try {
           console.log("call here")
            const user = verifyToken(auth.token)
            const create_group = await createGroup(data);
            return callback({
                message:"success get group",
                stauts:"success",
                data:create_group
            })
       } catch (error) {
            console.log(error)
            return callback({message:"unauthorization",status:"fail",data:""})
       }
   })

   socket.on("/me",(auth,data,callback) => {
        try {
            const user = verifyToken(auth.token)
            return callback({
                message:"success",
                status:"success",
                data:user
            })
        } catch (error) {
            console.log(error)
            return callback({message:"unauthorization",status:"fail",data:""})
        }
    })

    socket.on("/message",async (auth,data,callback) => {
        try {
            const user = verifyToken(auth.token)
            const group_id = data.group_id
            const message = await getMessage(group_id);
            console.log(">>>>>>>>>>>>>>>>>>>")
            console.log(group_id)
            console.log(">>>>>>>>>>>>>>>>>>>")
            return callback({
                message:"success get data",
                status:"success",
                data:message
            })
        } catch (error) {
            console.log(error)
            return callback({message:"unauthorization",status:"fail",data:""})
        }
    })

    socket.on("/send-message",async(auth,data,callback) => {
        try {
            const user = verifyToken(auth.token)
            const group_id = data.group_id
            console.log("data>>>>>>>")
            console.log(data)
            const insert_message = await sendMessage(data.message, data.user_id, group_id)
            const user_to           = await getUserChat(group_id,user.id);
            const subscription      = await getSubscription(user_to[0].user_id) 
            await addNotifications("New message",`${user.name} send new message`,{
                group_id:group_id,
                user_id:user.id
            },user_to[0].user_id)
            sendNotification(JSON.parse(subscription[0].subscription),JSON.stringify({
                title:"A new message",
                body:`${user.name} send new message`
            }))
            io.emit("/message/" + group_id,{
                data:data,
                message:"Get new message !!",
                success:"true"
            });
            return callback({
                message:"success get data",
                status:"success",
                data:data
            })
        } catch (error) {
            console.log(error)
            return callback({message:"unauthorization",status:"fail",data:""})
        }
    })

    socket.on("/notifications", async(auth,data,callback) => {
        try {
            const user = verifyToken(auth.token)
            const notifications = await getNotifications(user.id, data.page)
            return callback({
                message:"Success get notifications",
                status:"success",
                data:notifications
            })
        } catch (error) {
            console.log(error)
            return callback({message:"unauthorization",status:"fail",data:""})
        }
    })

    socket.on("/notifications/total-unread", async(auth,data,callback) => {
        try {
            const user = verifyToken(auth.token)
            const notifications = await getNotificationTotalUnread(user.id)
            return callback({
                message:"Success get notifications",
                status:"success",
                data:notifications[0]
            })
        } catch (error) {
            console.log(error)
            return callback({message:"unauthorization",status:"fail",data:""})
        }
    })
}
