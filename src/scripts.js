// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

//question to ask heather
//when i add a booking from the manager page, the current clients bookings
//doesn't update. 
//it will update after i logout
//but when i try to add multiple bookings for a client,
//the dom doesn't update when i log out and back in
//it will only update (in the console) when i find my client again
//my question is then, why is my dom not updating when i post a booking
//the post DOES work
//but the dom is not updating
//noticed: when i run my function to update the dom
//it seems to run before the post is done updating the server data
//is there a way to go around it? I know this is a problem 
//because of async java
//but i just can't think of any other way to call my functions 
//so that it will have access to the new posted data from the manager page
//am i even going in the right direction for the manager page?

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
//imported classes
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
const searchBookingsButton = document.querySelector('.search-button')
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
const guestPastAndUpcomingBookingContainer = document.querySelector('.guest-bookings-container')
const guestExpenseMessage = document.querySelector('.guest-expenses')
const searchBookingsButton2 = document.querySelector('.search-button2')
const guestRoomTypeOptions = document.querySelector('#guest-roomtype-options')
const managerCalenderInput = document.querySelector('#managerCalenderInput')
const managerErrorMessage = document.querySelector('.manager-error-message')
const loadingAnimation = document.querySelector('.loader')
//global variables
let allCustomersData;
let clients = []
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
searchBookingsButton.addEventListener('click', showAvailableRoomsByDateandRoomType)
searchBookingsButton2.addEventListener('click', function(event) {
    managerBookRoom(event)
})
availableRoomsContainer.addEventListener('click', function(event) {
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
    fetch(`http://localhost:3001/api/v1/bookings`)
    .then(response => response.json())
    .then(data => {
        allBookingsData = data.bookings
        //currentClient.determineUserPastBookings()
        console.log('bookings data', allBookingsData)
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
          managerErrorMessage.innerHTML = ''
          return response.json()
        }
      })
      .then(() => bookingsFetch())
      .catch(err => {
        errorMessage.innerHTML = `${err.message}`
        managerErrorMessage.innerHTML = `${err.message}`
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
            displayRoomNumbers()
            renderRoomsBookedOnCurrentDate()
            calculateTotalRevenueForDate()
            availableRoomsStats()
            todaysDate.innerText = `${currentDay}'s Stats`
            occupiedRoomsStats.innerText = `Occupied Rooms: ${(roomsBookedOnDay.length/allRoomsData.length)*100}%`
        }
        else {
            show(incorrentLoginText)
        }
    })
}

function findGuest(event) {
    event.preventDefault()
    currentClient = clients.find(client => client.name.toLowerCase() === findGuestInput.value.toLowerCase())
    currentClient.determineUserPastBookings()
    updateGuestPastAndUpcomingBookings()
    calculateClientExpenses()
    console.log('found guest bookin options', currentClient.bookingRoomDetails)
    console.log('clinet booking1 find', currentClient.roomsBooked)
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

function showAvailableRoomsByDateandRoomType() {
    let dateInput = calenderInput.value.split("-")
        selectedDate = dateInput.join("/")
        console.log('select date', selectedDate)
    let availableRooms = currentClient.filterByDateAndOrRoomType(selectedDate, roomTypeSelection.options[roomTypeSelection.selectedIndex].text)
    if(!availableRooms) {
        errorMessage.innerText = "Sorry, there are no rooms available for your selected date and or room type. Please try again"
    }
    else {
    errorMessage.innerText = ''
    updateAvailableContainer()
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
    let specificBooking = bookings.find(booking => booking.bookingId === event.target.id)
    roomNumber = specificBooking.roomNumber
    addBookingsPost()
    updateAvailableContainer()
    updatePastAndUpcomingBookingsContainer()
    calculateClientExpenses()
}

function managerBookRoom(event) {
    event.preventDefault()
    let dateInput = managerCalenderInput.value.split("-")
    selectedDate = dateInput.join("/")
    console.log('date', selectedDate)
    roomNumber = parseInt(guestRoomTypeOptions.options[guestRoomTypeOptions.selectedIndex].text)
    addBookingsPost()
    currentClient.determineUserPastBookings()//this uses the old data since the post hasn'r fetched the new bookings data in time
    console.log('allbookingsdata afterpost', allBookingsData)
    // updateGuestDetails()
    updateGuestPastAndUpcomingBookings()
    calculateClientExpenses()
    //findGuest(event)
    // setTimeout(updateGuestDetails, 2000)
    // disableElement(searchBookingsButton2)
    // show(loadingAnimation)
    console.log('clinet booking2 add', currentClient.roomsBooked)
}

function deleteRoom(event) {
    if(event.target.classList.contains(`manager-delete-booking`)) {
        deleteBookingsFetch(event.target.id)
        // currentClient.determineUserPastBookings()
        // console.log('changed client rooms', currentClient.bookingRoomDetails)
        // updateGuestPastAndUpcomingBookings()
        // calculateClientExpenses()
       //updateGuestDetails()
       updateGuestPastAndUpcomingBookings()
       calculateClientExpenses()
        // findGuest(event)
        console.log('allbookingsdata after delete', allBookingsData)
    }
}


function updateGuestDetails() {
    //guestPastAndUpcomingBookingContainer.innerHTML = ''
    const details = currentClient.determineUserPastBookings()
    console.log('detaisl', details)
    console.log('changed client rooms', currentClient.bookingRoomDetails)
    console.log('update rooms booked?', currentClient.roomsBooked)
    updateGuestPastAndUpcomingBookings()
    calculateClientExpenses()
    // enableElement(searchBookingsButton2)
    // hide(loadingAnimation)
}

function currentDate() {
    let date = new Date().toISOString().split('T')[0]
    const splitDate = date.split("-")
    const joinDate = splitDate.join('/')
    currentDay = joinDate
}


function displayRoomNumbers() {
    let roomNumbers = allRoomsData.map(room => room.number)
    guestRoomTypeOptions.innerHTML = ''
    roomNumbers.forEach(roomNumber => 
        guestRoomTypeOptions.innerHTML += `
        <option disabled hidden selected>Room Number</option>
        <option value="${roomNumber}">${roomNumber}</option>`
        )
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
    currentClient = ''
    userExpenseMessage.innerText = `Your total expenses: $0.00`
    guestExpenseMessage.innerText = `Guest total expenses: $0.00`
    availableRoomsContainer.innerHTML = ``
    pastAndUpcomingBookingContainer.innerHTML = ``
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

function disableElement(element) {
    element.disabled = true
  }
  
function enableElement(element) {
    element.disabled = false
}