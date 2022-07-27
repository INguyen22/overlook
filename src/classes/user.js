class User {
    constructor(userDetails) {
        this.id = userDetails.id
        this.name = userDetails.name
        this.bookingRoomDetails = []
        this.roomsBooked = []
        this.expenses = 0
    }

    filterBookingsByDate(date) {
        const filterRoomDate = roomDetails.filter(room => room.date === date)
        return filterRoomDate
    }

    filterRoomByRoomType(roomType) {
        const filterRoomType = roomDetails.filter(room => room.roomType === roomType)
        return filterRoomType
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
}

export default User

// determineBookingRoomType(bookingsData, roomsData)
// [
//     {
//       roomType: 'residential suite',
//       bidet: false,
//       bedSize: 'full',
//       numBeds: 1,
//       costPerNight: 294.56,
//       date: '2022/04/22'
//     },
//     {
//       roomType: 'suite',
//       bidet: false,
//       bedSize: 'queen',
//       numBeds: 1,
//       costPerNight: 327.24,
//       date: '2022/01/24'
//     },
//     {
//       roomType: 'single room',
//       bidet: false,
//       bedSize: 'twin',
//       numBeds: 2,
//       costPerNight: 172.09,
//       date: '2022/01/10'
//     },
//     {
//       roomType: 'single room',
//       bidet: false,
//       bedSize: 'queen',
//       numBeds: 2,
//       costPerNight: 231.46,
//       date: '2022/02/16'
//     },
//     {
//       roomType: 'single room',
//       bidet: false,
//       bedSize: 'twin',
//       numBeds: 2,
//       costPerNight: 172.09,
//       date: '2022/02/05'
//     },
//     {
//       roomType: 'residential suite',
//       bidet: false,
//       bedSize: 'twin',
//       numBeds: 1,
//       costPerNight: 457.88,
//       date: '2022/02/14'
//     },
//     {
//       roomType: 'single room',
//       bidet: true,
//       bedSize: 'queen',
//       numBeds: 1,
//       costPerNight: 200.39,
//       date: '2022/01/11'
//     },
//     {
//       roomType: 'single room',
//       bidet: true,
//       bedSize: 'queen',
//       numBeds: 2,
//       costPerNight: 340.17,
//       date: '2022/02/06'
//     },
//     {
//       roomType: 'single room',
//       bidet: false,
//       bedSize: 'queen',
//       numBeds: 2,
//       costPerNight: 423.92,
//       date: '2022/01/30'
//     },
//     {
//       roomType: 'residential suite',
//       bidet: false,
//       bedSize: 'queen',
//       numBeds: 1,
//       costPerNight: 343.95,
//       date: '2022/01/31'
//     },
//     {
//       roomType: 'junior suite',
//       bidet: false,
//       bedSize: 'king',
//       numBeds: 1,
//       costPerNight: 261.26,
//       date: '2022/01/19'
//     }
//   ]