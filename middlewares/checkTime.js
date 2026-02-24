function checkTime(req,res,next){
    const currentTime = new Date().toLocaleString();
    // check esecuzione
    console.log("Gotcha!", currentTime);
    // next(); comanda alla funzione di proseguire con il resto delle richieste al server
    next(); 

}

module.exports = checkTime;