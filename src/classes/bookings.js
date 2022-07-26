class Bookings {
    constructor(bookingsData, roomsData) {
        this.id = bookingsData.id
        this.userID = bookingsData.userID
        this.date = bookingsData.date
        this.bookingRoomNumber = bookingsData.roomNumber
    }
}

export default Bookings