class Rooms {
    constructor(roomDetails) {
        this.bedSize = roomDetails.bedSize
        this.hasBidet = roomDetails.bidet 
        this.costPerNight = roomDetails.costPerNight
        this.numBeds = roomDetails.numBeds
        this.roomNumber = roomDetails.number
        this.roomType = roomDetails.roomType
    }
}

export default Rooms