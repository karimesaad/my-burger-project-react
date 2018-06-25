import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  /********* Removed after adding REDUX ********
  // state = {
  //   ingredients: null,
  //   price: 0
  // }
  //
  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for( let param of query.entries()){
  //     //['salad', '1']
  //     if (param[0] === 'price'){
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];  //by adding a '+' it gets converted to a number
  //     }
  //   }
  //   this.setState({ingredients: ingredients, totalPrice: price});
  // }
  ******************************************/

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render(){
    return(
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}/>
          <Route
            path={this.props.match.path + '/contact-data/'}
            component={ContactData}
            /** Removed after adding REDUX: Cool way of rendering through routing and passing state as props **/
            // render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}
          />


      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
  }
};

export default connect(mapStateToProps)(Checkout);
