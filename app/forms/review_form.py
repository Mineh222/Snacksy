from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    user_id = IntegerField('user_id')
    snack_id = IntegerField('snack_id')
    rating = IntegerField('rating', validators=[DataRequired()])
    comment = TextAreaField('comment', validators=[DataRequired()])
