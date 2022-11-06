
import BookingClient from '../services/booking/BookingClient'
import SNSPublisher from '../services/email/booking_confirmed'

const client = BookingClient()
const email_client = new SNSPublisher()

export default (root: any, params: any) => {
    return new Promise((resolve: any, reject: any) => {
        //TODO: Hi Nich.. Remember to change the order of this saga pattern.
        //Current: Refund -> DeleteBooking -> SNS
        //Ideal  : UpdateBookingStatus -> Refund -> SNS
        //Justification: It's easier to rollback failed bookingstatus than to roll back

        try {

        } catch {
            reject("Refunding Failed")
            return
        }
        client.GetBookingById(params.data, function (err: any, response: any) {
            if (err) {
                console.log("err")
                return reject(err)
            }
            const booking_object = response
            console.log(booking_object)
            client.DeleteBookingById(
                params.data,
                function (err: any, response: any) {
                    if (err) {
                        return reject(err)
                    }

                    //Prepare message to send to SNS
                    //TODO: retrieve listing details from db
                    const test_data = {
                        data: {
                            receiverEmail: 'nicholasong.2020@smu.edu.sg',
                            propertyName: 'Seminyak Kuta Utara',
                            refundDate: 'November 7, 2022',
                            unitPrice: 125.1,
                            numNights: 5,
                            subTotal: 625.5,
                            serviceFee: 95.5,
                            totalRefunded: 721.0,
                        },
                    }
                    email_client.publish_message_booking_cancelled(test_data)

                    resolve(response)
                }
            )
        })


    })
}
