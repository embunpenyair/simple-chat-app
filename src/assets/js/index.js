const check = () => {
    if(!('serviceWorker' in navigator)){
        throw new Error('No Service worker support')
    }
    if(!('PushManager' in window)){
        throw new Error('no Push API support')
    }
}

const registerServiceWorker = async () => {
    const sw_register = await navigator.serviceWorker.register("./service_worker.js")
        .then(() => {
            console.log("service worler registered")
        })
        .catch((err) => console.log(err))
    return sw_register
}

const requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission();
    if(permission !== "granted"){
        throw new Error("Permission not granted for notification")
    }
}

const showLocalNotification = (title, body, sw_registration) => {
    const options = {
        body, 
    }
    sw_registration.showNotification(title,options)
}



const main = async () => {
    check()
    const sw_register = await registerServiceWorker()
    const permission  = await requestNotificationPermission()
    // showLocalNotification("hey","hello world",sw_register)
}
main()