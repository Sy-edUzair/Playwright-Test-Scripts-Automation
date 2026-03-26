// Test data for Adactin Hotel Application

const testData = {
  validUser: {
    username: 'RandomGuy9571',   
    password: 'T87AC4', 
  },
  invalidUser: {
    username: 'invalidUser999',
    password: 'wrongPassword!',
  },

  search: {
    location: 'Sydney',
    hotel: 'Hotel Creek',
    roomType: 'Standard',
    numRooms: '1 - One',
    checkInDate: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 5);
      return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    })(),
    checkOutDate: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    })(),
    adultsPerRoom: '1 - One',
  },

  booking: {
    firstName: 'Uzair',
    lastName: 'Hussain',
    billingAddress: '123 Test Street, Sydney NSW 2000',
    creditCardNumber: '4111111111111111',
    creditCardType: 'Master Card',
    expiryMonth: 'December',
    expiryYear: '2027',
    cvvNumber: '123',
  },

  invalidBooking: {
    creditCardNumber: '1234567890123456',  // invalid card
    cvvNumber: '000',
  },
};

module.exports = { testData };
