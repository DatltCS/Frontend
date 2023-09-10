
class Seat {
  constructor(seatId, floor,isBooked, isChoosing) {
    this.seatId = seatId;
    this.seatImage = '/book-seat.png';
    this.seatImageChoosing = '/picking-seat.png';
    this.seatImageBooked = '/sold-seat.png';
    this.floor = floor;
    this.isBooked = isBooked;
    this.isChoosing = isChoosing
  }
}

export default Seat;