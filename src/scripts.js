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
const searchBookingsButton = document.querySelector('.search-button-date')
const filterBookingsButton = document.querySelector('.filter-button-room')
const errorMessage = document.querySelector('.error-message')
const availableRoomsContainer = document.querySelector('.rooms-container')
const pastAndUpcomingBookingContainer = document.querySelector(".user-bookings-container")
const roomTypeSelection = document.querySelector('#user-roomtype-options')
//manager-page querySelectors
const managerPage = document.querySelector('.manager-page')
const managerLogOut = document.querySelector('.manager-logout-button')
const todaysDate = document.querySelector('.today-stats')
const occupiedRoomsStats = document.querySelector('#occupiedRooms')
const revenueStats = document.querySelector('#totalRevenue')
const roomsAvailableStats = document.querySelector('#roomsAvailable')
const findGuestInput = document.querySelector('#findGuestInput')
const findGuestSubmitButton = document.querySelector('.search-guest-button')
const guestAvailableRoomsContainer = document.querySelector('.guest-rooms-container')
const guestPastAndUpcomingBookingContainer = document.querySelector('.guest-bookings-container')
const guestExpenseMessage = document.querySelector('.guest-expenses')
const managerSearchRoomDateButton = document.querySelector('.search-button-date2')
const managerFilterRoomButton = document.querySelector('.filter-button-room2')
const guestRoomTypeOptions = document.querySelector('#guest-roomtype-options')
const managerCalenderInput = document.querySelector('#managerCalenderInput')
const managerErrorMessage = document.querySelector('.manager-error-message')
//global variables
let allCustomersData;
let clients = []
let currentClient;
let allRoomsData;
let allBookingsData;
let selectedDate;
let roomNumber;
let availableRoomsonDate;
let currentDay;
let roomsBookedOnDay = []
let roomIdFromPost;

