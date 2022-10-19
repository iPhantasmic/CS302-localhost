"""Module with booking model."""
from sqlalchemy import DateTime, func
from sqlalchemy.inspection import inspect as _inspect
from app.services.implementations.database import (
        connection as db)


__all__ = ['Booking']

# Mixin to augment a base class
class _BaseMixin(object):
    """Encapsulating shared functionality of models."""
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    created_at = db.Column(DateTime, default=func.now())

    def to_dict(self):
        """Returns model as dict of properties.
        Note:
            Removes SQLAlchemy fields included in self.__dict__
        """
        column_names = _inspect(self.__class__).columns.keys()
        return {k: self.__dict__[k] for k in column_names}


class Booking(_BaseMixin, db.Model):
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
