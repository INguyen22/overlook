// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

//questions
//am i chnaging the data like i'm suppoused to/creating it?
//should i be changing all the data off the bat?
//should i move some of my user methods to the scripts so they're not associated with the class
//address filtering problems and display error message
//posting booking to server
//
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
//imported classes
import Bookings from './classes/bookings.js'
import Rooms from './classes/rooms.js'
import User from './classes/user.js'
import Manager from './classes/manager.js'

// console.log('This is the JavaScript entry file - your code begins here.');

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
const errorMessage = document.querySelector('.error-message')
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
let selectedDate;
let roomNumber;
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

function addBookingsPost() {
    // console.log('current client', currentClient.filteredBookings)
    // console.log(selectedDate)
    fetch(`http://localhost:3001/api/v1/bookings`, {
        method:'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ 
            userID: currentClient.id, 
            date: selectedDate,
            roomNumber: roomNumber 
        })
    })
    .then(response => { 
        if (!response.ok) {
          throw new Error('there was an error booking your reservation, Try again')
        } else {
          errorMessage.innerHTML = ''
          return response.json()
        }
      })
      .then(() => bookingsFetch())
      .catch(err => {
        errorMessage.innerHTML = `${err.message}`
    })
}

//event handlers
function clientGenerator() {
    let customer = allCustomersData.forEach(customer => {
        clients.push(new User(customer))
       //console.log(clients)
    })
}

function changeBookingData(bookingsData, roomsData) {
    const changeBookingDetails = clients.forEach(client => {
        client.determineBookingRoomType(bookingsData, roomsData)
    })
    return changeBookingDetails
}



function login(event) {
    console.log('hi')
    event.preventDefault()
    return clients.find(client => {
        if(client.username === username.value && password.value === "overlook2021") {
            console.log('client', client)
            hide(loginPage)
            show(userMainPage)
            displayClientDetails(client)
            // bookingsFetch().then(data => {
            //     console.log(data)
            //     changeBookingData(data, allRoomsData)
            // })
            changeBookingData(allBookingsData, allRoomsData)
            currentClient = client
            showPastBookings()
            displayRoomTypeOptions()
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
    let dateInput = calenderInput.value.split("-")
        selectedDate = dateInput.join("/")
        console.log('select date', selectedDate)
    let availableRooms = currentClient.filterBookingsByDate(selectedDate)
    if(!availableRooms) {
        errorMessage.innerText = "Sorry there are no rooms available for your selected date, please try again"
    }
    else {
    // console.log('available rooms by roomdate', availableRooms)
    // console.log('current Client filtered rooms', currentClient.filteredBookings)
    errorMessage.innerText = ''
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
}

function showAvailableRoomsByRoomType() {
    let availableRooms = currentClient.filterRoomByRoomType(roomTypeSelection.options[roomTypeSelection.selectedIndex].text)
    console.log('room selection', roomTypeSelection.options[roomTypeSelection.selectedIndex].text)
    // console.log('available rooms by roomtype', availableRooms)
    // console.log('current Client filtered rooms', currentClient.filteredBookings)
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
    if(selectedDate === '' || roomTypeSelection.options[roomTypeSelection.selectedIndex].text === 'Room Type') {
        errorMessage.innerText = "Sorry there are no rooms available for your selected date or Room type, please try again"
    }
    else {
        errorMessage.innerText = ''
    let bookings = currentClient.bookRoom(event.target.id)
    // console.log('booking', bookings)
    // console.log('event', event.target.id)
    let specificBooking = bookings.find(booking => booking.bookingId === event.target.id)
    // console.log('specific', specificBooking)
    roomNumber = specificBooking.roomNumber
    addBookingsPost()
    availableRoomsContainer.innerHTML = ''
    currentClient.filteredBookings.forEach(filteredBooking => {
        availableRoomsContainer.innerHTML += `<section class="room-details-and-book-container">
        <section class="room-info">
          <p class="room-spec" id="${filteredBooking.bookingId}">Room Type: ${filteredBooking.roomType}</p>
          <p class="room-spec" id="room-detail-title">Room Details:</p>
          <p class="room-spec" id="room-bed-info">Bed size: ${filteredBooking.bedSize} [x${filteredBooking.numBeds}]</p>
          <p class="room-spec" id="room-date-info">Available Date: ${filteredBooking.date}</p>
        </section>
        <section class="rates-and-book">
          <p class="room-spec" id="rates">$${filteredBooking.costPerNight} per night</p>
          <button class="book" id='${filteredBooking.bookingId}'>Book</button>
        </section>
      </section>`
    })
    pastAndUpcomingBookingContainer.innerHTML = ''
    bookings.forEach(booking => {
        pastAndUpcomingBookingContainer.innerHTML += `<section class="user-booking-details">
        <p class="room-spec2" id="date-booked">Date Booked: ${booking.date}</p>
        <p class="room-spec2" id="room-detail-title">Room Details:</p>
        <p class="room-spec2" id="room-bed-info">Bed size: ${booking.bedSize} [x${booking.numBeds}]</p>
        <p class="room-spec2" id="rates2"> Cost: $${booking.costPerNight} per night</p>
      </section>`
    })
    calculateClientExpenses()
    }
}

function showPastBookings() {
    console.log('new client', currentClient)
    let clientBookedRooms = currentClient.determineUserPastBookings()
    pastAndUpcomingBookingContainer.innerHTML = ''
    // console.log('clientBookedRooms', currentClient.bookingRoomDetails)
    currentClient.roomsBooked.forEach(bookedRoom => {
        pastAndUpcomingBookingContainer.innerHTML += `<section tabindex="0" class="user-booking-details">
        <p class="room-spec2" id="date-booked">Date Booked: ${bookedRoom.date}</p>
        <p class="room-spec2" id="room-detail-title">Room Details:</p>
        <p class="room-spec2" id="room-bed-info">Bed size: ${bookedRoom.bedSize} [x${bookedRoom.numBeds}]</p>
        <p class="room-spec2" id="rates2"> Cost: $${bookedRoom.costPerNight} per night</p>
      </section>`
    })
    calculateClientExpenses()
}

function calculateClientExpenses() {
    let expenses = currentClient.userExpenseTotal()
    //console.log('expenses', expenses)
    userExpenseMessage.innerText = `Your total expenses: $${expenses}`
}

function userLogOutFunction() {
    hide(userMainPage)
    show(loginPage)
    hide(incorrentLoginText)
    clients = []
    availableRoomsContainer.innerHTML = ''
    pastAndUpcomingBookingContainer.innerHTML = ''
    allCustomersFetch()
    roomsFetch()
    bookingsFetch()
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