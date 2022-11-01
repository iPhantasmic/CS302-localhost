import json

# print('Loading function')
# import requests
import sendgrid
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
# from sendgrid.helpers.mail import Mail, Email, To, Content
def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    message_attributes = event['Records'][0]['Sns']['MessageAttributes']

    print(event)
    
    
    message = Mail(
        from_email='localhostcs302@gmail.com',
        to_emails=message_attributes["receiverEmail"]["Value"],
        subject='Sending with Twilio SendGrid is Fun',)
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
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e)
   
    
