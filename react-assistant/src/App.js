import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from './store'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Chatbot from './components/Chatbot'

function App() {
  return (
    <Provider store={store}>
      <div className="conteudo">
        <Header></Header>
        <Home></Home>
        <Chatbot></Chatbot>
        <Footer></Footer>
      </div>
    </Provider>
  );
}

export default App;
