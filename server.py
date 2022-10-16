from email import message
from bookings_pb2_grpc import BookingService
from sqlalchemy.ext.declarative import declarative_base

import bookings_pb2
import bookings_pb2_grpc
import grpc
from concurrent import futures
import logging

from sqlalchemy import create_engine
import psycopg2

from sqlalchemy.orm import sessionmaker
import sqlalchemy as db
from sqlalchemy.orm import mapper
  
Base = declarative_base()
#For sending to DB
class Booking(Base):
    __tablename__ = 'bookings'
    id = db.Column(db.Integer,autoincrement=True,primary_key=True)
    user_id = db.Column(db.Integer)
    listing_id = db.Column(db.Integer)
    host_id = db.Column(db.Integer)
    start_date = db.Column(db.String(64), nullable=False)
    end_date = db.Column(db.String(64), nullable=False)
    payment_id = db.Column(db.Integer)

    def __init__(self,user_id,listing_id,host_id,start_date,end_date,payment_id) -> None:
        self.user_id = user_id
        self.listing_id = listing_id
        self.host_id = host_id
        self.start_date = start_date
        self.end_date = end_date
        self.payment_id = payment_id
    
    def to_dict(self):
        return {
            "id":self.id,
            "user_id": self.user_id,
            "listing_id": self.listing_id,
            "host_id": self.host_id,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "payment_id":self.payment_id
        }

class BookingService(bookings_pb2_grpc.BookingServiceServicer):

    seed_data = [
        {
            "user_id" : 123,
            "listing_id" : 2,
            "host_id" :3,
            "start_date" : "test1",
            "end_date" : "test1",
            "payment_id" : 6
        }
    ]

    def __init__(self) -> None:
        self.engine = create_engine("XXX")
        Base.metadata.create_all(self.engine, checkfirst=True)
        Session = sessionmaker(bind=self.engine)
        self.session = Session()
        for mock_data in self.seed_data:
            new_booking = Booking(**mock_data)
            self.session.add(new_booking)
        self.session.commit()

    def GetBookingByUser(self,request,context):
        user_id = request.user_id
        booking_array = []
        result = self.session.query(Booking) \
                    .filter(Booking.user_id==user_id).all()
        for booking in result:
            booking_array.append(bookings_pb2.Booking(user_id=booking.user_id, listing_id = booking.listing_id, host_id = booking.host_id,start_date= booking.start_date, end_date=booking.end_date,payment_id = booking.payment_id))
        return bookings_pb2.BookingArray(booking=booking_array)


    def CreateBooking(self, request, context):

        #TODO: Check for a way to deserialise better

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
