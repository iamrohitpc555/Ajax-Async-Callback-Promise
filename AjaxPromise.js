let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return + date.getHours() + "Hours : " + date.getMinutes() + " Minutes : " + date.getSeconds() + " Seconds : ";
}

function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) //On failure calls reject , on success calls resolve
    {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            // console.log(methodType + " State Change Called At : " + showTime() + " RS : " + xhr.readyState + " Status : " + xhr.status);
            if (xhr.readyState == 4) //Connection closed
            {
                if (xhr.status == 200 || xhr.status == 201) // 200 : Data Is Retreived , 201 : Data Is Created
                {
                    resolve(xhr.responseText);
                } else if (xhr.status >= 400) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                    // console.log("XHR Failed");
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
        console.log(methodType + "Request Sent to the server at : " + showTime());
    });

}

const getURL = "http://127.0.0.1:3000/employees/1";
makePromiseCall("GET", getURL, true) // then is used for executing the promise
    .then(responseText => {
        console.log("Get User Data at : " + showTime() + " Data : "  + responseText)
    })
    .catch(error => console.log("GET Error Status: " +
        JSON.stringify(error)));
console.log("Made GET AJAX Call to the server at" + showTime());



const deleteURL = "http://localhost:3000/employees/4";
makePromiseCall("DELETE", deleteURL, false) // then is used for executing the promise
    .then(responseText => {
        console.log("User Deleted at : " + showTime() + " Data : "  + responseText)
    })
    .catch(error => console.log("DELETE Error Status: " +
        JSON.stringify(error)));
console.log("Made ajax DELETE call to server at : " + showTime());



const postURL = "http://localhost:3000/employees";
const empdata = { "name": "Neeraj", "salary": 6790000 };
makePromiseCall("POST", postURL, true, empdata) // then is used for executing the promise
    .then(responseText => {
        console.log("User Added at : " + showTime() + " Data : "  + responseText)
    })
    .catch(error => console.log("POST Error Status: " +
        JSON.stringify(error)));
console.log("Made ajax POST call to server at : " + showTime());
