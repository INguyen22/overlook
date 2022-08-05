// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

//problem, when i book a room
//the post generates a new booking with a new id
//this id is not in the availble booking options
//so it's not splicing
// but that shouldnt matter since i'm splicing by user id


import './css/styles.css';
//imported classes
import Bookings from './classes/bookings.js'
import Rooms from './classes/rooms.js'
import User from './classes/user.js'
import Manager from './classes/manager.js'

//login-page querySelectors
const loginPage = document.querySelector('.login-page')
const username = document.querySelector('#userLoginValue')
const password = document.querySelector('#userPassLoginValue')
const loginButton = document.querySelector('.login-button')
const incorrentLoginText = document.querySelector('.incorrect-login-text')
//user-page querySelectors
const userMainPage = document.querySelector('.user-main-page')
//const userLogOut = document.querySelector('.user-logout-button')
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
    singleCustomerFetch()
    //allCustomersFetch()
    roomsFetch()
    bookingsFetch()
    //displayRoomTypeOptions()
})
//loginButton.addEventListener('click', login)
//userLogOut.addEventListener('click', userLogOutFunction)
//managerLogOut.addEventListener('click', managerLogOutFunction)
searchDateButton.addEventListener('click', showAvailableRoomsByDate)
roomTypeSubmitButton.addEventListener('click', showAvailableRoomsByRoomType)
availableRoomsContainer.addEventListener('click', function(event) {
    bookRoom(event)
})
//fetch functions
// function allCustomersFetch() {
//     fetch(`http://localhost:3001/api/v1/customers`)
//     .then(response => response.json())
//     .then(data => {
//         allCustomersData = data.customers
//         let currentClientData = allCustomersData[Math.floor(Math.random() * allCustomersData.length)]
//         allCustomersData.find()
//         currentClient = new User(currentClientData)
//         console.log('client', currentClient)
//         //console.log(allCustomersData)
//         //clientGenerator()
//     })
// }

function singleCustomerFetch() {
    fetch(`http://localhost:3001/api/v1/customers/12`)
    .then(response => response.json())
    .then(data => {
        currentClient = new User(data)
        console.log(currentClient)
    })
}

function roomsFetch() {
    fetch(`http://localhost:3001/api/v1/rooms`)
    .then(response => response.json())
    .then(data => {
        allRoomsData = data.rooms
        displayRoomTypeOptions()
        //console.log('rooms data', allRoomsData)
    })
}

function bookingsFetch() {
    fetch(`http://localhost:3001/api/v1/bookings`)
    .then(response => response.json())
    .then(data => {
        allBookingsData = data.bookings
        changeBookingData(allBookingsData, allRoomsData)
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

function changeBookingData(bookingsData, roomsData) {
    let clientBookingData =  currentClient.determineBookingRoomType(bookingsData, roomsData)
    //showPastBookings()
    console.log('og rooms booked', currentClient.roomsBooked)
    //showPastBookings()
    //currentClient.bookingRoomDetails = clientBookingData
    console.log('clientBookingData', currentClient.bookingRoomDetails)
    showPastBookings()
    displayClientDetails(currentClient)
    return currentClient.bookingRoomDetails
}

function showPastBookings() {
    console.log('hi')
    // changeBookingData(allBookingsData, allRoomsData)
    console.log(currentClient)
    console.log('og rooms booked', currentClient.roomsBooked)
    //console.log('available rooms', currentClient.bookingRoomDetails)
    currentClient.determineUserPastBookings()
    // displayClientDetails(currentClient)
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
function showAvailableRoomsByDate() {
    let dateInput = calenderInput.value.split("-")
        selectedDate = dateInput.join("/")
        console.log('select date', selectedDate)
    let availableRooms = currentClient.filterBookingsByDate(selectedDate)
    if(!availableRooms) {
        errorMessage.innerText = "Sorry there are no rooms available for your selected date, please try again"
    }
    else {
    console.log('available rooms by roomdate', availableRooms)
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
    console.log('rooms available by room type', availableRooms)
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
    console.log('target id', event.target.id)
    let bookings = currentClient.bookRoom(event.target.id)
    if(selectedDate === undefined || roomTypeSelection.options[roomTypeSelection.selectedIndex].text === 'Room Type') {
        errorMessage.innerText = "Sorry there are no rooms available for your selected date or Room type, please try again"
    }
    else {
        errorMessage.innerText = ''
    // console.log('booking', bookings)
    // console.log('event', event.target.id)
    let specificBooking = bookings.find(booking => booking.bookingId === event.target.id)
    // console.log('specific', specificBooking)
    currentClient.roomsBooked = []
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
    console.log('rooms booked', currentClient.roomsBooked)
    }
}

// function userLogOutFunction() {
//     hide(userMainPage)
//     show(loginPage)
//     hide(incorrentLoginText)
//     currentClient = ''
//     allRoomsData = ''
//     allBookingsData = ''
// }

// function managerLogOutFunction() {
//     hide(managerPage)
//     show(loginPage)
//     hide(incorrentLoginText)
// }

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