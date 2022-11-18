from flask import Blueprint
from app.models import db, Snack


category_routes = Blueprint('categories', __name__)

@category_routes.route('/<category>')
def get_category(category):
  snacks = db.session.query(Snack).filter(Snack.category == category)
  data = [snack.to_dict() for snack in snacks]
  return {'snacks': data}
