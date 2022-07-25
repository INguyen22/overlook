class Bookings {
    constructor(bookingDetails) {
        this.id = bookingDetails.id
        this.userID = bookingDetails.userID
        this.date = bookingDetails.date
        this.bookingRoomNumber = bookingDetails.roomNumber
    }
}

export default Bookings