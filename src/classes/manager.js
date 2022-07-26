class Manager {
    constructor(dateDetails) {
        this.roomsAvaiable = dateDetails.roomsAvaiable
        this.revenue = dateDetails.revenue
        this.occupiedRooms = dateDetails.occupiedRooms //in percent
        this.guests = []
        this.guestsBookings = []
        this.availableRooms = []
    }
    findGuest() {

    }
    addBookingForGuest() {

    }
    deleteBookingForGuest() {

    }
}

export default Manager