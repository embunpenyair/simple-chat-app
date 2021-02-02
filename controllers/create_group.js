const { io } = require("socket.io-client")
const { isExistUserInGroup, createGroup, createGroupChat } = require("../model/create_group")

module.exports.createGroup = async (data) => {
    console.log(data)
    try {
        const is_exist_group = await isExistUserInGroup(data.me_id, data.user_id)
        let group = []
        console.log(">>>>>>>>>>>>>>")
        console.log(is_exist_group)
        console.log(">>>>>>>>>>>>>>")
        if(is_exist_group.length === 0){
            group = await createGroup();
            await createGroupChat(group[0].id,data.user_id)
            await createGroupChat(group[0].id,data.me_id)
            is_exist_group = group
        }
        return is_exist_group

    } catch (error) {
        console.log(error)
    }
   
}