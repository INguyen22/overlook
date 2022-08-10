class User {
    constructor(userDetails) {
        this.id = userDetails.id
        this.name = userDetails.name
        this.username = `customer${this.id}`
        this.bookingRoomDetails = []
        this.roomsBooked = []
        this.expenses = 0
    }

    renderAvailableRooms(date, bookingData, roomData) {
        let numberOfBookedRooms = bookingData.reduce((arr, booking) => {
          if(booking.date === date) {
            arr.push(booking.roomNumber)
          }
          return arr
        }, [])
        let availableRooms = roomData.reduce((arr, room) => {
          if(!numberOfBookedRooms.includes(room.number)) {
            arr.push(room)
          }
          return arr
        }, [])
        return availableRooms
      }

    userExpenseTotal() {
        const totalCost = this.roomsBooked.reduce((sum, room) => {
            let total = sum + room.costPerNight
            return total
        }, 0)
        return this.expenses = totalCost.toFixed(2)
    }

    determineBookingRoomType(bookingsData, roomsData) {
        const bookingRoomType = bookingsData.reduce((array, booking) => {
            roomsData.forEach(room => {
                if(room.number === booking.roomNumber) {
                    const specificBookingRoomDetail = {
                        bookingId: booking.id,
                        userId: booking.userID,
                        roomNumber: booking.roomNumber,
                        roomType: room.roomType,
                        bidet: room.bidet,
                        bedSize: room.bedSize,
                        numBeds: room.numBeds,
                        costPerNight: room.costPerNight,
                        date: booking.date
                    }
                    array.push(specificBookingRoomDetail)
                }
            })
            return array
        }, [])
        this.bookingRoomDetails = bookingRoomType
        return bookingRoomType
    }

    determineUserPastBookings() {
        const userBookedRooms = this.bookingRoomDetails.forEach(booking => {
            if(this.id === booking.userId) {
                this.roomsBooked.push(booking)
                this.bookingRoomDetails.splice(this.bookingRoomDetails.indexOf(booking), 1)
            }
        })
        return userBookedRooms
    }
}

export default User