from .db import db, items


class Snack(db.Model):
    __tablename__ = "snacks"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    cover_pic = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(20), nullable=False)


    # users = db.relationship("User", back_populates="snack")
    # cart_item = db.relationship("CartItem", uselist=False, back_populates="snack")
    # reviews = db.relationship("Review", back_populates="snack")

    users = db.relationship("User", back_populates="snacks")
    reviews = db.relationship("Review", back_populates="snack")
    shopping_carts = db.relationship(
        "ShoppingCart", secondary=items, back_populates="snacks")
    snack_items = db.relationship(
        "ShoppingCart",
        secondary=items,
        # uselist=False,
        back_populates="cart_items",
    )

    def getshopped(self):
        data = [shopping_cart.to_dict() for shopping_cart in self.shopping_carts]
        return data

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'cover_pic': self.cover_pic,
            'title': self.title,
            'description': self.description,
            'price': self.price,
            'category': self.category,
            # 'shopping_carts': self.getshopped()
        }
