from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name='Demo', last_name='User', address='12345 Demo Street, Demo, CA 90210')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name='Marnie', last_name='Smith', address='2323 Brand Blvd, Miami, FL 33101')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name='Bobbie', last_name='Hanson', address='980 Central Ave, Austin, TX 73301')
    mineh = User(
        username='mineh', email='mineh@gmail.com', password='password', first_name='Mineh', last_name='Gharabegi', address='1111 Glenwood St, Los Angeles, CA 91111')
    michael = User(
        username='mcdashin22', email='michael@gmail.com', password='password', first_name='Michael', last_name='Dasch', address='222 Kenwood St, San Diego, CA 39902')
    amy = User(
        username='amy', email='amy@gmail.com', password='password', first_name='Amy', last_name='Lopez', address='0983 Vine Ave, Sacramento, CA 94341')
    josh = User(
        username='josh', email='josh@gmail.com', password='password', first_name='Josh', last_name='Salcido', address='245 Sesame St Denver, CO 83409')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(mineh)
    db.session.add(michael)
    db.session.add(amy)
    db.session.add(josh)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
