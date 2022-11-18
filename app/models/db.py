from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

items = db.Table(
    'items',
    db.Model.metadata,
    db.Column('shopping_cart_id', db.Integer, db.ForeignKey(
        'shopping_carts.id'), primary_key=True),
    db.Column('snack_id', db.Integer, db.ForeignKey(
        'snacks.id'), primary_key=True),
    db.Column('quantity', db.Integer, nullable=False)
)
