import { expect } from 'chai';
import Rooms from '../src/classes/rooms';

describe('rooms', () => {
    let room1;
    beforeEach(() => {
        const roomSample = {
            bedSize: "queen",
            bidet: true,
            costPerNight: 358.4,
            numBeds: 1,
            number: 1,
            roomType: "residential suite"
            }
 
        room1 = new Rooms(roomSample)
    })

    it.skip('should be a function', () => {
        expect(Rooms).to.be.a('function')
    })

    it.skip('should be an instance of Bookings', () => {
        expect(room1).to.be.an.instanceof(Rooms)
    })

    it.skip('should have a bed size', () => {
        expect(room1.bedSize).to.equal("queen")
    })

    it.skip('should clarify if the room has a bidet', () => {
        expect(room1.hasBidet).to.equal(true)
    })

    it.skip('should have a cost per night', () => {
        expect(room1.costPerNight).to.equal(358.4)
    })

    it.skip('should have a number of beds', () => {
        expect(room1.numBeds).to.equal(1)
    })

    it.skip('should have a room number', () => {
        expect(room1.roomNumber).to.equal(1)
    })

    it.skip('should have a type of room', () => {
        expect(room1.roomType).to.equal("residential suite")
    })
})