/* Global Variables */
let dataToUpdate = {};
let dataToServer = {};
const apiKey = 'e5fa4d4e1b077c1ee0927c66b159db3a';

/*e5fa4d4e1b077c1ee0927c66b159db3a*/
/*cf34bfdcf073087828238ef2fabe2edc*/

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener("click", generateHandler); //adding click event listener to the generate button



async function generateHandler() {

    const zipCode = document.getElementById('zip').value;
    const baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&APPID=${apiKey}&units=metric`;

    if (!zipCode) {
        alert("Enter Zip Code !!"); //ask user to enter zip code
        return; //return to avoid try-catch
    } else {
        const data = await fetch(baseURL); //get data from the url
        try {
            const datajson = await data.json(); //convert recieved data using json
            dataToServer.response = document.getElementById('feelings').value; //get user feelings
            dataToServer.Temp = datajson.main.temp; //assign recieved temperature to data to send
            dataToServer.date = newDate; //asign date to data to send
        } catch (err) {
            console.log(err); //print error to console
            alert("error! Try again"); //alert that error occurred
            //clear what was written
            document.getElementById('date').textContent = " "; //remove date
            document.getElementById('temp').textContent = " "; //clear temperature
            document.getElementById('content').textContent = " "; //clear user response                           
            return;
        }
        postData('/weatherData', dataToServer); //post data to server [temp,date,response]
        dataToUpdate = await getData('/toApp'); // get data from server
        await updateUI(dataToUpdate); //update user interface
    }
}





//post data function
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });
    try {
        //console.log(response);
        const newData = await response.json();
    } catch (error) {
        console.log("error", error);
    }
}


//get data function
const getData = async (url = '') => {
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
    });

    try {
        const newerData = await response.json();
        return newerData
    } catch (error) {
        console.log("error", error);
    }
}



// function that updates user interface
const updateUI = async function(data){
    document.getElementById('date').textContent = "Today is " + data.Date; //print date
    document.getElementById('temp').textContent = "Temperature is " + data.temp + " degrees Celsius"; //print temperature
    document.getElementById('content').textContent = "You feel " + data.Response; //print user response
}
