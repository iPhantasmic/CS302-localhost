
import BookingClient from '../services/booking/BookingClient'
import SNSPublisher from '../services/email/booking_confirmed'

const client = BookingClient()
const email_client = new SNSPublisher()

export default (root: any, params: any) => {
    return new Promise((resolve: any, reject: any) => {
        console.log(params)
        params.data = {
            "end_date": "2022-04-23 10:34:23",
            "host_id": -1706664529,
            "listing_id": 1624135236,
            "payment_id": -782025083,
            "start_date": "2022-04-22 10:34:23",
            "user_id": 1552476736
        }
        console.log(params)
        console.log(params.data)
        client.CreateBooking(
            params.data,
            function (err: any, response: any) {
                if (err) {
                    return reject(err)
                }
                const booking_id = response["id"]
                console.log(booking_id)
                client.DeleteBookingById(booking_id)

                //Stripe call here:
                //  - Rollback by deleting transaction ID
                const test_data = {
                    data:{
                        receiverEmail:"nicholasong.2020@smu.edu.sg",
                        propertyName: 'Seminyak Kuta Utara',
                        receiptId: 'RC4E4KBBHD',
                        paymentDate: 'October 17, 2022',
                        paymentTime: '11:00:21 PM GMT+8',
                        bookingStartDate: 'Thu, Dec 8, 2022',
                        bookingEndDate: 'Tue, Dec 13, 2022',
                        unitPrice: 125.1,
                        numNights: 5,
                        subTotal: 625.5,
                        serviceFee: 95.5,
                        totalPrice: 721.0,
                    }
                }

                email_client.publish_message_booking_confirmed(test_data)
                resolve(response)
            }
        )
    })
}
