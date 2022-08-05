import { expect } from 'chai';
import User from '../src/classes/user';

describe('user', () => {
    let user1;
    let bookingsData;
    let roomsData;
    beforeEach(() => {
        bookingsData = [
            {id: '5fwrgu4i7k55hl6sz', userID: 9, date: '2022/04/22', roomNumber: 15},
            {id: '5fwrgu4i7k55hl6t5', userID: 43, date: '2022/01/24', roomNumber: 24},
            {id: '5fwrgu4i7k55hl6t6', userID: 13, date: '2022/01/10', roomNumber: 12},
            {id: '5fwrgu4i7k55hl6t7', userID: 20, date: '2022/02/16', roomNumber: 7},
            {id: '5fwrgu4i7k55hl6t8', userID: 1, date: '2022/02/05', roomNumber: 12},
            {id: '5fwrgu4i7k55hl6t9', userID: 38, date: '2022/02/14', roomNumber: 14},
            {id: '5fwrgu4i7k55hl6ta', userID: 25, date: '2022/01/11', roomNumber: 9},
            {id: '5fwrgu4i7k55hl6tb', userID: 49, date: '2022/02/06', roomNumber: 5},
            {id: '5fwrgu4i7k55hl6tc', userID: 22, date: '2022/01/30', roomNumber: 13},
            {id: '5fwrgu4i7k55hl6td', userID: 27, date: '2022/01/31', roomNumber: 20},
            {id: '5fwrgu4i7k55hl6te', userID: 44, date: '2022/01/19', roomNumber: 8}
            ]
        
        roomsData = [
            {
            bedSize: "queen",
            bidet: true,
            costPerNight: 358.4,
            numBeds: 1,
            number: 1,
            roomType: "residential suite"
            },
            {
            bedSize: "full",
            bidet: false,
            costPerNight: 477.38,
            numBeds: 2,
            number: 2,
            roomType: "suite"
            },
            {
            bedSize: "king",
            bidet: false,
            costPerNight: 491.14,
            numBeds: 1,
            number: 3,
            roomType: "single room"
            },
            {
            bedSize: "queen",
            bidet: false,
            costPerNight: 429.44,
            numBeds: 1,
            number: 4,
            roomType: "single room"
            },
            {
            bedSize: "queen",
            bidet: true,
            costPerNight: 340.17,
            numBeds: 2,
            number: 5,
            roomType: "single room"
            },
            {
            bedSize: "queen",
            bidet: true,
            costPerNight: 397.02,
            numBeds: 1,
            number: 6,
            roomType: "junior suite"
            },
            {
            bedSize: "queen",
            bidet: false,
            costPerNight: 231.46,
            numBeds: 2,
            number: 7,
            roomType: "single room",
            },
            {
            bedSize: "king",
            bidet: false,
            costPerNight: 261.26,
            numBeds: 1,
            number: 8,
            roomType: "junior suite"
            },
            {
            bedSize: "queen",
            bidet: true,
            costPerNight: 200.39,
            numBeds: 1,
            number: 9,
            roomType: "single room"
            },
            {
            bedSize: "twin",
            bidet: false,
            costPerNight: 497.64,
            numBeds: 1,
            number: 10,
            roomType: "suite"
            },
            {
            bedSize: "twin",
            bidet: true,
            costPerNight: 207.24,
            numBeds: 2,
            number: 11,
            roomType: "single room"
            },
            {
            bedSize: "twin",
            bidet: false,
            costPerNight: 172.09,
            numBeds: 2,
            number: 12,
            roomType: "single room"
            },
            {
            bedSize: "queen",
            bidet: false,
            costPerNight: 423.92,
            numBeds: 2,
            number: 13,
            roomType: "single room"
            },
            {
            bedSize: "twin",
            bidet: false,
            costPerNight: 457.88,
            numBeds: 1,
            number: 14,
            roomType: "residential suite"
            },
            {
            bedSize: "full",
            bidet: false,
            costPerNight: 294.56,
            numBeds: 1,
            number: 15,
            roomType: "residential suite"
            },
            {
            bedSize: "full",
            bidet: false,
            costPerNight: 325.6,
            numBeds: 2,
            number: 16,
            roomType: "single room"
            },
            {
            bedSize: "twin",
            bidet: false,
            costPerNight: 328.15,
            numBeds: 2,
            number: 17,
            roomType: "junior suite"
            },
            {
            bedSize: "king",
            bidet: false,
            costPerNight: 496.41,
            numBeds: 2,
            number: 18,
            roomType: "junior suite"
            },
            {
            bedSize: "queen",
            bidet: false,
            costPerNight: 374.67,
            numBeds: 1,
            number: 19,
            roomType: "single room"
            },
            {
            bedSize: "queen",
            bidet: false,
            costPerNight: 343.95,
            numBeds: 1,
            number: 20,
            roomType: "residential suite"
            },
            {
            bedSize: "full",
            bidet: false,
            costPerNight: 429.32,
            numBeds: 2,
            number: 21,
            roomType: "single room"
            },
            {
            bedSize: "full",
            bidet: false,
            costPerNight: 350.31,
            numBeds: 2,
            number: 22,
            roomType: "single room"
            },
            {
            bedSize: "queen",
            bidet: false,
            costPerNight: 176.36,
            numBeds: 2,
            number: 23,
            roomType: "residential suite"
            },
            {
            bedSize: "queen",
            bidet: false,
            costPerNight: 327.24,
            numBeds: 1,
            number: 24,
            roomType: "suite"
            },
            {
            bedSize: "queen",
            bidet: true,
            costPerNight: 305.85,
            numBeds: 1,
            number: 25,
            roomType: "single room"
            }
            ]

        const userSample = {id: 1, name: 'Leatha Ullrich'}
 
        user1 = new User(userSample)
    })

    it('should be a function', () => {
        expect(User).to.be.a('function')
    })

    it('should be an instance of User', () => {
        expect(user1).to.be.an.instanceof(User)
    })

    it('should have a id', () => {
        expect(user1.id).to.equal(1)
    })

    it('should have a username', () => {
        expect(user1.username).to.equal(`customer1`)
    })

    it('should have a name', () => {
        expect(user1.name).to.equal('Leatha Ullrich')
    })

    it('should have a empty array as default for booking room details', () => {
        expect(user1.bookingRoomDetails).to.deep.equal([])
    })

    it('should clarify booking room details', () => {
        user1.determineBookingRoomType(bookingsData, roomsData)
        expect(user1.bookingRoomDetails[0]).to.deep.equal({
            bookingId: '5fwrgu4i7k55hl6sz',
            userId: 9,
            roomNumber: 15,
            roomType: 'residential suite',
            bidet: false,
            bedSize: 'full',
            numBeds: 1,
            costPerNight: 294.56,
            date: '2022/04/22'
        })
    })

    it('should start out with no rooms booked', () => {
        expect(user1.roomsBooked).to.deep.equal([])
    })

    it('should have rooms booked from booking data', () => {
        user1.determineBookingRoomType(bookingsData, roomsData)
        user1.determineUserPastBookings()
        expect(user1.roomsBooked[0]).to.deep.equal(
                {
                  bookingId: '5fwrgu4i7k55hl6t8',
                  userId: 1,
                  roomNumber: 12,
                  roomType: 'single room',
                  bidet: false,
                  bedSize: 'twin',
                  numBeds: 2,
                  costPerNight: 172.09,
                  date: '2022/02/05'
                }
            )
    })

    it('should remove rooms that the user already has booked from data', () => {
        user1.determineBookingRoomType(bookingsData, roomsData)
        user1.determineUserPastBookings()
        expect(user1.bookingRoomDetails).to.deep.equal(
            [
                {
                bookingId: '5fwrgu4i7k55hl6sz',
                userId: 9,
                roomNumber: 15,
                roomType: 'residential suite',
                bidet: false,
                bedSize: 'full',
                numBeds: 1,
                costPerNight: 294.56,
                date: '2022/04/22'
                },
                {
                bookingId: '5fwrgu4i7k55hl6t5',
                userId: 43,
                roomNumber: 24,
                roomType: 'suite',
                bidet: false,
                bedSize: 'queen',
                numBeds: 1,
                costPerNight: 327.24,
                date: '2022/01/24'
                },
                {
                bookingId: '5fwrgu4i7k55hl6t6',
                userId: 13,
                roomNumber: 12,
                roomType: 'single room',
                bidet: false,
                bedSize: 'twin',
                numBeds: 2,
                costPerNight: 172.09,
                date: '2022/01/10'
                },
                {
                bookingId: '5fwrgu4i7k55hl6t7',
                userId: 20,
                roomNumber: 7,
                roomType: 'single room',
                bidet: false,
                bedSize: 'queen',
                numBeds: 2,
                costPerNight: 231.46,
                date: '2022/02/16'
                },
                {
                bookingId: '5fwrgu4i7k55hl6t9',
                userId: 38,
                roomNumber: 14,
                roomType: 'residential suite',
                bidet: false,
                bedSize: 'twin',
                numBeds: 1,
                costPerNight: 457.88,
                date: '2022/02/14'
                },
                {
                bookingId: '5fwrgu4i7k55hl6ta',
                userId: 25,
                roomNumber: 9,
                roomType: 'single room',
                bidet: true,
                bedSize: 'queen',
                numBeds: 1,
                costPerNight: 200.39,
                date: '2022/01/11'
                },
                {
                bookingId: '5fwrgu4i7k55hl6tb',
                userId: 49,
                roomNumber: 5,
                roomType: 'single room',
                bidet: true,
                bedSize: 'queen',
                numBeds: 2,
                costPerNight: 340.17,
                date: '2022/02/06'
                },
                {
                bookingId: '5fwrgu4i7k55hl6tc',
                userId: 22,
                roomNumber: 13,
                roomType: 'single room',
                bidet: false,
                bedSize: 'queen',
                numBeds: 2,
                costPerNight: 423.92,
                date: '2022/01/30'
                },
                {
                bookingId: '5fwrgu4i7k55hl6td',
                userId: 27,
                roomNumber: 20,
                roomType: 'residential suite',
                bidet: false,
                bedSize: 'queen',
                numBeds: 1,
                costPerNight: 343.95,
                date: '2022/01/31'
                },
                {
                bookingId: '5fwrgu4i7k55hl6te',
                userId: 44,
                roomNumber: 8,
                roomType: 'junior suite',
                bidet: false,
                bedSize: 'king',
                numBeds: 1,
                costPerNight: 261.26,
                date: '2022/01/19'
                }
            ]
        )
    })

    it('should start out with no expenses', () => {
        expect(user1.expenses).to.equal(0)
    })

    it('should be able to book a room', () => {
        user1.determineBookingRoomType(bookingsData, roomsData)
        user1.bookRoom('5fwrgu4i7k55hl6sz')
        expect(user1.roomsBooked[0]).to.deep.equal({
            bookingId: '5fwrgu4i7k55hl6sz',
            userId: 9,
            roomNumber: 15,
            roomType: 'residential suite',
            bidet: false,
            bedSize: 'full',
            numBeds: 1,
            costPerNight: 294.56,
            date: '2022/04/22'
        })
    })

    it('should be able to book multiple rooms', () => {
        user1.determineBookingRoomType(bookingsData, roomsData)
        user1.bookRoom('5fwrgu4i7k55hl6sz')
        user1.bookRoom('5fwrgu4i7k55hl6t5')
        expect(user1.roomsBooked).to.deep.equal([
            {
            bookingId: '5fwrgu4i7k55hl6sz',
            userId: 9,
            roomNumber: 15,
            roomType: 'residential suite',
            bidet: false,
            bedSize: 'full',
            numBeds: 1,
            costPerNight: 294.56,
            date: '2022/04/22'
            },
            {
            bookingId: '5fwrgu4i7k55hl6t5',
            userId: 43,
            roomNumber: 24,
            roomType: 'suite',
            bidet: false,
            bedSize: 'queen',
            numBeds: 1,
            costPerNight: 327.24,
            date: '2022/01/24'
            }]
        )
    })

    it('should remove booking from available options when booked', () => {
        user1.determineBookingRoomType(bookingsData, roomsData)
        user1.bookRoom('5fwrgu4i7k55hl6sz')
        expect(user1.bookingRoomDetails).to.deep.equal(
            [
                {
                bookingId: '5fwrgu4i7k55hl6t5',
                userId: 43,
                roomNumber: 24,
                roomType: 'suite',
                bidet: false,
                bedSize: 'queen',
                numBeds: 1,
                costPerNight: 327.24,
                date: '2022/01/24'
                },
                {
                bookingId: '5fwrgu4i7k55hl6t6',
                userId: 13,
                roomNumber: 12,
                roomType: 'single room',
                bidet: false,
                bedSize: 'twin',
                numBeds: 2,
                costPerNight: 172.09,
                date: '2022/01/10'
                },
                {
                bookingId: '5fwrgu4i7k55hl6t7',
                userId: 20,
                roomNumber: 7,
                roomType: 'single room',
                bidet: false,
                bedSize: 'queen',
                numBeds: 2,
                costPerNight: 231.46,
                date: '2022/02/16'
                },
                {
                bookingId: '5fwrgu4i7k55hl6t8',
                userId: 1,
                roomNumber: 12,
                roomType: 'single room',
                bidet: false,
                bedSize: 'twin',
                numBeds: 2,
                costPerNight: 172.09,
                date: '2022/02/05'
                },
                {
                bookingId: '5fwrgu4i7k55hl6t9',
                userId: 38,
                roomNumber: 14,
                roomType: 'residential suite',
                bidet: false,
                bedSize: 'twin',
                numBeds: 1,
                costPerNight: 457.88,
                date: '2022/02/14'
                },
                {
                bookingId: '5fwrgu4i7k55hl6ta',
                userId: 25,
                roomNumber: 9,
                roomType: 'single room',
                bidet: true,
                bedSize: 'queen',
                numBeds: 1,
                costPerNight: 200.39,
                date: '2022/01/11'
                },
                {
                bookingId: '5fwrgu4i7k55hl6tb',
                userId: 49,
                roomNumber: 5,
                roomType: 'single room',
                bidet: true,
                bedSize: 'queen',
                numBeds: 2,
                costPerNight: 340.17,
                date: '2022/02/06'
                },
                {
                bookingId: '5fwrgu4i7k55hl6tc',
                userId: 22,
                roomNumber: 13,
                roomType: 'single room',
                bidet: false,
                bedSize: 'queen',
                numBeds: 2,
                costPerNight: 423.92,
                date: '2022/01/30'
                },
                {
                bookingId: '5fwrgu4i7k55hl6td',
                userId: 27,
                roomNumber: 20,
                roomType: 'residential suite',
                bidet: false,
                bedSize: 'queen',
                numBeds: 1,
                costPerNight: 343.95,
                date: '2022/01/31'
                },
                {
                bookingId: '5fwrgu4i7k55hl6te',
                userId: 44,
                roomNumber: 8,
                roomType: 'junior suite',
                bidet: false,
                bedSize: 'king',
                numBeds: 1,
                costPerNight: 261.26,
                date: '2022/01/19'
                }
            ]
        )
    })

    it('should be able to calculate the total of expenses for the booked rooms', () => {
        user1.determineBookingRoomType(bookingsData, roomsData)
        user1.bookRoom('5fwrgu4i7k55hl6sz')
        user1.bookRoom('5fwrgu4i7k55hl6t5')
        user1.userExpenseTotal()
        expect(user1.expenses).to.equal('621.80')
    })


    it('should remove booking from filtered list when booked', () => {
        user1.determineBookingRoomType(bookingsData, roomsData)
        user1.filterByDateAndOrRoomType('2022/04/22', 'residential suite')
        user1.bookRoom('5fwrgu4i7k55hl6sz')
        expect(user1.filteredBookings).to.deep.equal([])
    })

    it('should filter filter rooms by date only', () => {
        user1.determineBookingRoomType(bookingsData, roomsData)
        user1.filterByDateAndOrRoomType('2022/01/24', 'suite')
        expect(user1.filteredBookings).to.deep.equal([
            {
                bookingId: '5fwrgu4i7k55hl6t5',
                userId: 43,
                roomNumber: 24,
                roomType: 'suite',
                bidet: false,
                bedSize: 'queen',
                numBeds: 1,
                costPerNight: 327.24,
                date: '2022/01/24'
              }
        ])
    })

    it('should give a notice when no rooms are available for a date', () => {
        user1.determineBookingRoomType(bookingsData, roomsData)
        expect(user1.filterByDateAndOrRoomType('2022/01/24', 'single room')).to.equal(false)
    })
})