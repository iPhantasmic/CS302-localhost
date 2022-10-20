# from email import message
from listings_pb2_grpc import ListingService


import listings_pb2
import listings_pb2_grpc
import grpc
from concurrent import futures
import logging

#For sending to DB
class Listing():
    def __init__(self,listingId,hostId,title,cost,images,type,address,city,country,room,bed) -> None:
        self.listingId = listingId
        self.hostId = hostId
        self.title = title
        self.cost = cost
        self.images = images
        self.type = type
        self.address = address
        self.city = city
        self.country = country
        self.room = room
        self.bed = bed

class ListingService(listings_pb2_grpc.ListingServiceServicer):

    mock_data = [
        {
            "hostId" : 1,
            "title" : "AirBnB at the beach",
            "cost" : 150.00,
            "images" : None,
            "type" : listings_pb2.Type.Value('TYPE_FLAT'),
            "address" : "marine parade",
            "city" : "singapore",
            "country" : "singapore",
            "room" : 4,
            "bed" : 6,
        }
    ]

    def GetBookingByUser(self,request,context):
        print(request)
        host_id = request.hostId

        # if host_id not in mock_data.hostId:
        #     context.abort(grpc.StatusCode.NOT_FOUND, "Category not found")

        # host_id = request.hostId
        for data in self._data:
            if  data["hostId"] == host_id:
                return listings_pb2.Listing(**data)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    listings_pb2_grpc.add_ListingServiceServicer_to_server(ListingService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig()
    serve()