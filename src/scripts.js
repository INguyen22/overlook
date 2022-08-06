// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
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
const userLogOut = document.querySelector('.user-logout-button')
const welcomeUserMessage = document.querySelector('.welcome-user')
const userExpenseMessage = document.querySelector('.user-expenses')
const calenderInput = document.querySelector('#calenderInput')
const searchDateButton = document.querySelector('.search-button')
const errorMessage = document.querySelector('.error-message')
const availableRoomsContainer = document.querySelector('.rooms-container')
const pastAndUpcomingBookingContainer = document.querySelector(".user-bookings-container")
const roomTypeSelection = document.querySelector('select')
//manager-page querySelectors
const managerPage = document.querySelector('.manager-page')
const managerLogOut = document.querySelector('.manager-logout-button')
const todaysDate = document.querySelector('.today-stats')
const occupiedRoomsStats = document.querySelector('#occupiedRooms')
const revenueStats = document.querySelector('#totalRevenue')
const roomsAvailableStats = document.querySelector('#roomsAvailable')
//global variables
let allCustomersData;
let clients = []
let customerInfo;
let currentClient;
let allRoomsData;
let allBookingsData;
let selectedDate;
let roomNumber;
let currentDay;
let roomsBookedOnDay = []

//event listeners
window.addEventListener('load', function() {
    allCustomersFetch()
    roomsFetch()
    bookingsFetch()
})
loginButton.addEventListener('click', login)
userLogOut.addEventListener('click', userLogOutFunction)
managerLogOut.addEventListener('click', managerLogOutFunction)
searchDateButton.addEventListener('click', showAvailableRoomsByDateandRoomType)
// roomTypeSubmitButton.addEventListener('click', showAvailableRoomsByRoomType)
availableRoomsContainer.addEventListener('click', function(event) {
    bookRoom(event)
})
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
    // console.log(changeBookingDetails)
    return changeBookingDetails
}



function login(event) {
    event.preventDefault()
    return clients.find(client => {
        if(client.username === username.value && password.value === "overlook2021") {
            console.log('client', client)
            hide(loginPage)
            show(userMainPage)
            displayClientDetails(client)
            changeBookingData(allBookingsData, allRoomsData)
            currentClient = client
            showPastBookings()
            displayRoomTypeOptions()
            return client
        }
        else if(username.value === "manager" && password.value === "overlook2021") {
            hide(loginPage)
            show(managerPage)
            currentDate()
            todaysDate.innerText = `${currentDay}'s Stats`
            changeBookingData(allBookingsData, allRoomsData)
            displayRoomTypeOptions()
            renderRoomsBookedOnCurrentDate()
            calculateTotalRevenueForDate()
            availableRooms()
            occupiedRoomsStats.innerText = `Occupied Rooms: ${(roomsBookedOnDay.length/allRoomsData.length)*100}%`
            roomsAvailableStats.innerText = `Rooms Available: 999`
            //calculateTotalRevenueForDate()
            //showPastBookings()
            //console.log('current day', )
        }
        else {
            show(incorrentLoginText)
        }
    })
}

function showPastBookings() {
    clients.forEach(client => client.determineUserPastBookings())
    console.log('new client', currentClient)
    updatePastAndUpcomingBookingsContainer()
    calculateClientExpenses()
}

function calculateClientExpenses() {
    let expenses = currentClient.userExpenseTotal()
    //console.log('expenses', expenses)
    userExpenseMessage.innerText = `Your total expenses: $${expenses}`
}

