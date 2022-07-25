// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

//notes
//depending on the roomnumber of the booking 
//is what room type the booking has
//ex: booking: {id: '5fwrgu4i7k55hl6tb', userID: 49, date: '2022/02/06', roomNumber: 5},
//has room type of:{
// bedSize: "queen",
// bidet: true,
// costPerNight: 340.17,
// numBeds: 2,
// number: 5,
// roomType: "single room"
// },

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

//imported classes
import Bookings from './classes/bookings.js'
import Rooms from './classes/rooms.js'
import User from './classes/user.js'
import Manager from './classes/manager.js'

console.log('This is the JavaScript entry file - your code begins here.');

//login-page querySelectors
const loginPage = document.querySelector('.login-page')
const username = document.querySelector('#userLoginValue')
const password = document.querySelector('#userPassLoginValue')
const loginButton = document.querySelector('.login-button')
const incorrentLoginText = document.querySelector('.incorrect-login-text')
//user-page querySelectors
const userMainPage = document.querySelector('.user-main-page')
const userLogOut = document.querySelector('.user-logout-button')
//manager-page querySelectors
const managerPage = document.querySelector('.manager-page')
const managerLogOut = document.querySelector('.manager-logout-button')
//event listeners
loginButton.addEventListener('click', login)
userLogOut.addEventListener('click', userLogOutFunction)
managerLogOut.addEventListener('click', managerLogOutFunction)
//event handlers
function login(event) {
    event.preventDefault()
    if(username.value === "customer50" && password.value === "overlook2021") {
        hide(loginPage)
        show(userMainPage)
    }
    else if(username.value === "manager" && password.value === "overlook2021") {
        hide(loginPage)
        show(managerPage)
    }
    else {
        show(incorrentLoginText)
    }
}

function userLogOutFunction() {
    hide(userMainPage)
    show(loginPage)
    hide(incorrentLoginText)
}

function managerLogOutFunction() {
    hide(managerPage)
    show(loginPage)
    hide(incorrentLoginText)
}


function show(element) {
    element.classList.remove('hidden')
}

function hide(element) {
    element.classList.add('hidden')
}