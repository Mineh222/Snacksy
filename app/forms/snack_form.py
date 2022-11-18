from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, FloatField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import Snack
import re

class SnackForm(FlaskForm):
    user_id = IntegerField('user_id')
    cover_pic = StringField('cover_pic', validators=[DataRequired()])
    title = StringField("title", validators=[DataRequired()])
    description = TextAreaField("description", validators=[DataRequired()])
    price = FloatField("price", validators=[DataRequired()])
    category = SelectField("category", choices=['Chips', 'Candy', 'Baked Goods', 'Protein', 'Beverages'],validators=[DataRequired()])
