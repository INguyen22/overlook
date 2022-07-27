import { expect } from 'chai';
import Bookings from '../src/classes/bookings';

describe('bookings', () => {
    let booking1;
    beforeEach(() => {
        const bookingSample = {id: '5fwrgu4i7k55hl6sz', 
            userID: 9, 
            date: '2022/04/22', 
            roomNumber: 15}
 
        booking1 = new Bookings(bookingSample)
    })

    it.skip('should be a function', () => {
        expect(Bookings).to.be.a('function')
    })

    it.skip('should be an instance of Bookings', () => {
        expect(booking1).to.be.an.instanceof(Bookings)
    })

    it.skip('should have an id', () => {
        expect(booking1.id).to.equal('5fwrgu4i7k55hl6sz')
    })

    it.skip('should have a user id', () => {
        expect(booking1.userID).to.equal(9)
    })

    it.skip('should have a booking date', () => {
        expect(booking1.date).to.equal('2022/04/22')
    })

    it.skip('should have a room number', () => {
        expect(booking1.bookingRoomNumber).to.equal(15)
    })
})