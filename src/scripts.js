// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

//notes
//depending on the roomnumber of the booking 
//is what room type the booking has
//ex: booking: {id: '5fwrgu4i7k55hl6tb', userID: 49, date: '2022/02/06', roomNumber: 5},
//has room type of:{
// id: '5fwrgu4i7k55hl6tb'
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
const welcomeUserMessage = document.querySelector('.welcome-user')
const userExpenseMessage = document.querySelector('.user-expenses')
const calenderInput = document.querySelector('#calenderInput')
const searchDateButton = document.querySelector('.search-button')
const availableRoomsContainer = document.querySelector('.rooms-container')
const pastAndUpcomingBookingContainer = document.querySelector(".user-bookings-container")
const roomTypeSelection = document.querySelector('select')
const roomTypeSubmitButton = document.querySelector('.filter-room-input')
//manager-page querySelectors
const managerPage = document.querySelector('.manager-page')
const managerLogOut = document.querySelector('.manager-logout-button')
//global variables
let allCustomersData;
let clients = []
let customerInfo;
let currentClient;
let allRoomsData;
let allBookingsData;
//event listeners
window.addEventListener('load', function() {
    allCustomersFetch()
    roomsFetch()
    bookingsFetch()
})
loginButton.addEventListener('click', login)
userLogOut.addEventListener('click', userLogOutFunction)
managerLogOut.addEventListener('click', managerLogOutFunction)
searchDateButton.addEventListener('click', showAvailableRoomsByDate)
roomTypeSubmitButton.addEventListener('click', showAvailableRoomsByRoomType)
userMainPage.addEventListener('click', bookRoom)
//fetch functions
function allCustomersFetch() {
    fetch(`http://localhost:3001/api/v1/customers`)
    .then(response => response.json())
    .then(data => {
        allCustomersData = data.customers
        //console.log(allCustomersData)
        clientGenerator()
    })
}

function singleCustomerFetch() {
    fetch(`http://localhost:3001/api/v1/customers/<id>`)
    .then(response => response.json())
    .then(data => console.log(data))
}

function roomsFetch() {
    fetch(`http://localhost:3001/api/v1/rooms`)
    .then(response => response.json())
    .then(data => {
        allRoomsData = data.rooms
        //console.log('rooms data', allRoomsData)
    })
}

function bookingsFetch() {
    fetch(`http://localhost:3001/api/v1/bookings`)
    .then(response => response.json())
    .then(data => {
        allBookingsData = data.bookings
        //console.log('bookings data', allBookingsData)
    })
}

//event handlers
function clientGenerator() {
    let customer = allCustomersData.forEach(customer => {
        clients.push(new User(customer, allBookingsData, allRoomsData))
       //console.log(clients)
    })
}

function changeBookingData(bookingsData, roomsData) {
    return changeBookingData = clients.forEach(client => {
        client.determineBookingRoomType(bookingsData, roomsData)
    })
}

function login(event) {
    event.preventDefault()
    return clients.find(client => {
        if(client.username === username.value && password.value === "overlook2021") {
            hide(loginPage)
            show(userMainPage)
            displayClientDetails(client)
            changeBookingData(allBookingsData, allRoomsData)
            //console.log('client', client)
            currentClient = client
            showPastBookings()
            displayRoomTypeOptions()
            //console.log('currentClient', currentClient.bookingRoomDetails)
            return client
        }
        else if(username.value === "manager" && password.value === "overlook2021") {
            hide(loginPage)
            show(managerPage)
        }
        else {
            show(incorrentLoginText)
        }
    })
}

