"""seed public default data

Revision ID: a9f878bd03c2
Revises: 14c40d00b613
Create Date: 2020-01-20 10:32:34.906429

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a9f878bd03c2'
down_revision = '14c40d00b613'
branch_labels = None
depends_on = None


def upgrade():
    connection = op.get_bind()

    blogIds = connection.execute("select id from blogs").fetchall()

    for blogId in blogIds:
        connection.execute("update blogs set public=0 where id = " + str(blogId[0]))


def downgrade():
    pass
