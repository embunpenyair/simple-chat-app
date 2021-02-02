const ENDPOINT_API = "http://localhost:4000/api"
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 async function directTo(url = "/", title) {
    window.history.pushState("",title,url)
    const response = await fetch(url)
      .then((res) => res.text())
   document.open()
   document.write(response)
   document.close()

   
 }

window.onhashchange = function() {
   
}
 
 console.log(makeid(5));