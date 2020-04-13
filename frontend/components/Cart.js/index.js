import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';
import User from '../User';
import CartContainer from './styles';
import CloseButton from '../_Shared/CloseButton';
//import SickButton from './styles/SickButton';
import CartItem from '../CartItem';
import calcTotalPrice from '../../lib/calcTotalPrice';
import formatMoney from '../../lib/formatMoney';
import Checkout from '../Checkout';
import StyledButton from '../_Shared/Button';
//import TakeMyMoney from './TakeMyMoney';

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;
/* eslint-disable */
const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  toggleCart: ({ render }) => <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>,
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
});
/* eslint-enable */

const Cart = () => (
  <Composed>
    {({ user, toggleCart, localState }) => {
      if (!user.data) return <p> Loading ...</p>;
      const me = user.data.me;
      if (!me) return null;
      return (
        <CartContainer open={localState.data.cartOpen}>
          <header>
            <CloseButton onClick={toggleCart} title="close">
              &times;
            </CloseButton>
            <div>{me.name}'s Cart</div>
            <p>
              You Have {me.cart.length} Item{me.cart.length === 1 ? '' : 's'} in your cart.
            </p>
          </header>
          <ul>{me.cart.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}</ul>
          <footer>
            <p>Total: {formatMoney(calcTotalPrice(me.cart))}</p>
            {me.cart.length && (
              <Checkout>
                <StyledButton>Checkout</StyledButton>
              </Checkout>
            )}
          </footer>
        </CartContainer>
      );
    }}
  </Composed>
);

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
