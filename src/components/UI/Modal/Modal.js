import React, { Component } from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState){
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children; //return true or false if different/same
  }

  render(){
    return(
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'transformY(0)' : 'transformY(-100vh)',
            opacity: this.props.show ? '1' : '0',
            display: this.props.show ? 'inline' : 'none'
          }}>
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
