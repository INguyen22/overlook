class Manager {
    constructor(dateDetails) {
        this.roomsAvaiable = dateDetails.roomsAvaiable
        this.revenue = dateDetails.revenue
        this.occupiedRooms = dateDetails.occupiedRooms //in percent
        this.guests = []
        this.guestsBookings = []
        this.availableRooms = []
    }
    calculateTotalRevenueForDate() {
        
    }

    occupiedRoomsForDate() {

    }

    availableRoomsForDate() {

    }

    deleteBookingForGuest() {

    }
}

export default Manager