"""Module with common database commands.
"""

from sqlalchemy_utils import database_exists, create_database
from app.services.implementations.database import (
        connection as db)
import sys

def _create():
    """Create database."""
    if not database_exists(db.engine.url):
        create_database(db.engine.url)
    print(f'db exists? : {database_exists(db.engine.url)}')
    print(str(db.engine.url))
    
def _drop_tables():
    """Drop all database tables."""
    db.drop_all()

def _create_tables():
    """Create all database tables."""
    db.create_all()

# Choose function to run from script
func_arg = {"-create": _create, "-drop": _drop_tables, "-tables": _create_tables}

#Do it
if __name__ == "__main__":
    func_arg[sys.argv[1]]()