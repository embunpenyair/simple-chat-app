const { sql, redis_client  } = require('../config/database');

const error_handling = (err,res) => {
    // console.error(err)
}

module.exports.queryWithCache = (query = '',params = [], expire_time = 15, flush) => {
    return new Promise(async (resolve, reject) => {
        let _query = query
        let index = 1;
        let response = []
        for (let i = 0; i < params.length; i++) {
            _query = _query.replace(`$${index}`,`${params[i]}`)
            index++;
        }
        if(flush === 'all'){
            redis_client.flushall()
        }else if(flush === 'current'){
            redis_client.del(_query);
        }
        if(expire_time === null){
            console.log("call here db>>>>>>>>>>>>")
            response = await sql(query,params)
                .catch((err) => reject(err))
            return resolve(response.rows)
            
        }else{
            redis_client.get(_query,async (err,res) => {
                if(err) {
                    // console.error(err)
                    return reject(err)
                }
                // if data is not null then return the data
                if(res !== null) return resolve(JSON.parse(res));
                response = await sql(query,params)
                    .catch((err) => reject(err))
                redis_client.set(_query,JSON.stringify(response.rows),'EX',expire_time,error_handling)
                return resolve(response.rows);
            })
        }
        
        
    })
}
