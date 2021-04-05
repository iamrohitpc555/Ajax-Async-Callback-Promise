let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return  + date.getHours() +"Hours : "+ date.getMinutes() + " Minutes : "+ date.getSeconds()+ " Seconds : " ;
}

function makeAJAXCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        // console.log(methodType + " State Change Called At : " + showTime() + " RS : " + xhr.readyState + " Status : " + xhr.status);
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 201) {
                callback(xhr.responseText);
            } else if (xhr.status >= 400) {
                console.log("Handle 400 Client Error Or 500 server error at : " + showTime());
            }
        }
    }
    xhr.open(methodType, url, async);
    if (data) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    } else
        xhr.send();
    console.log(methodType+"Request Sent to the server at : " + showTime());
}

const getURL = "http://127.0.0.1:3000/employees/1";
function getUserDetails(data) {
    console.log("Get User Data at : " + showTime() + " Data : " + data)
}
makeAJAXCall("GET", getURL, getUserDetails, true);
console.log("Made GET AJAX Call to the server at"+showTime());



const deleteURL = "http://localhost:3000/employees/4";
function deletedDetails(data) {
    console.log("User Deleted at : " + showTime() + " Data : " + data);
}
makeAJAXCall("DELETE", deleteURL, deletedDetails, false);
console.log("Made ajax DELETE call to server at : " + showTime());



const postURL = "http://localhost:3000/employees";
const data = { "name": "Neeraj",
    "salary": 6790000 };
function addedUserData(data) {
    console.log("User Added at : " + showTime() + " Data : " + data);
}
makeAJAXCall("POST", postURL, addedUserData, true, data);
console.log("Made ajax POST call to server at : " + showTime());
