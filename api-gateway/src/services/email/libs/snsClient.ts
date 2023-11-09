import  { SNSClient } from "@aws-sdk/client-sns";
// Set the AWS Region.
const REGION = "ap-southeast-1"; //e.g. "us-east-1"
const CREDENTIALS = {
    "accessKeyId": process.env.SNS_ACCESS_KEY_ID,
    "secretAccessKey": process.env.SNS_SECRET_ACCESS_KEY
}
// Create SNS service object.
const snsClient = new SNSClient({ region: REGION,credentials:CREDENTIALS });
export  { snsClient };