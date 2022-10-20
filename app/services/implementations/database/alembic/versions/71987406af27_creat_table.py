"""creat table

Revision ID: 71987406af27
Revises: 86998e2c2489
Create Date: 2022-10-20 21:36:11.854193

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '71987406af27'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        'bookings',
        sa.Column('id', sa.Integer, autoincrement=True, primary_key=True),
        sa.Column('created_at', sa.DateTime, default=sa.func.now()),
        sa.Column('user_id', sa.Integer),
        sa.Column('listing_id', sa.Integer),
        sa.Column('host_id', sa.Integer),
        sa.Column('start_date', sa.DateTime),
        sa.Column('end_date', sa.DateTime),
        sa.Column('payment_id', sa.Integer),
    )


def downgrade():
    pass