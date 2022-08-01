class User {
    constructor(userDetails) {
        this.id = userDetails.id
        this.name = userDetails.name
        this.username = `customer${this.id}`
        this.bookingRoomDetails = []
        this.roomsBooked = []
        this.expenses = 0
    }

    filterBookingsByDate(date) {
        return this.bookingRoomDetails = this.bookingRoomDetails.filter(room => 
            room.date === date
        )
    }

    filterRoomByRoomType(roomType) {
        return this.bookingRoomDetails = this.bookingRoomDetails.filter(room => 
            room.roomType === roomType
        )
    }

    userExpenseTotal() {
        const totalCost = this.roomsBooked.reduce((sum, room) => {
            let total = sum + room.costPerNight
            return total
        }, 0)
        this.expenses = totalCost
        return totalCost
    }

    determineBookingRoomType(bookingsData, roomsData) {
        const bookingRoomType = bookingsData.reduce((array, booking) => {
            roomsData.forEach(room => {
                if(room.number === booking.roomNumber) {
                    const specificBookingRoomDetail = {
                        bookingId: booking.id,
                        userId: booking.userID,
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
            }
        })
        return userBookedRooms
    }

    bookRoom(roomId) {
        const bookRoom = this.bookingRoomDetails.forEach(bookingRoom => {
            if(bookingRoom.bookingId === roomId) {
                this.roomsBooked.push(bookingRoom)
            }
        })
        return this.roomsBooked
    }
}

export default User

// determineBookingRoomType(bookingsData, roomsData)
// [
//     {
//       bookingId: '5fwrgu4i7k55hl6sz',
//       userId: 9,
//       roomType: 'residential suite',
//       bidet: false,
//       bedSize: 'full',
//       numBeds: 1,
//       costPerNight: 294.56,
//       date: '2022/04/22'
//     },
//     {
//       bookingId: '5fwrgu4i7k55hl6t5',
//       userId: 43,
//       roomType: 'suite',
//       bidet: false,
//       bedSize: 'queen',
//       numBeds: 1,
//       costPerNight: 327.24,
//       date: '2022/01/24'
//     },
//     {
//       bookingId: '5fwrgu4i7k55hl6t6',
//       userId: 13,
//       roomType: 'single room',
//       bidet: false,
//       bedSize: 'twin',
//       numBeds: 2,
//       costPerNight: 172.09,
//       date: '2022/01/10'
//     },
//     {
//       bookingId: '5fwrgu4i7k55hl6t7',
//       userId: 20,
//       roomType: 'single room',
//       bidet: false,
//       bedSize: 'queen',
//       numBeds: 2,
//       costPerNight: 231.46,
//       date: '2022/02/16'
//     },
//     {
//       bookingId: '5fwrgu4i7k55hl6t8',
//       userId: 1,
//       roomType: 'single room',
//       bidet: false,
//       bedSize: 'twin',
//       numBeds: 2,
//       costPerNight: 172.09,
//       date: '2022/02/05'
//     },
//     {
//       bookingId: '5fwrgu4i7k55hl6t9',
//       userId: 38,
//       roomType: 'residential suite',
//       bidet: false,
//       bedSize: 'twin',
//       numBeds: 1,
//       costPerNight: 457.88,
//       date: '2022/02/14'
//     },
//     {
//       bookingId: '5fwrgu4i7k55hl6ta',
//       userId: 25,
//       roomType: 'single room',
//       bidet: true,
//       bedSize: 'queen',
//       numBeds: 1,
//       costPerNight: 200.39,
//       date: '2022/01/11'
//     },
//     {
//       bookingId: '5fwrgu4i7k55hl6tb',
//       userId: 49,
//       roomType: 'single room',
//       bidet: true,
//       bedSize: 'queen',
//       numBeds: 2,
//       costPerNight: 340.17,
//       date: '2022/02/06'
//     },
//     {
//       bookingId: '5fwrgu4i7k55hl6tc',
//       userId: 22,
//       roomType: 'single room',
//       bidet: false,
//       bedSize: 'queen',
//       numBeds: 2,
//       costPerNight: 423.92,
//       date: '2022/01/30'
//     },
//     {
//       bookingId: '5fwrgu4i7k55hl6td',
//       userId: 27,
//       roomType: 'residential suite',
//       bidet: false,
//       bedSize: 'queen',
//       numBeds: 1,
//       costPerNight: 343.95,
//       date: '2022/01/31'
//     },
//     {
//       bookingId: '5fwrgu4i7k55hl6te',
//       userId: 44,
//       roomType: 'junior suite',
//       bidet: false,
//       bedSize: 'king',
//       numBeds: 1,
//       costPerNight: 261.26,
//       date: '2022/01/19'
//     }
//   ]