import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { About } from './pages/About';
import { Navbar } from './cmps/Navbar';
import { Footer } from './cmps/Footer';
import { MainApp } from './pages/MainApp'
import {Notification} from './cmps/Notification'
import {  useSelector } from 'react-redux'



function App() {
  const currNotification = useSelector(state => state.notificationReducer.txt);

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <main>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/" component={MainApp} />
        </Switch>
        </main>
        <Footer/>
      </Router>
        {currNotification &&<Notification/>}
    </div>
  );
}

export default App;
