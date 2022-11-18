from app.models import db, Review


def seed_reviews():
    review1=Review(
        user_id=4,
        snack_id=1,
        rating=5,
        comment="Best chips I have ever tasted. Shout out to Lebron James."
    )

    review2=Review(
        user_id=7,
        snack_id=1,
        rating=5,
        comment="This new flavor is fire."
    )

    review3=Review(
        user_id=2,
        snack_id=2,
        rating=4,
        comment="The best movie snack!!"
    )

    review4=Review(
        user_id=3,
        snack_id=2,
        rating=3,
        comment="Not too bad, but too sour for me."
    )

    review5=Review(
        user_id=6,
        snack_id=3,
        rating=5,
        comment="My go to cookies when I'm craving something sweet."
    )

    review6=Review(
        user_id=7,
        snack_id=3,
        rating=3,
        comment="These are good, but nothing beats my grandma's homemade cookies"
    )

    review7=Review(
        user_id=3,
        snack_id=4,
        rating=3,
        comment="Tastes a bit weird, but it does have a lot of protein."
    )

    review8=Review(
        user_id=5,
        snack_id=4,
        rating=4,
        comment="Go to protein bar after a workout."
    )

    review9=Review(
        user_id=5,
        snack_id=5,
        rating=5,
        comment="Since high school, this drink has been my absolute go to. It tastes amazing."
    )

    review10=Review(
        user_id=4,
        snack_id=5,
        rating=5,
        comment="Can't go wrong with some Arizona Green Tea!"
    )

    review11=Review(
        user_id=2,
        snack_id=1,
        rating=3,
        comment="These are overrated! Sticking to the original Cheddar Sour Cream chips, they never disappoint."
    )

    review12=Review(
        user_id=5,
        snack_id=1,
        rating=4,
        comment="Huge fan of the regular Cheddar Sour Cream. Thought these were an interesting twist to them. Definitely recommend."
    )

    review13=Review(
        user_id=6,
        snack_id=2,
        rating=5,
        comment="Love love love sour patch kids candy! Been snacking on these since I was a kid and they never get old."
    )

    review14=Review(
        user_id=7,
        snack_id=2,
        rating=4,
        comment="First they're sour then they're sweet. :)"
    )

    review15=Review(
        user_id=4,
        snack_id=3,
        rating=3,
        comment="These taste really good, but I wish they were softer cookies!"
    )

    review16=Review(
        user_id=5,
        snack_id=3,
        rating=5,
        comment="I would eat these cookies when I was a child. Always look forward to them when I buy purchase these on Snacksy."
    )

    review17=Review(
        user_id=7,
        snack_id=4,
        rating=3,
        comment="Tastes okay. I purchase these for the amount of protein they have."
    )

    review18=Review(
        user_id=4,
        snack_id=4,
        rating=4,
        comment="Chocolate sea salt flavor is so good. I can always count on Snacksy to find the best snacks, even when I'm looking for something healthy!"
    )

    review19=Review(
        user_id=2,
        snack_id=5,
        rating=5,
        comment="Great flavor, and even better price. Just a classic drink!"
    )

    review20=Review(
        user_id=3,
        snack_id=5,
        rating=4,
        comment="Love drinking these on summer days, they are so refreshing!"
    )

    review21=Review(
        user_id=4,
        snack_id=6,
        rating=5,
        comment="One of the best tasting chips! Sweet and super crunchy, it's honestly addicting."
    )

    review22=Review(
        user_id=5,
        snack_id=6,
        rating=5,
        comment="Recently got put on to these chips, and I'm addicted."
    )

    review23=Review(
        user_id=3,
        snack_id=6,
        rating=3,
        comment="These chips are pretty good, but a bit too oiniony for my liking."
    )

    review24=Review(
        user_id=6,
        snack_id=7,
        rating=5,
        comment="My favorite chocolate bar! I keep coming back to order more."
    )

    review25=Review(
        user_id=7,
        snack_id=7,
        rating=4,
        comment="Need a Moment? Chew it Over with Twix."
    )

    review26=Review(
        user_id=2,
        snack_id=8,
        rating=1,
        comment="Do not order these! My son almost chocked on one. Super dangerous, not worth it!"
    )

    review27=Review(
        user_id=3,
        snack_id=8,
        rating=4,
        comment="Classic candy. Love popping one into my mouth when I'm craving something sweet."
    )

    review28=Review(
        user_id=5,
        snack_id=9,
        rating=5,
        comment="My go to hangover drink. Makes me feel instantly better, and tastes great."
    )

    review29=Review(
        user_id=3,
        snack_id=9,
        rating=4,
        comment="Great drink. Quenches my thirst after a hard workout."
    )

    review30=Review(
        user_id=4,
        snack_id=10,
        rating=3,
        comment="Ordered these to try them out. They're just okay. I'm not the biggest fan of doritos. Probably won't be purchasing again."
    )

    review31=Review(
        user_id=5,
        snack_id=10,
        rating=5,
        comment="These chips are an ol'reliable. I'd recommend these chips to anybody that loves ranch."
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)
    db.session.add(review11)
    db.session.add(review12)
    db.session.add(review13)
    db.session.add(review14)
    db.session.add(review15)
    db.session.add(review16)
    db.session.add(review17)
    db.session.add(review18)
    db.session.add(review19)
    db.session.add(review20)
    db.session.add(review21)
    db.session.add(review22)
    db.session.add(review23)
    db.session.add(review24)
    db.session.add(review25)
    db.session.add(review26)
    db.session.add(review27)
    db.session.add(review28)
    db.session.add(review29)
    db.session.add(review30)
    db.session.add(review31)

    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
