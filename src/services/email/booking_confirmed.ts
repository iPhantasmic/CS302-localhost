// Import required AWS SDK clients and commands for Node.js
import { PublishCommand } from '@aws-sdk/client-sns'
import { snsClient } from './libs/snsClient'
import BookingConfirmedTemplate from './templateData/BookingConfirmed'
import BookingCancelledTemplate from "./templateData/BookingCancelled"

type SNSParams = {
    Message: string
    TopicArn: string
    MessageAttributes?: BookingConfirmedAttributes | BookingCancelledAttributes
}

const params: SNSParams = {
    Message: 'MESSAGE_TEXT', // MESSAGE_TEXT
    TopicArn: 'arn:aws:sns:ap-southeast-1:631945473733:localhost', //TOPIC_ARN
}

class SNSPublisher {
    // Set the parameters

    publish_message_booking_confirmed = async (
        data: BookingConfirmedRequestParams
    ) => {
        params.Message = "BookingConfirmed"
        for (var key in data['data']) {
            BookingConfirmedTemplate[key]['StringValue'] = data['data'][key]
        }

        try {
            params.MessageAttributes = BookingConfirmedTemplate
            const data = await snsClient.send(new PublishCommand(params))
            console.log('Success.', data)
            return data // For unit tests.
        } catch (err) {
            console.log('Error', err.stack)
        }
    }

    publish_message_booking_cancelled = async (
        data: BookingCancelledRequestAttributes
    )=>{
        params.Message = "BookingCancelled"
        for (var key in data["data"]){
            BookingCancelledTemplate[key]["StringValue"] = data['data'][key]
        }

        try {
            params.MessageAttributes = BookingCancelledTemplate
            const data = await snsClient.send(new PublishCommand(params))
            console.log('Success.', data)
            return data // For unit tests.
        } catch (err) {
            console.log('Error', err.stack)
        }


    }

}

export default SNSPublisher
