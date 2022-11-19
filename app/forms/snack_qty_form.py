from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Snack

class SnackQtyForm(FlaskForm):
    quantity = IntegerField("quantity", validators=[DataRequired()])
