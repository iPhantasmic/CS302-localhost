type BookingCancelledRequestAttributes = {
    data: {
        propertyName: string
        refundDate: string
        unitPrice: number
        numNights: number
        subTotal: number
        serviceFee: number
        totalRefunded: number
    }
}
type BookingCancelledAttributes = {
    receiverEmail: { DataType: string, StringValue: string },
    propertyName: { DataType: string; StringValue: string }
    refundDate: { DataType: string; StringValue: string }
    unitPrice: { DataType: string; StringValue: string }
    numNights: { DataType: string; StringValue: string }
    subTotal: { DataType: string; StringValue: string }
    serviceFee: { DataType: string; StringValue: string }
    totalRefunded: { DataType: string; StringValue: string }
}