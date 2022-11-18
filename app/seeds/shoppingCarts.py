from app.models import db, ShoppingCart


def seed_carts():
    demo = ShoppingCart(
        user_id=1,
        total=0.00
    )

    marnie = ShoppingCart(
        user_id=2,
        total=0.00
    )
    bobbie = ShoppingCart(
        user_id=3,
        total=0.00
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)


    db.session.commit()


def undo_carts():
    db.session.execute('TRUNCATE shopping_carts RESTART IDENTITY CASCADE ')
    db.session.commit()
