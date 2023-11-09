"""Module that manages database connection."""
from sqlalchemy import create_engine
import os
from sqlalchemy_wrapper import SQLAlchemy

db_url = "postgresql://" + os.environ["DB_USER"] + ":" + os.environ["DB_PASSWORD"] + "@" + os.environ["DB_HOST"] + ":"
db_url += os.environ["DB_PORT"] + "/" + os.environ["DB_SCHEMA"]

# # pylint: disable=invalid-name
# # Connect to the database
connection = SQLAlchemy(db_url)


# an Engine, which the Session will use for connection
# resources
engine = create_engine(db_url)
