import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {...}
  // }
  state = {
    purchasing: false
    }


  componentDidMount() {
    this.props.onInitIngredients();
  }

/******* Code removed after adding REDUX to project *********


  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0){
      return;
    }
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
        ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceAddition;
      this.setState({
        totalPrice: newPrice,
        ingredients: updatedIngredients
      })
    this.updatePurchaseState(updatedIngredients);
  }
  *************************************/

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];  //now it's an array of values only [0,1,2,0]
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
  /** Removed after adding REDUX **/
  // const queryParams = [];
  // for(let i in this.state.ingredients){
  //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
  // }
  // queryParams.push('price=' + this.state.totalPrice);
  // const queryString = queryParams.join('&');
  // this.props.history.push({
  //   pathname: '/checkout',
  //   search: '?' + queryString
  // });

  /** Added after adding REDUX **/
  this.props.onInitPurchase();
  this.props.history.push('/checkout');
}

  render(){
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0; //will return true or false, so { salad: true, meat: false, etc}
    }
    let orderSummary = null;

    let burger = this.props.error ? <p>Unable to load ingredients!</p> : <Spinner />;

    if (this.props.ings){
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}/>
          <BuildControls
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved}
              disabled={disabledInfo}
              purchasable={this.updatePurchaseState(this.props.ings)}
              price={this.props.price}
              ordered={this.purchaseHandler}/>
        </Aux>
      );
      orderSummary = <OrderSummary
                  ingredients={this.props.ings}
                  purchaseCancelled={this.purchaseCancelHandler}
                  purchaseContinued={this.purchaseContinueHandler}
                  price={this.props.price}/>;
    }

    if(this.state.loading){
      orderSummary = <Spinner />;
      console.log('hellooooooo');
    }

    return(
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  };
};

const mapDispatchToProps = dispatch => {
  return{
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
