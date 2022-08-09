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

// determineBookingRoomType(bookingsData, roomsData)
// [
//     {
//       bookingId: '5fwrgu4i7k55hl6sz',
//       userId: 9,
//       roomNumber: 15,
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
//       roomNumber: 24,
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
//       roomNumber: 12,
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
//       roomNumber: 7,
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
//       roomNumber: 12,
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
//       roomNumber: 14,
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
//       roomNumber: 9,
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
//       roomNumber: 5,
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
//       roomNumber: 13,
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
//       roomNumber: 20,
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
//       roomNumber: 8,
//       roomType: 'junior suite',
//       bidet: false,
//       bedSize: 'king',
//       numBeds: 1,
//       costPerNight: 261.26,
//       date: '2022/01/19'
//     }
//   ]

//render availableRooms on '2022/01/11'
// [
//     {
//       bedSize: 'queen',
//       bidet: true,
//       costPerNight: 358.4,
//       numBeds: 1,
//       number: 1,
//       roomType: 'residential suite'
//     },
//     {
//       bedSize: 'full',
//       bidet: false,
//       costPerNight: 477.38,
//       numBeds: 2,
//       number: 2,
//       roomType: 'suite'
//     },
//     {
//       bedSize: 'king',
//       bidet: false,
//       costPerNight: 491.14,
//       numBeds: 1,
//       number: 3,
//       roomType: 'single room'
//     },
//     {
//       bedSize: 'queen',
//       bidet: false,
//       costPerNight: 429.44,
//       numBeds: 1,
//       number: 4,
//       roomType: 'single room'
//     },
//     {
//       bedSize: 'queen',
//       bidet: true,
//       costPerNight: 340.17,
//       numBeds: 2,
//       number: 5,
//       roomType: 'single room'
//     },
//     {
//       bedSize: 'queen',
//       bidet: true,
//       costPerNight: 397.02,
//       numBeds: 1,
//       number: 6,
//       roomType: 'junior suite'
//     },
//     {
//       bedSize: 'queen',
//       bidet: false,
//       costPerNight: 231.46,
//       numBeds: 2,
//       number: 7,
//       roomType: 'single room'
//     },
//     {
//       bedSize: 'king',
//       bidet: false,
//       costPerNight: 261.26,
//       numBeds: 1,
//       number: 8,
//       roomType: 'junior suite'
//     },
//     {
//       bedSize: 'twin',
//       bidet: false,
//       costPerNight: 497.64,
//       numBeds: 1,
//       number: 10,
//       roomType: 'suite'
//     },
//     {
//       bedSize: 'twin',
//       bidet: true,
//       costPerNight: 207.24,
//       numBeds: 2,
//       number: 11,
//       roomType: 'single room'
//     },
//     {
//       bedSize: 'twin',
//       bidet: false,
//       costPerNight: 172.09,
//       numBeds: 2,
//       number: 12,
//       roomType: 'single room'
//     },
//     {
//       bedSize: 'queen',
//       bidet: false,
//       costPerNight: 423.92,
//       numBeds: 2,
//       number: 13,
//       roomType: 'single room'
//     },
//     {
//       bedSize: 'twin',
//       bidet: false,
//       costPerNight: 457.88,
//       numBeds: 1,
//       number: 14,
//       roomType: 'residential suite'
//     },
//     {
//       bedSize: 'full',
//       bidet: false,
//       costPerNight: 294.56,
//       numBeds: 1,
//       number: 15,
//       roomType: 'residential suite'
//     },
//     {
//       bedSize: 'full',
//       bidet: false,
//       costPerNight: 325.6,
//       numBeds: 2,
//       number: 16,
//       roomType: 'single room'
//     },
//     {
//       bedSize: 'twin',
//       bidet: false,
//       costPerNight: 328.15,
//       numBeds: 2,
//       number: 17,
//       roomType: 'junior suite'
//     },
//     {
//       bedSize: 'king',
//       bidet: false,
//       costPerNight: 496.41,
//       numBeds: 2,
//       number: 18,
//       roomType: 'junior suite'
//     },
//     {
//       bedSize: 'queen',
//       bidet: false,
//       costPerNight: 374.67,
//       numBeds: 1,
//       number: 19,
//       roomType: 'single room'
//     },
//     {
//       bedSize: 'queen',
//       bidet: false,
//       costPerNight: 343.95,
//       numBeds: 1,
//       number: 20,
//       roomType: 'residential suite'
//     },
//     {
//       bedSize: 'full',
//       bidet: false,
//       costPerNight: 429.32,
//       numBeds: 2,
//       number: 21,
//       roomType: 'single room'
//     },
//     {
//       bedSize: 'full',
//       bidet: false,
//       costPerNight: 350.31,
//       numBeds: 2,
//       number: 22,
//       roomType: 'single room'
//     },
//     {
//       bedSize: 'queen',
//       bidet: false,
//       costPerNight: 176.36,
//       numBeds: 2,
//       number: 23,
//       roomType: 'residential suite'
//     },
//     {
//       bedSize: 'queen',
//       bidet: false,
//       costPerNight: 327.24,
//       numBeds: 1,
//       number: 24,
//       roomType: 'suite'
//     },
//     {
//       bedSize: 'queen',
//       bidet: true,
//       costPerNight: 305.85,
//       numBeds: 1,
//       number: 25,
//       roomType: 'single room'
//     }
//   ]