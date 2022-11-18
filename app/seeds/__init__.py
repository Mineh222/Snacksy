from flask.cli import AppGroup

from app.seeds.snacks import seed_snacks, undo_snacks
from .users import seed_users, undo_users

from .reviews import seed_reviews, undo_reviews

from .shoppingCarts import seed_carts, undo_carts

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_snacks()

    seed_reviews()

    # seed_carts()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_snacks()

    undo_reviews()

    # undo_carts()
    # Add other undo functions here
