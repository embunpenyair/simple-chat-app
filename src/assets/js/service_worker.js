const saveSubscription = async (subscription) => {
    const server = `/save-subscription`
    // const token = window.localStorage.getItem("nodesession")

    try {
        
        const response = await self.fetch(server,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(subscription)
        })
        return response.json()
    } catch (error) {
        console.error(error)
    }
}

const urlB64ToUint8Array = (base64string) => {
    const padding = '='.repeat((4 - (base64string.length % 4))%4)
    const base64 = (base64string + padding).replace(/\-/g,'+').replace(/_/g,'/')
    const raw_data = atob(base64)
    const output_array = new Uint8Array(raw_data.length)
    for (let i = 0; i < raw_data.length; ++i) {
        output_array[i] = raw_data.charCodeAt(i)
    }
    return output_array
}

const activateSubcription = async () => {
    try {
        const application_server = urlB64ToUint8Array('BIPn9t1pzWM6S59Mw06vfSnJPb6xA9_TAJRAPR5l1JlJcl2-xh4e4y9Rji2HZbHdL2c7_HIXV2FBTT2bqCOU17w');
        const options = {applicationServerKey:application_server,userVisibleOnly:true}
        const subscription = await self.registration.pushManager.subscribe(options)
        
        console.log("subscription>>>>>>>>>>>>>>")
        console.log(subscription)
        console.log("subscription>>>>>>>>>>>>>>")
        const response = await saveSubscription(subscription);
        console.log(JSON.stringify(subscription))
        console.log("CALL END")
    } catch (error) {
        console.error(error)    
    }
}

self.addEventListener('install',async () => {
    // console.log("CALL INSTALL>>>>>>>>>>>>>")
    // activateSubcription()
    // try {
    //     const application_server = urlB64ToUint8Array('BIPn9t1pzWM6S59Mw06vfSnJPb6xA9_TAJRAPR5l1JlJcl2-xh4e4y9Rji2HZbHdL2c7_HIXV2FBTT2bqCOU17w');
    //     const options = {applicationServerKey:application_server,userVisibleOnly:true}
    //     const subscription = await self.registration.pushManager.subscribe(options)
        
    //     console.log("subscription>>>>>>>>>>>>>>")
    //     console.log(subscription)
    //     console.log("subscription>>>>>>>>>>>>>>")
    //     const response = await saveSubscription(subscription);
    //     console.log(JSON.stringify(subscription))
    //     console.log("CALL END")
    // } catch (error) {
    //     console.error(error)
    // }
})
self.addEventListener('activate',async () => {
    console.log("CALL ACTIVATE>>>>>>>>>>>>>")
    activateSubcription()
})

const showLocalNotification = (title,body, sw_registration) => {
    const options = {
        body
    }
    sw_registration.showNotification(title,options);
}

self.addEventListener("push",(event) => {
    if(event.data){
        console.log("PUSH EVENT")
        console.log(JSON.stringify(event))
        const data = JSON.parse(event.data.text())
        showLocalNotification(data.title,data.body, self.registration)
    }else{
        console.log("PUSH EVENT BUT NOT DATA")
    }
})
