import json

# print('Loading function')
# import requests
import packages.sendgrid
import os
from packages.sendgrid import SendGridAPIClient
from packages.sendgrid.helpers.mail import Mail
# from sendgrid.helpers.mail import Mail, Email, To, Content


def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    message_attributes = event['Records'][0]['Sns']['MessageAttributes']
    message_type = event['Records'][0]['Sns']['Message']

    print(message_type)
    print("New changes wow!")
    if message_type ==  "BookingConfirmed":
        message = Mail(
            from_email='localhostcs302@gmail.com',
            to_emails=message_attributes["receiverEmail"]["Value"],
            subject='Booking Confirmed!',)
        message.dynamic_template_data = {
            "propertyName": message_attributes["propertyName"]["Value"],
            "receiptId": message_attributes["receiptId"]["Value"],
            "paymentDate": message_attributes["paymentDate"]["Value"],
            "paymentTime": message_attributes["paymentTime"]["Value"],
            "bookingStartDate": message_attributes["bookingStartDate"]["Value"],
            "bookingEndDate": message_attributes["bookingEndDate"]["Value"],
            "unitPrice": message_attributes["unitPrice"]["Value"],
            "numNights": message_attributes["numNights"]["Value"],
            "subTotal": message_attributes["subTotal"]["Value"],
            "serviceFee": message_attributes["serviceFee"]["Value"],
            "totalPrice": message_attributes["totalPrice"]["Value"]
        }

        message.template_id = "d-9fcc0f8486d346d39e9621c3288dac3e"
    else:
        message = Mail(
            from_email='localhostcs302@gmail.com',
            to_emails=message_attributes["receiverEmail"]["Value"],
            subject='Booking Confirmed!',)
        message.dynamic_template_data = {
            "propertyName": message_attributes["propertyName"]["Value"],
            "refundDate": message_attributes["refundDate"]["Value"],
            "unitPrice": message_attributes["unitPrice"]["Value"],
            "numNights": message_attributes["numNights"]["Value"],
            "subTotal": message_attributes["subTotal"]["Value"],
            "serviceFee": message_attributes["serviceFee"]["Value"],
            "totalRefunded": message_attributes["totalRefunded"]["Value"]
        }

        message.template_id = "d-00b6211e4fe84989a68cc6ef45cfcc07"
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e)
