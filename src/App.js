import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Checkout from './components/Checkout/Checkout';
import Login from './components/Login/Login';
import { useStateValue } from './StateProvider';
import { auth, db } from './firebase';

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (user) {
      const cartRef = db.ref(`/cart/${user.uid}`);
      cartRef.on('child_added', (snapshot) => {
        const newItem = snapshot.val();
        if (newItem && Object.keys(newItem).length) {
          dispatch({
            type: 'ADD_TO_BASKET',
            item: newItem
          });
        }
      });
      cartRef.on('child_removed', (snapshot) => {
        const removedItem = snapshot.val();
        if (removedItem && Object.keys(removedItem).length) {
          dispatch({ type: 'REMOVE_FROM_BASKET', id: removedItem.id });
        }
      })
    }
    return () => {
      user && db.ref().off();
    }
  }, [dispatch, user]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user is logged in
        dispatch({ type: 'SET_USER', user: authUser });
      } else {
        // user is logged out
        dispatch({ type: 'RESET_STATE' });
      }
    });

    return () => {
      unsubscribe();
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