function showAvailableRoomsByDate() {
    //console.log('before', calenderInput.value)
    let dateInput = calenderInput.value.split("-")
    let newDateInput = dateInput.join("/")
    //console.log('after', newDateInput)
    let availableRooms = currentClient.filterBookingsByDate(newDateInput)
    availableRoomsContainer.innerHTML = ''
    availableRooms.forEach(availableRoom => {
        availableRoomsContainer.innerHTML += `<section class="room-details-and-book-container">
        <section class="room-info">
          <p class="room-spec" id="${availableRoom.bookingId}">Room Type: ${availableRoom.roomType}</p>
          <p class="room-spec" id="room-detail-title">Room Details:</p>
          <p class="room-spec" id="room-bed-info">Bed size: ${availableRoom.bedSize} [x${availableRoom.numBeds}]</p>
          <p class="room-spec" id="room-date-info">Available Date: ${availableRoom.date}</p>
        </section>
        <section class="rates-and-book">
          <p class="room-spec" id="rates">$${availableRoom.costPerNight} per night</p>
          <button class="book" id='${availableRoom.bookingId}'>Book</button>
        </section>
      </section>`
    })
}

function showAvailableRoomsByRoomType() {
    let availableRooms = currentClient.filterRoomByRoomType(roomTypeSelection.options[roomTypeSelection.selectedIndex].text)
    console.log('available rooms', availableRooms)
    availableRoomsContainer.innerHTML = ''
    availableRooms.forEach(availableRoom => {
        availableRoomsContainer.innerHTML += `<section class="room-details-and-book-container">
        <section class="room-info">
          <p class="room-spec" id="${availableRoom.bookingId}">Room Type: ${availableRoom.roomType}</p>
          <p class="room-spec" id="room-detail-title">Room Details:</p>
          <p class="room-spec" id="room-bed-info">Bed size: ${availableRoom.bedSize} [x${availableRoom.numBeds}]</p>
          <p class="room-spec" id="room-date-info">Available Date: ${availableRoom.date}</p>
        </section>
        <section class="rates-and-book">
          <p class="room-spec" id="rates">$${availableRoom.costPerNight} per night</p>
          <button class="book" id='${availableRoom.bookingId}'>Book</button>
        </section>
      </section>`
    })
}

function displayRoomTypeOptions() {
    let roomTypes = allRoomsData.map(room => room.roomType)
    let uniqueRoomTypes = roomTypes.filter((roomType, index) => {
        return roomTypes.indexOf(roomType) === index
    })
    roomTypeSelection.innerHTML = ''
    uniqueRoomTypes.forEach(roomType => {
        roomTypeSelection.innerHTML += `
        <option disabled hidden selected>Room Type</option>
        <option value="${roomType}">${roomType}</option>`
    })
}

function bookRoom(event) {
    let booking = currentClient.bookRoom(event.target.id)
    console.log('booking', booking)
    console.log('client booking', currentClient.bookingRoomDetails)
    //can add to the past and upcomming
    //can remove from booking options
    //chnaging data around 
    
}

function showPastBookings() {
    let clientBookedRooms = currentClient.determineUserPastBookings()
    pastAndUpcomingBookingContainer.innerHTML = ''
    console.log('clientBookedRooms', currentClient.bookingRoomDetails)
    currentClient.roomsBooked.forEach(bookedRoom => {
        pastAndUpcomingBookingContainer.innerHTML += `<section class="user-booking-details">
        <p class="room-spec2" id="date-booked">Date Booked: ${bookedRoom.date}</p>
        <p class="room-spec2" id="room-detail-title">Room Details:</p>
        <p class="room-spec2" id="room-bed-info">Bed size: ${bookedRoom.bedSize} [x${bookedRoom.numBeds}]</p>
        <p class="room-spec2" id="rates2"> Cost: $${bookedRoom.costPerNight} per night</p>
      </section>`
    })
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

function displayClientDetails(client) {
    welcomeUserMessage.innerText = `Welcome, ${client.name}`
    userExpenseMessage.innerText = `Your total expenses: $${client.expenses}`
}

function show(element) {
    element.classList.remove('hidden')
}

function hide(element) {
    element.classList.add('hidden')
}