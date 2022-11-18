from flask import Blueprint, redirect, request
from app.models import db, ShoppingCart, items

cart_routes = Blueprint('cart', __name__)



@cart_routes.route('/<id>', methods=['GET'])
def cart(id):
    # print("***ROUTE", id)
    cart = ShoppingCart.query.filter(ShoppingCart.user_id == id).one()
    # print("****CART", cart)
    return cart.to_dict()


@cart_routes.route('/<id>', methods=['POST'])
def add_to_cart(id):
    data = request.json
    # print('****THIS IS THE DATA', data)

    cart = ShoppingCart.query.get(id)
    # print("&+++&&++++++++++++In the BACKEND", cart.__dict__)
    db.session.execute(items.insert().values(
        shopping_cart_id=id, snack_id=data[0], quantity=data[1]))
    db.session.commit()
    return cart.to_dict()


@cart_routes.route('/<id>', methods=['DELETE'])
def delete_from_cart(id):
    data = request.json
    # print("***DATA", data)

    cart = ShoppingCart.query.get(id)
    db.session.execute(items.delete().where(
        items.c.shopping_cart_id == id).where(items.c.snack_id == data))
    db.session.commit()

    return cart.to_dict()


# @cart_routes.route('/<id>', methods=["PUT"])
# def update_cart(id):
#     data = request.json
#     # print("***DATA", data)

#     cart = ShoppingCart.query.get(id)
#     db.session.execute(items.update().values(
#         shopping_cart_id=id, snack_id=data[0], quantity=data[1]).where(items.c.snack_id == data[0]))
#     db.session.commit()

#     return cart.to_dict()


@cart_routes.route('/<id>/clear', methods=['Delete'])
def clear_cart(id):

    cart = ShoppingCart.query.get(id)
    db.session.execute(items.delete().where(items.c.shopping_cart_id == id))
    db.session.commit()

    return cart.to_dict()
