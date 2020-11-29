import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { About } from './pages/About';
import { Navbar } from './cmps/Navbar';
import { Footer } from './cmps/Footer';
import { MainApp } from './pages/MainApp'
import { Notification } from './cmps/Notification'
import { useSelector } from 'react-redux'
import PlaceResturants from './pages/PlaceResturants';
import Loader from 'react-loader-spinner'



function App() {
  const currNotification = useSelector(state => state.notificationReducer.txt);
  const isLoader = useSelector(state => state.systemReducer.isLoading);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <main>
          <Switch>
            <Route path="/resturants/:id" component={PlaceResturants} />
            <Route path="/about" component={About} />
            <Route path="/" component={MainApp} />
          </Switch>
        </main>
        <Footer />
      </Router>
      {currNotification && <Notification />}
      {isLoader && <div className="loader-container">
        <Loader
          type="Oval"
          color="#f39233"
          height={100}
          width={100}
        />
      </div>}
    </div>
  );
}

export default App;
