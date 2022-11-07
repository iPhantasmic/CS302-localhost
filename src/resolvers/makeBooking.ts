import BookingClient from '../services/booking/BookingClient'
import SNSPublisher from '../services/email/booking_confirmed'

const client = BookingClient()
const email_client = new SNSPublisher()

export default (root: any, params: any) => {
    return new Promise((resolve: any, reject: any) => {
        console.log(params)
        client.CreateBooking(params.data, async function (err: any, response: any) {
            if (err) {
                return reject(err)
            }

            const bookingId = response['id']

            const rollback_data = {
                bookingId: bookingId,
            }

            try {
                // Stripe Code
                const paymentIntent = await response.json()
                console.log(paymentIntent)

                //Prepare message to send to SNS
                //TODO: retrieve listing details from db
                const test_data = {
                    data: {
                        receiverEmail: 'omerwai.2020@scis.smu.edu.sg',
                        propertyName: 'Aura House Eco Bamboo House',
                        receiptId: 'RC4E4KBBHD',
                        paymentDate: 'November 7, 2022',
                        paymentTime: '11:00:21 PM GMT+8',
                        bookingStartDate: 'Thu, Dec 8, 2022',
                        bookingEndDate: 'Tue, Dec 13, 2022',
                        unitPrice: 100.0,
                        numNights: 5,
                        subTotal: 500.0,
                        serviceFee: 20.0,
                        totalPrice: 520.0,
                    },
                }
                email_client.publish_message_booking_confirmed(test_data)

                resolve(paymentIntent)
            } catch {
                //Rollback for booking in event payment fails
                client.DeleteBookingById(
                    rollback_data,
                    function (err: any, response: any) {
                        if (err) {
                            return reject(err)
                        }
                    }
                )
            }
        })
    })
}
