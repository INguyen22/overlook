import './css/styles.css';
//imported classes
import Bookings from './classes/bookings.js'
import Rooms from './classes/rooms.js'
import User from './classes/user.js'

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
let year;
let month;
let day;

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
findGuestSubmitButton.addEventListener('click', findGuest)

//fetch functions
function allCustomersFetch() {
    fetch(`http://localhost:3001/api/v1/customers`)
    .then(response => response.json())
    .then(data => {
        allCustomersData = data.customers
        clientGenerator()
    })
}

function roomsFetch() {
    fetch(`http://localhost:3001/api/v1/rooms`)
    .then(response => response.json())
    .then(data => {
        allRoomsData = data.rooms
    })
}

function bookingsFetch() {
    return fetch(`http://localhost:3001/api/v1/bookings`)
    .then(response => response.json())
    .then(data => {
        allBookingsData = data.bookings
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
            clearErrorMessages()
            return response.json()
        }
    })
    .then(newBooking => roomIdFromPost = newBooking.newBooking.id)
    .then(() => bookingsFetch())
    .catch(err => {
        errorMessage.innerText = `${err.message}`
        managerErrorMessage.innerText = `${err.message}`
    })
}

function deleteBookingsFetch(bookingId) {
    return fetch(`http://localhost:3001/api/v1/bookings/${bookingId}`, {
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
    return allCustomersData.forEach(customer => {
        clients.push(new User(customer))
    })
}

function changeBookingData(bookingsData, roomsData) {
    const changeBookingDetails = clients.forEach(client => {
        client.determineBookingRoomType(bookingsData, roomsData)
    })
    return changeBookingDetails
}

function login(event) {
    event.preventDefault()
    return clients.find(client => {
        if(client.username === username.value && password.value === "overlook2021") {
            renderClientPage(client)
            return client
        }
        else if(username.value === "manager" && password.value === "overlook2021") {
            renderManagerPage()
        }
        else {
            show(incorrentLoginText)
        }
    })
}

function showPastBookings() {
    clients.forEach(client => client.determineUserPastBookings())
    updatePastAndUpcomingBookingsContainer()
    calculateClientExpenses()
}

function calculateClientExpenses() {
    let expenses = currentClient.userExpenseTotal()
    expenseMessages(expenses)
}

function renderRoomsAvailable(dateValue) {
    let dateInput = dateValue.value.split("-")
    selectedDate = dateInput.join("/")
    determineAvailableRoomsConditions()
}

function filterAvailableRoomsByRoomType(selection) {
    let filteredRoomTypes = availableRoomsonDate.filter(room => room.roomType === selection)
    resetAvailableRoomsContainers()
    filteredRoomTypes.forEach(room => {
        filterRoomTypeContainers(room)
    })
}

async function bookRoom(event) {
    if(event.target.classList.contains('book')) {
        roomNumber = parseInt(event.target.id)
        await addBookingsPost().then(() => updateAvailableRoomsAndContainers())
    }
}


async function deleteRoom(event) {
    if(event.target.classList.contains(`manager-delete-booking`)) {
        await deleteBookingsFetch(event.target.id).then(() => {
            removeDeletedRoomFromClientsBookedRooms(event)
        })
    }
}

function currentDate() {
    let date = new Date().toISOString().split('T')[0]
    const splitDate = date.split("-")
    const joinDate = splitDate.join('/')
    currentDay = joinDate
    currentDateNumbers()
}

function currentDateNumbers() {
    let splitDay = currentDay.split('/')
    const dateNumbers = splitDay.map(date => parseInt(date))
    year = dateNumbers[0]
    month = dateNumbers[1]
    day = dateNumbers[2]
}

function findGuest() {
    if(findGuestInput.value === '') {
        managerErrorMessage.innerText = `Please enter the client's first and last name`
    } else {
        clearErrorMessages()
        currentClient = clients.find(client => client.name.toLowerCase() === findGuestInput.value.toLowerCase())
        currentClient.determineUserPastBookings()
        updateGuestPastAndUpcomingBookings()
        calculateClientExpenses()
    }
}

function displayRoomTypeOptions() {
    let roomTypes = allRoomsData.map(room => room.roomType)
    let uniqueRoomTypes = roomTypes.filter((roomType, index) => {
        return roomTypes.indexOf(roomType) === index
    })
    renderRoomTypeOptions(uniqueRoomTypes)
}

function renderRoomsBookedOnCurrentDate() {
    clients.forEach(client => {
        client.bookingRoomDetails.forEach(booking => {
            if(booking.date === currentDay) {
                roomsBookedOnDay.push(booking)
            }
        })
    })
    renderUniqueRooms()
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

function renderClientPage(client) {
    hide(loginPage)
    show(userMainPage)
    displayClientDetails(client)
    changeBookingData(allBookingsData, allRoomsData)
    currentClient = client
    showPastBookings()
    displayRoomTypeOptions()
}

function renderManagerPage() {
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

function renderRoomTypeOptions(uniqueRoomTypes) {
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

function determineAvailableRoomsConditions() {
    if(selectedDate === '' || findGuestInput.value === '' && !managerPage.classList.contains('hidden')) {
        errorMessage.innerText = 'Please select a date'
        managerErrorMessage.innerText = 'Please select a date or find a client'
    } else {
        availableRoomsonDate = currentClient.renderAvailableRooms(selectedDate, allBookingsData, allRoomsData)
        resetAvailableRoomsContainers()
        clearErrorMessages()
        if(availableRoomsonDate.length !== 0) {
            clearErrorMessages()
            availableRoomsonDate.forEach(room => {
                filterRoomTypeContainers(room)
            })
        } else {
            displayNoRoomsError()
        }
    }
}

function renderUniqueRooms() {
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

function updateAvailableRoomsAndContainers() {
    availableRoomsonDate.forEach(room => {
        if(room.number === roomNumber) {
            room.bookingId = roomIdFromPost
            room.date = selectedDate
            currentClient.roomsBooked.push(room)
            availableRoomsonDate.splice(availableRoomsonDate.indexOf(room), 1)
        }
    })
    updateAvailableContainer()
    updatePastAndUpcomingBookingsContainer()
    updateGuestAvailableBookings()
    updateGuestPastAndUpcomingBookings()
    calculateClientExpenses()
}

function removeDeletedRoomFromClientsBookedRooms(event) {
    currentClient.roomsBooked.forEach(bookedRoom => {
        let splitBookedDate = bookedRoom.date.split('/')
        let bookedDateNumbers = splitBookedDate.map(bookedDate => parseInt(bookedDate))
        if(bookedRoom.bookingId === event.target.id && bookedDateNumbers[0] >= year) {
                managerErrorMessage.innerHTML = ''
                currentClient.roomsBooked.splice(currentClient.roomsBooked.indexOf(bookedRoom), 1)
                updateGuestPastAndUpcomingBookings()
                calculateClientExpenses()
            } else {
                managerErrorMessage.innerHTML = 'That booking is from the past no need to delete it.'
            }
        })
    }
    
function resetAvailableRoomsContainers() {
    availableRoomsContainer.innerHTML = ''
    guestAvailableRoomsContainer.innerHTML = ''
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
        <button class="manager-delete-booking" id=${booking.bookingId}>Delete</button>
      </section>`
        })
}

function filterRoomTypeContainers(room) {
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
}

function clearErrorMessages() {
    errorMessage.innerText = ''
    managerErrorMessage.innerText = ''
}

function displayNoRoomsError() {
    errorMessage.innerText = "Sorry, all rooms are booked on this date! 😭 Please choose another date."
    managerErrorMessage.innerText = "Sorry, all rooms are booked on this date! 😭 Please choose another date."
}

function expenseMessages(expenses) {
    userExpenseMessage.innerText = `Your total expenses: $${expenses}`
    guestExpenseMessage.innerText = `Guest total expenses: $${expenses}`
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
    resetExpenseMessages()
    setVariablesToEmptyStringAndArrays()
    clearErrorMessages()
    allCustomersFetch()
    roomsFetch()
    bookingsFetch()
}

function resetExpenseMessages() {
    userExpenseMessage.innerText = `Your total expenses: $0.00`
    guestExpenseMessage.innerText = `Guest total expenses: $0.00`
}

function setVariablesToEmptyStringAndArrays() {
    clients = []
    currentClient = ''
    availableRoomsContainer.innerHTML = ``
    pastAndUpcomingBookingContainer.innerHTML = ``
    guestAvailableRoomsContainer.innerHTML = ''
    guestPastAndUpcomingBookingContainer.innerHTML = ''
    calenderInput.value = ''
    managerCalenderInput.value = ''
    findGuestInput.value = ''
}

function show(element) {
    element.classList.remove('hidden')
}

function hide(element) {
    element.classList.add('hidden')
}