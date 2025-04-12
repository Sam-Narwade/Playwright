import { APIRequestContext, expect, test, request } from "@playwright/test";
import { ApiUtils } from "../../utils/apiUtils";
import { validBooking } from "../../testData/bookingData";

test.describe("Authentication test", () => {
    let apiContext : APIRequestContext;
    let apiUtils: ApiUtils;

    test.beforeAll(async ({ playwright }) => {
        apiContext = await request.newContext();
        apiUtils = new ApiUtils(apiContext);
    });

    test.afterAll(async () => {
        // Clean up API request context after tests
        await apiContext.dispose();
    });

    test("Verify token generation successfully with correct credentials.", async () => {
        const token = await apiUtils.generateToken();
        expect(token).toBeDefined();
    });

    test('Invalid Login Verification', async () => {
        const response = await apiContext.post('/auth', {
          data: {
            username: 'invalidUser',
            password: 'wrongPass',
          },
        });
        const body = await response.json();
        expect(body.reason).toBe('Bad credentials');
    });

    test("Verify user can create new Booking", async () => {
        const response =  await apiUtils.createBooking({ bookingData: validBooking });
        const { booking } = response;
        expect(response).toHaveProperty("bookingid");
        expect(booking.firstname).toEqual(validBooking.firstname);
        expect(booking.lastname).toEqual(validBooking.lastname);
        expect(booking.totalprice).toEqual(validBooking.totalprice);
        expect(booking.depositpaid).toEqual(validBooking.depositpaid);
        expect(booking.bookingdates.checkin).toEqual(validBooking.bookingdates.checkin);
        expect(booking.bookingdates.checkout).toEqual(validBooking.bookingdates.checkout);
        expect(booking.additionalneeds).toEqual(validBooking.additionalneeds);
    })
})