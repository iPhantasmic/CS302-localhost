type BookingConfirmedAttributes = {
    propertyName: { DataType: string; StringValue: string }
    receiptId: { DataType: string; StringValue: string }
    paymentDate: { DataType: string; StringValue: string }
    paymentTime: { DataType: string; StringValue: string }
    bookingStartDate: { DataType: string; StringValue: string }
    bookingEndDate: { DataType: string; StringValue: string }
    unitPrice: { DataType: string; StringValue: string }
    numNights: { DataType: string; StringValue: string }
    subTotal: { DataType: string; StringValue: string }
    serviceFee: { DataType: string; StringValue: string }
    totalPrice: { DataType: string; StringValue: string }
}

type BookingConfirmedRequestParams = {
    data: {
        receiverEmail: String
        propertyName: string
        receiptId: string
        paymentDate: string
        paymentTime: string
        bookingStartDate: string
        bookingEndDate: string
        unitPrice: number
        numNights: number
        subTotal: number
        serviceFee: number
        totalPrice: number
    }
}
