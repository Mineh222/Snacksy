import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
// import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import AllSnacks from './components/AllSnacks/snacks';
import { authenticate } from './store/session';
import SnackForm from './components/CreateSnackForm';
import SingleSnack from './components/SingleSnack';
import EditSnackForm from './components/EditSnackForm';

import SearchedSnacks from './components/SearchedSnacks';
import CategoriesPage from './components/Categories';
import Cart from './components/Cart/cart';
import AllSnacksCategory from './components/Categories/allSnacksCategory';
import Footer from './components/Footer';
import { thunkGetAllSnacks } from './store/snacks';





function App() {
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(thunkGetAllSnacks());
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }



  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/users' exact={true} >
          <UsersList />
        </Route>
        <Route path='/users/:userId' exact={true} >
          <User />
        </Route>
        <Route path='/' exact={true} >
          <AllSnacks />
        </Route>
        <Route path='/new-snack' exact={true}>
          <SnackForm />
        </Route>
        <Route path="/snacks/:snackId" exact={true}>
          <SingleSnack />
        </Route>
        <Route path="/snacks/:snackId/edit" exact={true}>
          <EditSnackForm />
        </Route>
        <Route path='/snacks/search/:searchWord' exact={true}>
          <SearchedSnacks />
        </Route>
        <Route path='/categories/:category' exact={true}>
          <CategoriesPage />
        </Route>
        <Route path='/category/all' exact={true}>
          <AllSnacksCategory />
        </Route>
        <Route path='/cart/:userId'>
          <Cart />
        </Route>
        <Route>
          <h1>Page not found.</h1>
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
