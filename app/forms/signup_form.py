from flask_wtf import FlaskForm
from wtforms import StringField, validators
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def email_validate(form, field):
    email = field.data
    if (not re.fullmatch('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}', email)):
        raise ValidationError('Please enter a valid email')

def address_validate(form, field):
    address = field.data
    if (len(address) < 10 or len(address) > 50):
        raise ValidationError('Please enter a valid address')

def password_validate(form, field):
    password = field.data
    if(not re.fullmatch('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$', password)):
        raise ValidationError('Password must be a minimum of 8 characters and contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")')



class SignUpForm(FlaskForm):
    profile_picture = StringField("profile_picture")
    first_name = StringField("first_name", validators=[DataRequired()])
    last_name = StringField("last_name", validators=[DataRequired()])
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, email_validate])
    address = StringField("address", validators=[DataRequired(), address_validate])
    password = StringField('password', validators=[DataRequired(), password_validate])
