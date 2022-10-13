from email import message
from bookings_pb2_grpc import BookingService


import bookings_pb2
import bookings_pb2_grpc
import grpc
from concurrent import futures
import logging

#For sending to DB
class Booking():
    def __init__(self,userId,listingId,hostId,start,end,paymentId) -> None:
        self.userId = userId
        self.listingId = listingId
        self.hostId = hostId
        self.start = start
        self.end = end
        self.paymentId = paymentId

class BookingService(bookings_pb2_grpc.BookingServiceServicer):

    mock_data = [
        {
            "userId" : 1,
            "listingId" : 2,
            "hostId" :3,
            "start" : "test1",
            "end" : "test1",
            "paymentId" : 6
        },
        {
            "userId" : 2,
            "listingId" : 2,
            "hostId" :3,
            "start" : "test2",
            "end" : "test2",
            "paymentId" : 6
        }
    ]

    def GetBookingByUser(self,request,context):
        print(request)
        user_id = request.userId
        for data in self.mock_data:
            if  data["userId"] == user_id:
                return bookings_pb2.Booking(**data)
    def CreateBooking(self, request, context):

        #TODO: Check for a way to deserialise better

        self.mock_data.append({"userId":request.userId,"listingId":request.listingId,"hostId":request.hostId,"start":request.start,"end":request.end,"paymentId":request.paymentId})
        print(self.mock_data)
        return request


        

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    bookings_pb2_grpc.add_BookingServiceServicer_to_server(BookingService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig()
    serve()
