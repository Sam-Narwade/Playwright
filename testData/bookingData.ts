import { faker } from '@faker-js/faker';

export const generateBooking = () => ({
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  totalprice: faker.number.int({ min: 100, max: 5000 }),
  depositpaid: faker.datatype.boolean(),
  bookingdates: {
    checkin: faker.date.past().toISOString().split('T')[0],
    checkout: faker.date.future().toISOString().split('T')[0],
  },
  additionalneeds: faker.word.noun(),
});

export const validBooking = generateBooking();
