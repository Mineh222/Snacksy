from flask import Blueprint, request, jsonify
from app.models import db, Snack, Review, User
from app.forms import SnackForm, ReviewForm

snack_routes = Blueprint('snacks', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# GET ALL SNACKS
@snack_routes.route('/')
def snacks():
    snacks = Snack.query.all()
    data = [snack.to_dict() for snack in snacks]
    return {'snacks': data}

# CREATE NEW SNACK
@snack_routes.route('/new', methods=['POST'])
def create_snack():
    form = SnackForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_snack = Snack(
            user_id=form.data['user_id'],
            cover_pic=form.data['cover_pic'],
            title=form.data['title'],
            description=form.data['description'],
            price=form.data['price'],
            category=form.data['category']
        )
        db.session.add(new_snack)
        db.session.commit()
        return new_snack.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# GET SINGLE SNACK
@snack_routes.route('/<id>')
def single_snack(id):
    snack = Snack.query.get(id)
    return snack.to_dict()

# EDIT SNACK
@snack_routes.route('/<id>/edit', methods=['PUT'])
def edit_snack(id):
    form = SnackForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    snack = Snack.query.get(id)
    if form.validate_on_submit():
        snack.user_id = form.data['user_id']
        snack.cover_pic = form.data['cover_pic']
        snack.title = form.data['title']
        snack.description = form.data['description']
        snack.price = form.data['price']
        snack.category = form.data['category']

        db.session.commit()
        return snack.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# DELETE SNACK
@snack_routes.route('/<id>/delete', methods=['DELETE'])
def delete_snack(id):
     snack = Snack.query.get(id)
     db.session.delete(snack)
     db.session.commit()
     return snack.to_dict()

# ------- Reviews --------

# GET REVIEWS
@snack_routes.route('/<id>/reviews')
def get_reviews(id):
    snack = Snack.query.get(id)
    reviews = snack.reviews
    data = [review.to_dict() for review in reviews]
    return {'reviews': data}

#POST REVIEW
@snack_routes.route('/<id>/reviews/new', methods=['POST', "GET"])
def post_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_review = Review (
            user_id=form.data['user_id'],
            snack_id= id,
            rating= form.data['rating'],
            comment= form.data['comment']
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#SEARCH FOR WORD IN SEARCHBAR
@snack_routes.route('/search/<searchword>')
def search(searchword):
    snacks = db.session.query(Snack).filter(Snack.title.ilike(f"%{searchword}%"))
    data = [snack.to_dict() for snack in snacks]
    return {'snacks': data}
