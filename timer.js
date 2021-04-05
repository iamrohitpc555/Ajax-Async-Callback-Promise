function showTime() {
    const date = new Date();
    return  + date.getHours() +"Hours : "+ date.getMinutes() + " Minutes : "+ date.getSeconds()+ " Seconds : " ;
}

function showSessionExpire() {
    console.log("Activity B : Your Session Expired At : " + showTime());
}

console.log("Activity A : Triggering Activity A At : " + showTime());
setTimeout(showSessionExpire, 5000);
console.log("Activity A : Triggered Activity B At : " + showTime() + " will execute after 5 seconds");
