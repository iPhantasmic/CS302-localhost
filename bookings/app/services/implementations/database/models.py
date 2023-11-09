"""Module with booking model."""
from sqlalchemy import DateTime, func, inspect, Integer
from sqlalchemy.dialects.postgresql import UUID
from app.services.implementations.database import connection as db
import uuid


__all__ = ["Booking"]


class Booking(db.Model):
    """Represents an item.
    Attributes:
        id (UUID String)
        created_at (DateTime)
        name (UUID String): name of item
        user_id (UUID String): foreign key for user that is making booking
        listing_id (UUID String): foreign key for listing that this booking is being made for
        host_id (UUID String): foreign key for host that listed the corresponding listing
        start_date (DateTime): start date of the booking
        end_date (DateTime): end date of the booking
        status (Integer): mapped to corresponding statuses on proto file
    """

    __tablename__ = "bookings"
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = db.Column(DateTime, default=func.now())
    user_id = db.Column(UUID(as_uuid=True), default=uuid.uuid4)
    listing_id = db.Column(UUID(as_uuid=True), default=uuid.uuid4)
    host_id = db.Column(UUID(as_uuid=True), default=uuid.uuid4)
    start_date = db.Column(DateTime)
    end_date = db.Column(DateTime)
    status = db.Column(Integer)

    def __init__(
        self, user_id, listing_id, host_id, start_date, end_date, status,
    ) -> None:
        self.user_id = user_id
        self.listing_id = listing_id
        self.host_id = host_id
        self.start_date = start_date
        self.end_date = end_date
        self.status = status

    def __repr__(self):
        return f"Booking(id={self.id}, booking status: {self.status}, start_date={self.start_date}, end_date={self.end_date}"

    def to_dict(self):
        """Returns model as dict of properties.
        Note:
            Removes SQLAlchemy fields included in self.__dict__
        """
        column_names = inspect(self.__class__).columns.keys()
        return {k: self.__dict__[k] for k in column_names}
