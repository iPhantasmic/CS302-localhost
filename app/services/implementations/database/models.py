"""Module with booking model."""
from sqlalchemy import DateTime, func, inspect
from app.services.implementations.database import (
        connection as db)


__all__ = ['Booking']

class Booking(db.Model):
    """Represents an item.
    Attributes:
        id (int) - From Base
        created_at (DateTime) - From Base
        name (str): name of item
        user_id (int): foreign key for user that is making booking
        listing_id (int): foreign key for listing that this booking is being made for
        host_id (int): foreign key for host that listed the corresponding listing
        start_date (datetime): start date of the booking
        end_date (datetime): end date of the booking
        payment_id (int):
    """
    __tablename__ = 'bookings'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    created_at = db.Column(DateTime, default=func.now())
    user_id = db.Column(db.Integer)
    listing_id = db.Column(db.Integer)
    host_id = db.Column(db.Integer)
    start_date = db.Column(DateTime)
    end_date = db.Column(DateTime)
    payment_id = db.Column(db.Integer)

    def __init__(self,user_id,listing_id,host_id,start_date,end_date,payment_id) -> None:
        self.user_id = user_id
        self.listing_id = listing_id
        self.host_id = host_id
        self.start_date = start_date
        self.end_date = end_date
        self.payment_id = payment_id

    def __repr__(self):
        return f'Booking(id={self.id}, user_id={self.user_id}, listing_id={self.listing_id}), start_date={self.start_date}'
    
    def to_dict(self):
        """Returns model as dict of properties.
        Note:
            Removes SQLAlchemy fields included in self.__dict__
        """
        column_names = inspect(self.__class__).columns.keys()
        return {k: self.__dict__[k] for k in column_names}
