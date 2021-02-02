const env           = require('../env.json')
const { Pool, types }      = require('pg');
types.setTypeParser(1114,function(string_value) {
    return string_value
})

const redis         = require('redis'),
      redis_client  = redis.createClient({host:"redis"});
const pool = new Pool(env.database_rdbms);
module.exports.sql = (query,params = null) => {
    return new Promise((resolve, reject) => {
        pool.connect((err,client,done) => {
            if(err) return reject(err)
            client.query(query,params,(err,result) => {
                client.release()
                if(err){
                    return reject(err)
                }
                return resolve(result)
            })
        })
    })  
}
// module.exports.sqlClient = () => {
//     const pool = new Client(env.database_rdbms);
//     return new Promise((resolve, reject) => {
//         pool.connect((err,client,done) => {
//             if(err) return reject(err)
//             setTimeout(() => {
//                 console.log("==========================================")
//                 console.log("postgres run on : ", env.database_rdbms.port)
//                 console.log("==========================================")
//             },500)
//             client.query(query,params,(err,result) => {
//                 client.end()
//                 if(err){
//                     console.error(err)
//                     return reject(err)
//                 }
//                 return resolve(result)
//             })
//         })
//     }) 
// }
module.exports.redis_client = redis_client
