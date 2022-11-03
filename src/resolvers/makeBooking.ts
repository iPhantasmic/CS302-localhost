import BookingClient from '../services/booking/BookingClient'
import SNSPublisher from '../services/email/booking_confirmed'

const client = BookingClient()
const email_client = new SNSPublisher()

export default (root: any, params: any) => {
    return new Promise((resolve: any, reject: any) => {
        console.log(params)
        client.CreateBooking(params.data, function (err: any, response: any) {
            if (err) {
                return reject(err)
            }

            const bookingId = response['id']

            const rollback_data = {
                bookingId: bookingId,
            }

            try {
                // Stripe Code

                //Prepare message to send to SNS
                //TODO: retrieve listing details from db
                const test_data = {
                    data: {
                        receiverEmail: 'nicholasong.2020@smu.edu.sg',
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
                    },
                }
                email_client.publish_message_booking_confirmed(test_data)

                resolve(response)
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