function showAvailableRoomsByDateandRoomType() {
    let dateInput = calenderInput.value.split("-")
        selectedDate = dateInput.join("/")
        console.log('select date', selectedDate)
    let availableRooms = currentClient.filterByDateAndOrRoomType(selectedDate, roomTypeSelection.options[roomTypeSelection.selectedIndex].text)
    if(!availableRooms) {
        errorMessage.innerText = "Sorry, there are no rooms available for your selected date and or room type. Please try again"
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

function displayRoomTypeOptions() {
    let roomTypes = allRoomsData.map(room => room.roomType)
    let uniqueRoomTypes = roomTypes.filter((roomType, index) => {
        return roomTypes.indexOf(roomType) === index
    })
    roomTypeSelection.innerHTML = ''
    uniqueRoomTypes.forEach(roomType => {
        // <option disabled hidden selected>Room Type</option>
        roomTypeSelection.innerHTML += `
        <option value="${roomType}">${roomType}</option>`
    })
}

function bookRoom(event) {
    let bookings = currentClient.bookRoom(event.target.id)
    // console.log('booking', bookings)
    // console.log('event', event.target.id)
    let specificBooking = bookings.find(booking => booking.bookingId === event.target.id)
    // console.log('specific', specificBooking)
    roomNumber = specificBooking.roomNumber
    addBookingsPost()
    updateAvailableContainer()
    updatePastAndUpcomingBookingsContainer()
    calculateClientExpenses()
}

function currentDate() {
    let date = new Date().toLocaleDateString()
    const splitDate = date.split("/")
    const reverseDate = splitDate.reverse()
    const joinDate = reverseDate.join('/')
    // console.log(reverseDate)
    currentDay = joinDate
}

function findGuest(guestName) {
    return customerInfo = clients.find(client => client.name === guestName)
}

function renderRoomsBookedOnCurrentDate() {
    //console.log('cleinets', clients)
    const roomsBooked = clients.forEach(client => {
        client.bookingRoomDetails.forEach(booking => {
            //need current date to be in format og yyyy/mm/dd
            if(booking.date === "2022/04/22") {
                roomsBookedOnDay.push(booking)
            }
        })
    })
    console.log('rooms booked on day', roomsBookedOnDay)
    const uniqueBookedRooms = []
    const unique = roomsBookedOnDay.filter(room => {
        const isDuplicate = uniqueBookedRooms.includes(room.bookingId)
        if(!isDuplicate) {
            uniqueBookedRooms.push(room.bookingId)
            return true
        }
        return false
    })
    console.log('unique rooms booked on daye', unique)
    return roomsBookedOnDay = unique
}

function availableRooms() {
    const uniqueRoomNumber = []
    const uniqueRoomNumbers = roomsBookedOnDay.filter(room => {
        const isDuplicateRoomNumber = uniqueBookedRooms.includes(room.roomNumber)
        if(!isDuplicateRoomNumber) {
            uniqueRoomNumber
        }
})
}

function calculateTotalRevenueForDate() {
   const revenue = roomsBookedOnDay.reduce((sum, room) => {
        let total = sum + room.costPerNight
        return total
   }, 0)
   return revenueStats.innerText = `Total Revenue: $${revenue.toFixed(2)}`
}
        

function updateAvailableContainer() {
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
}

function updatePastAndUpcomingBookingsContainer() {
    pastAndUpcomingBookingContainer.innerHTML = ''
    currentClient.roomsBooked.forEach(booking => {
        pastAndUpcomingBookingContainer.innerHTML += `<section class="user-booking-details">
        <p class="room-spec2" id="date-booked">Date Booked: ${booking.date}</p>
        <p class="room-spec2" id="room-detail-title">Room Details:</p>
        <p class="room-spec2" id="room-bed-info">Bed size: ${booking.bedSize} [x${booking.numBeds}]</p>
        <p class="room-spec2" id="rates2"> Cost: $${booking.costPerNight} per night</p>
      </section>`
    })
}

function userLogOutFunction() {
    hide(userMainPage)
    show(loginPage)
    hide(incorrentLoginText)
    resetAndReFetch()
}

function managerLogOutFunction() {
    hide(managerPage)
    show(loginPage)
    hide(incorrentLoginText)
    resetAndReFetch()
}

function displayClientDetails(client) {
    welcomeUserMessage.innerText = `Welcome, ${client.name}`
    userExpenseMessage.innerText = `Your total expenses: $${client.expenses}`
}

function resetAndReFetch() {
    clients = []
    availableRoomsContainer.innerHTML = ''
    pastAndUpcomingBookingContainer.innerHTML = ''
    allCustomersFetch()
    roomsFetch()
    bookingsFetch()
}

function show(element) {
    element.classList.remove('hidden')
}

function hide(element) {
    element.classList.add('hidden')
}