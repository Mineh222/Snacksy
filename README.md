<div align='center'>
  <img src="https://i.postimg.cc/LsXWGHRg/Screen-Shot-2022-07-31-at-8-30-46-PM.png"></img>
  <h3> 
    Developers: Mineh Gharabegi, Amy Lopez, Josh Salcido, and Michael Dasch 
  </h3>
  <p align='center'>
    ·
    <a href="https://snacksy.herokuapp.com/">
      Snacksy
    </a>
    ·
  </p>
  <p align="center">Project Advisor: Brad Simpson</p>
  <p align='center'>
    Explore the docs to see how to get 
    <a href="https://github.com/joshsalcido/Snacksy/wiki">started</a>
    --->
  </p>
  <h1>Welcome to Snacksy!</h1>
  
</div>

Snacksy is a clone of the popular ecommerce website, [Etsy](https://www.etsy.com/). On Snacksy, users can sign in or register, browse a variety of snacks, create snacks if they wish to sell items on Snacksy, add their favorite snacks to their cart and make an order, and also read and leave reviews for snacks.


## Screenshots from live site
![image](https://user-images.githubusercontent.com/95194326/182079091-ed570dae-7390-4118-9fef-8be0ce32090f.png)

![image](https://user-images.githubusercontent.com/95194326/182079179-b0f3c448-2a59-4cc9-89ba-5910a5f478f4.png)

![image](https://user-images.githubusercontent.com/95194326/182079252-03edfed9-d284-4b15-876f-3e2276914fd2.png)


## Instructions on how to install and run Snacksy
After cloning Snacksy into your desired directory:
* In the root directory, run 'pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt' to install dependencies
* Cd into the 'react-app' directory and run 'npm install' to install dependencies
* In the root directory, and create an '.env' file based off of the example provided in the '.env.example' file
* To set up the database:
> * Run the command 'pipenv shell' to open the virtual environment
> * In the root directory, run 'flask db upgrade' to create the database
> * In the root directory, run 'flask db seed all' to add all models and seeders into your database
* To run the app in development mode: 
> * In one terminal, in the root directory run the command 'flask run'
> * In another terminal, cd into the frontend directory 'react-app' and run the command 'npm start'
> * With both terminals running, navigate to 'localhost:3000'. Congrats, you've successfully installed and ran Snacksy!




## Technologies
Snacksy was built using the following technologies:
* **Backend: Flask**
* **Frontend: React/Redux and JavaScript/JSX**
* **Database: SQLAlchemy**
* **Design/Styling: HTML and CSS**
* **Hosting: Docker/Heroku**

## Key Features

### User Authentication

* On Snacksy, users can log-in with their correct credentials, or click the demo button for quick access to demo the site.
* Users can also register an account on Snacksy, giving them access to selling snacks, buying snacks, and leaving reviews.
* Errors are rendered in the event of inputting invalid credentials, and must be corrected before submitting the sign in or register forms.

### Snacks (Create, Read, Update, Delete)

* All Snacksy users can view all snacks as well as browse snack categories or search for their favorite snack.
* Users must be signed in to create, update, or delete their snack items.
* Snacks can be browsed on the all Snacks page, accessed from the link on the home page labeled 'Shop all snacks'. They can also be browsed by category as well as by searching for keywords in the search bar. 

### Reviews (Create, Read, Update, Delete)

* All users are able to read reviews for individual snack items on single snack pages, accessed by clicking on any snack image while browsing Snacksy.
* Signed in users can create, edit, or delete their reviews on specific snack item pages.

### Shopping Cart (Create, Read, Delete)

* Upon signing in, a cart icon will appear in the Snacksy navigation bar. When clicked, users will be directed to their shopping cart page.
* Signed in users can add and remove snacks from their cart, and place orders. 

### Search

* All users can type in any key letter or word to search for their favorite snack.
* Upon typing, a drop down will appear of the first 5 snack matches. These snack titles can all be clicked on to navigate to that specific snack item page, which displays the snack's details, reviews, and the option to add to cart (if a user is signed in). 
* Pressing enter after typing key words inside the search bar will navigate users to a page that displays all snack items that match their search. 

## Technical Details
***Shopping Cart***:

The implementation of Snacksy's shopping cart was done by implementing a join table in which a many-to-many relationship between shopping carts and snacks was created. Adding to and deleting items from a shopping cart was then done through adding and deleting rows in the join table and accessing the snacks through the shopping cart's to_dict method:
```
  @cart_routes.route('/<id>', methods=['POST'])
  def add_to_cart(id):
    data = request.json

    cart = ShoppingCart.query.get(id)
    db.session.execute(items.insert().values(
        shopping_cart_id=id, snack_id=data[0], quantity=data[1]))
    db.session.commit()
    return cart.to_dict()
```
```
    def getsnacked(self):
        data = [snack.to_dict() for snack in self.snacks]
        return data

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user': self.user.to_dict(),
            'snacks': self.getsnacked(),
            'cart_quantity': len(self.cart_items)
        }
```
***Search Bar***:

Creating a search bar was something that was an extremly new concept to the development team but was a fun task to take on. Users have the ability to search for a specific snack in our database or just to get back a list of results that matches anything that they search. Unfortunately we dont have all the snacks in our database but for this being our first searh bar, we are happy with the way things turned out. 

```
const handleFilter = (e) => {
        const searchWord = e.target.value;
        setWordEntry(searchWord);
        const newFilter = snacks.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredSnacks([])
        } else {
            setFilteredSnacks(newFilter)
        }
    }
```
```
{filteredSnacks.length !== 0 && (
                <div className="snack-result">
                    {filteredSnacks.slice(0, 5).map((snack) => {
                        return (
                            <Link key={snack.id} className="snack-item" to={`/snacks/${snack.id}`} onClick={clearInput}>
                                <p id='snack-title'>{snack.title}</p>
                            </Link>
                        )
                    })}
                </div>
            )}
```


## Future Improvements
* User profile page that displays a user's account information and any snacks they have posted to sell on Snacksy.
* User ability to upgrade their snack quantities inside their shopping cart.
