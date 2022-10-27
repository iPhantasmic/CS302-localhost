"""Module that manages database connection."""
from sqlalchemy import create_engine
import os
from sqlalchemy_wrapper import SQLAlchemy

# # pylint: disable=invalid-name
# # Connect to the database
connection = SQLAlchemy(os.environ['DATABASE_URL'])


# an Engine, which the Session will use for connection
# resources
engine = create_engine(os.environ['DATABASE_URL'])
