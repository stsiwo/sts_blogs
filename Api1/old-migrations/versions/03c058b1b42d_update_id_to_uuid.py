"""update blog id to uuid

Revision ID: 03c058b1b42d
Revises: 3e59d0fb994f
Create Date: 2020-01-20 11:35:48.755196

"""
from alembic import op
import sqlalchemy as sa
import uuid


# revision identifiers, used by Alembic.
revision = '03c058b1b42d'
down_revision = '3e59d0fb994f'
branch_labels = None
depends_on = None


def upgrade():
    connection = op.get_bind()

    blogIds = connection.execute("select id from blogs").fetchall()

    for blogId in blogIds:
        connection.execute("update blogs set id = '" + str(uuid.uuid4()) + "' where id = " + str(blogId[0]))


def downgrade():
    pass
