import { APIRequestContext, expect } from "@playwright/test";
import { bookingDetails } from "../types/bookingTypes";

export class ApiUtils {
    readonly request: APIRequestContext;
    constructor(request: APIRequestContext){
        this.request = request;
    }

    async generateToken() {
        const response = await this.request.post("/auth", 
            {
                headers: {
                    "Content-Type": "application/json",
                }, 
                data: {
                    "username": process.env.ADMIN_USERNAME,
                    "password" : process.env.ADMIN_PASSWORD,
                }
        });

        if(response.ok()){
            expect(response.status()).toBe(200);
            const { token } = await response.json();
            return token;
        } else {
            throw new Error(`Failed to generate token: ${response.status()}`);
        }
    }

    async createBooking( { bookingData : bookingDetails } :  { bookingData : bookingDetails } ) {
        const response = await this.request.post("/booking", { data: bookingDetails });
        if(response.ok()){
            expect(response.status()).toBe(200);
            return response.json();
        } else {
            throw new Error(`Failed to create booking: ${response.status()}`);
        }
    }

    async getBookings() {
        const response = await this.request.get("/booking");
        if(response.ok()){
            expect(response.status).toBe(200);
        } else {
            throw new Error(`Failed to get bookings: ${response.status()}`);
        }
    }

    async getBookingById( bookingId: number){
        const response = await this.request.get(`/booking/${bookingId}`);
        if(response.ok()){
            expect(response.status()).toBe(200);
        } else {
            throw new Error(`Failed to get booking by id: ${response.status()}`);
        }
    }

    async deleteBooking( bookingId: number, token: string){
        const response = await this.request.delete(`/booking/${bookingId}`, 
            {
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `token=${token}`,
                }
            }
        );

        if(response.ok()){
            expect(response.status()).toBe(200);
        } else {
            throw new Error(`Failed to delete booking: ${response.status()}`);
        }
    }
}