//event listeners
window.addEventListener('load', function() {
    allCustomersFetch()
    roomsFetch()
    bookingsFetch()
})
loginButton.addEventListener('click', login)
userLogOut.addEventListener('click', userLogOutFunction)
managerLogOut.addEventListener('click', managerLogOutFunction)
searchBookingsButton.addEventListener('click', function() {
    //showAvailableRoomsByDateandRoomType(calenderInput)
    renderRoomsAvailable(calenderInput)
})
filterBookingsButton.addEventListener('click', function() {
    filterAvailableRoomsByRoomType(roomTypeSelection.options[roomTypeSelection.selectedIndex].text)
})
managerSearchRoomDateButton.addEventListener('click', function() {
    renderRoomsAvailable(managerCalenderInput)
})
managerFilterRoomButton.addEventListener('click', function() {
    filterAvailableRoomsByRoomType(guestRoomTypeOptions.options[guestRoomTypeOptions.selectedIndex].text)
})
availableRoomsContainer.addEventListener('click', function(event) {
    bookRoom(event)
})
guestAvailableRoomsContainer.addEventListener('click', function(event) {
    bookRoom(event)
})
guestPastAndUpcomingBookingContainer.addEventListener('click', function(event) {
    deleteRoom(event)
})
findGuestSubmitButton.addEventListener('click', function() {
    findGuest()
    console.log(currentClient)
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

function roomsFetch() {
    fetch(`http://localhost:3001/api/v1/rooms`)
    .then(response => response.json())
    .then(data => {
        allRoomsData = data.rooms
        //console.log('rooms data', allRoomsData)
    })
}

function bookingsFetch() {
    return fetch(`http://localhost:3001/api/v1/bookings`)
    .then(response => response.json())
    .then(data => {
        allBookingsData = data.bookings
        //console.log('bookings data', allBookingsData)
    })
}

function addBookingsPost() {
    return fetch(`http://localhost:3001/api/v1/bookings`, {
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
          console.log('json', response.Result)
          return response.json()
        }
    })
    .then(newBooking => {
        roomIdFromPost = newBooking.newBooking.id
        console.log('booking', newBooking.newBooking.id)
    })
    .then(() => bookingsFetch())
    .catch(err => {
        errorMessage.innerHTML = `${err.message}`
    })
}

function deleteBookingsFetch(bookingId) {
    fetch(`http://localhost:3001/api/v1/bookings/${bookingId}`, {
        method:'DELETE',
        headers: {"Content-Type": "application/json"},
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('There was an error removing a reservation, try again')
        } else {
            managerErrorMessage.innerHTML = ''
            return response.json()
        }
    })
    .then(() => bookingsFetch())
    .catch(err => {
      managerErrorMessage.innerHTML = `${err.message}`
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
            changeBookingData(allBookingsData, allRoomsData)
            renderRoomsBookedOnCurrentDate()
            calculateTotalRevenueForDate()
            availableRoomsStats()
            displayRoomTypeOptions()
            todaysDate.innerText = `${currentDay}'s Stats`
            occupiedRoomsStats.innerText = `Occupied Rooms: ${(roomsBookedOnDay.length/allRoomsData.length)*100}%`
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
    guestExpenseMessage.innerText = `Guest total expenses: $${expenses}`
}

function renderRoomsAvailable(dateValue) {
    console.log('manager date value', dateValue)
    let dateInput = dateValue.value.split("-")
    selectedDate = dateInput.join("/")
    console.log('date selected', selectedDate)
    availableRoomsonDate = currentClient.renderAvailableRooms(selectedDate, allBookingsData, allRoomsData)
    availableRoomsContainer.innerHTML = ''
    guestAvailableRoomsContainer.innerHTML = ''
    if(availableRoomsonDate.length !== 0) {
        availableRoomsonDate.forEach(room => {
            availableRoomsContainer.innerHTML += `<section class="room-details-and-book-container">
            <section class="room-info">
              <p class="room-spec" id="${room.number}">Room Type: ${room.roomType}</p>
              <p class="room-spec" id="room-detail-title">Room Details:</p>
              <p class="room-spec" id="room-bed-info">Bed size: ${room.bedSize} [x${room.numBeds}]</p>
              <p class="room-spec" id="room-date-info">Available Date: ${selectedDate}</p>
            </section>
            <section class="rates-and-book">
              <p class="room-spec" id="rates">$${room.costPerNight} per night</p>
              <button class="book" id='${room.number}'>Book</button>
            </section>
          </section>`

        guestAvailableRoomsContainer.innerHTML += `<section class="room-details-and-book-container">
          <section class="room-info">
            <p class="room-spec" id="${room.number}">Room Type: ${room.roomType}</p>
            <p class="room-spec" id="room-detail-title">Room Details:</p>
            <p class="room-spec" id="room-bed-info">Bed size: ${room.bedSize} [x${room.numBeds}]</p>
            <p class="room-spec" id="room-date-info">Available Date: ${selectedDate}</p>
          </section>
          <section class="rates-and-book">
            <p class="room-spec" id="rates">$${room.costPerNight} per night</p>
            <button class="book" id='${room.number}'>Book</button>
          </section>
        </section>`
        })
    }
}

function filterAvailableRoomsByRoomType(selection) {
    let filteredRoomTypes = availableRoomsonDate.filter(room => room.roomType === selection)
    availableRoomsContainer.innerHTML = ''
    guestAvailableRoomsContainer.innerHTML = ''
    filteredRoomTypes.forEach(room => {
        availableRoomsContainer.innerHTML += `<section class="room-details-and-book-container">
        <section class="room-info">
          <p class="room-spec" id="${room.number}">Room Type: ${room.roomType}</p>
          <p class="room-spec" id="room-detail-title">Room Details:</p>
          <p class="room-spec" id="room-bed-info">Bed size: ${room.bedSize} [x${room.numBeds}]</p>
          <p class="room-spec" id="room-date-info">Available Date: ${selectedDate}</p>
        </section>
        <section class="rates-and-book">
          <p class="room-spec" id="rates">$${room.costPerNight} per night</p>
          <button class="book" id='${room.number}'>Book</button>
        </section>
      </section>`

      guestAvailableRoomsContainer.innerHTML += `<section class="room-details-and-book-container">
      <section class="room-info">
        <p class="room-spec" id="${room.number}">Room Type: ${room.roomType}</p>
        <p class="room-spec" id="room-detail-title">Room Details:</p>
        <p class="room-spec" id="room-bed-info">Bed size: ${room.bedSize} [x${room.numBeds}]</p>
        <p class="room-spec" id="room-date-info">Available Date: ${selectedDate}</p>
      </section>
      <section class="rates-and-book">
        <p class="room-spec" id="rates">$${room.costPerNight} per night</p>
        <button class="book" id='${room.number}'>Book</button>
      </section>
    </section>`
    })
}

// function showAvailableRoomsByDateandRoomType(dateValue) {
//     let dateInput = dateValue.value.split("-")
//         selectedDate = dateInput.join("/")
//         console.log('select date', selectedDate)
//     let availableRooms = currentClient.filterByDateAndOrRoomType(selectedDate, roomTypeSelection.options[roomTypeSelection.selectedIndex].text)
//     if(!availableRooms) {
//         errorMessage.innerText = "Sorry, there are no rooms available for your selected date and or room type. Please try again"
//         managerErrorMessage.innerText = "Sorry, there are no rooms available for your selected date and or room type. Please try again"
//     }
//     else {
//     errorMessage.innerText = ''
//     managerErrorMessage.innerText = ''
//     updateAvailableContainer()
//     updateGuestAvailableBookings()
//     }
// }

function displayRoomTypeOptions() {
    let roomTypes = allRoomsData.map(room => room.roomType)
    let uniqueRoomTypes = roomTypes.filter((roomType, index) => {
        return roomTypes.indexOf(roomType) === index
    })
    roomTypeSelection.innerHTML = ''
    guestRoomTypeOptions.innerHTML = ''
    uniqueRoomTypes.forEach(roomType => {
        roomTypeSelection.innerHTML += `
        <option disabled hidden selected>Room Type</option>
        <option value="${roomType}">${roomType}</option>`

        guestRoomTypeOptions.innerHTML += `
        <option disabled hidden selected>Room Type</option>
        <option value="${roomType}">${roomType}</option>`
    })
}

function bookRoom(event) {
    if(event.target.classList.contains('book')) {
    roomNumber = parseInt(event.target.id)
    addBookingsPost()
    //bookingsFetch()
    console.log('room num', roomNumber)
    availableRoomsonDate.forEach(room => {
        if(room.number === roomNumber) {
            room.id = roomIdFromPost
            console.log('id', roomIdFromPost)
            room.date = selectedDate
            currentClient.roomsBooked.push(room)
            availableRoomsonDate.splice(availableRoomsonDate.indexOf(room), 1)
        }
    })
    console.log(availableRoomsonDate)
    bookingsFetch()
    updateAvailableContainer()
    updatePastAndUpcomingBookingsContainer()
    updateGuestAvailableBookings()
    updateGuestPastAndUpcomingBookings()
    calculateClientExpenses()
    }
}

function deleteRoom(event) {
    console.log('target', event.target.id)
    if(event.target.classList.contains(`manager-delete-booking`)) {
        deleteBookingsFetch(event.target.id)
        console.log(event.target.id)
        currentClient.roomsBooked.forEach(bookedRoom => {
            if(bookedRoom.bookingId === event.target.id || event.target.id === undefined) {
                currentClient.roomsBooked.splice(currentClient.roomsBooked.indexOf(bookedRoom), 1)
            }
        })
    updateGuestPastAndUpcomingBookings()
    calculateClientExpenses()
    }
}

function updateGuestDetails() {
    //guestPastAndUpcomingBookingContainer.innerHTML = ''
    currentClient.determineUserPastBookings()
    updateGuestAvailableBookings()
    updateGuestPastAndUpcomingBookings()
    calculateClientExpenses()
    // enableElement(searchBookingsButton2)
    // hide(loadingAnimation)
}

function updateContainers() {
    updateAvailableContainer()
    updatePastAndUpcomingBookingsContainer()
    updateGuestAvailableBookings()
    updateGuestPastAndUpcomingBookings()
}

function currentDate() {
    let date = new Date().toISOString().split('T')[0]
    const splitDate = date.split("-")
    const joinDate = splitDate.join('/')
    currentDay = joinDate
}

function findGuest() {
    currentClient = clients.find(client => client.name.toLowerCase() === findGuestInput.value.toLowerCase())
    currentClient.determineUserPastBookings()
    updateGuestPastAndUpcomingBookings()
    calculateClientExpenses()
}

function updateGuestAvailableBookings() {
    guestAvailableRoomsContainer.innerHTML = ''
    availableRoomsonDate.forEach(room => {
        guestAvailableRoomsContainer.innerHTML += `<section class="room-details-and-book-container">
        <section class="room-info">
        <p class="room-spec" id="${room.number}">Room Type: ${room.roomType}</p>
        <p class="room-spec" id="room-detail-title">Room Details:</p>
        <p class="room-spec" id="room-bed-info">Bed size: ${room.bedSize} [x${room.numBeds}]</p>
        <p class="room-spec" id="room-date-info">Available Date: ${selectedDate}</p>
        </section>
        <section class="rates-and-book">
        <p class="room-spec" id="rates">$${room.costPerNight} per night</p>
        <button class="book" id='${room.number}'>Book</button>
        </section>
        </section>`
    })
}

function updateGuestPastAndUpcomingBookings() {
    guestPastAndUpcomingBookingContainer.innerHTML = ''
    currentClient.roomsBooked.forEach(booking => {
        guestPastAndUpcomingBookingContainer.innerHTML += `<section class="guest-booking-details">
        <p class="room-spec2" id="date-booked">Date Booked: ${booking.date}</p>
        <p class="room-spec2" id="room-detail-title">Room Details:</p>
        <p class="room-spec2" id="room-bed-info">Bed size: ${booking.bedSize} [x${booking.numBeds}]</p>
        <p class="room-spec2" id="rates2"> Cost: $${booking.costPerNight} per night</p>
        <button class="manager-delete-booking" id=${roomIdFromPost || booking.bookingId}>Delete</button>
      </section>`
        })
}

function renderRoomsBookedOnCurrentDate() {
    const roomsBooked = clients.forEach(client => {
        client.bookingRoomDetails.forEach(booking => {
            if(booking.date === currentDay) {
                roomsBookedOnDay.push(booking)
            }
        })
    })
    const uniqueBookedRooms = []
    const unique = roomsBookedOnDay.filter(room => {
        const isDuplicate = uniqueBookedRooms.includes(room.bookingId)
        if(!isDuplicate) {
            uniqueBookedRooms.push(room.bookingId)
            return true
        }
        return false
    })
    return roomsBookedOnDay = unique
}

function availableRoomsStats() {
    const uniqueRoomNumber = []
    const uniqueRoomNumbers = roomsBookedOnDay.filter(room => {
        const isDuplicateRoomNumber = uniqueRoomNumber.includes(room.roomNumber)
        if(!isDuplicateRoomNumber) {
            uniqueRoomNumber.push(room.roomNumber)
            return true
        }
        return false
    })
    return roomsAvailableStats.innerText = `Rooms Available: ${allRoomsData.length - uniqueRoomNumbers.length}`
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
    availableRoomsonDate.forEach(room => {
        availableRoomsContainer.innerHTML += `<section class="room-details-and-book-container">
        <section class="room-info">
        <p class="room-spec" id="${room.number}">Room Type: ${room.roomType}</p>
        <p class="room-spec" id="room-detail-title">Room Details:</p>
        <p class="room-spec" id="room-bed-info">Bed size: ${room.bedSize} [x${room.numBeds}]</p>
        <p class="room-spec" id="room-date-info">Available Date: ${selectedDate}</p>
        </section>
        <section class="rates-and-book">
        <p class="room-spec" id="rates">$${room.costPerNight} per night</p>
        <button class="book" id='${room.number}'>Book</button>
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

function reFetch() {
    allCustomersFetch()
    roomsFetch()
    // bookingsFetch()
    // changeBookingData(allBookingsData, allRoomsData)
}

function resetAndReFetch() {
    clients = []
    currentClient = ''
    userExpenseMessage.innerText = `Your total expenses: $0.00`
    guestExpenseMessage.innerText = `Guest total expenses: $0.00`
    availableRoomsContainer.innerHTML = ``
    pastAndUpcomingBookingContainer.innerHTML = ``
    guestAvailableRoomsContainer.innerHTML = ''
    guestPastAndUpcomingBookingContainer.innerHTML = ''
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