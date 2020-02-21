import React from 'react';
import Header from './Pages/Partials/Header'
import Footer from './Pages/Partials/Footer'
import {Route, Switch} from "react-router-dom";
import Home from './Pages/Home'
import Category from "./Pages/Category";
import ProductList from "./Pages/ProductList";
import ProductDetail from "./Pages/ProductDetail";
import Checkout from './Pages/Checkout'
import Sidebar from './Pages/Partials/Sidebar';
function App() {
  return (
    <div className="container">
      <Header />
      <div className="row">
          <div className="col-md-8">
              <Switch>
                  <Route path="/" exact >
                      <Home />
                  </Route>
                  <Route exact path="/category" >
                      <Category>
                          <h2>Category</h2>
                      </Category>
                  </Route>
                  <Route path="/category/:categoryId" >
                      <ProductList />
                  </Route>
                  <Route path="/product/:productId" >
                      <ProductDetail />
                  </Route>
                  <Route path="/checkout">
                      <Checkout />
                  </Route>
              </Switch>
          </div>
          <div className="col-md-4">
              <Sidebar/>
          </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
