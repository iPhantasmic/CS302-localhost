import SNSPublisher from '../services/email/booking_confirmed'

const email_publisher = new SNSPublisher()

export default (root: any, params: any) => {
    return new Promise((resolve: any, reject: any) => {
        try {
            const test_data = {
                data: {
                    receiverEmail: 'nicholasongck@gmail.com',
                    propertyName: 'Seminyak Kuta Utara',
                    refundDate: 'November 7, 2022',
                    unitPrice: 125.1,
                    numNights: 5,
                    subTotal: 625.5,
                    serviceFee: 95.5,
                    totalRefunded: 721.0,
                },
            }
            const response =
                email_publisher.publish_message_booking_cancelled(test_data)
            resolve(response)
        } catch (err: any) {
            return reject(err)
        }
    })
}
