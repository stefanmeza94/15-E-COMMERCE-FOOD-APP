import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
	items: [],
	totalAmount: 0
};

const cartReducer = (state, action) => {
	if (action.type === 'ADD') {
		const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
		
		// logic for existing item to updated their amount and not add same item twice 
		const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
		const existingCartItem = state.items[existingCartItemIndex];
		let updatedItems;
		
		if (existingCartItem) {
			const updatedItem = {
				...existingCartItem, 
				amount: existingCartItem.amount + action.item.amount
			}
			updatedItems = [...state.items]
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			updatedItems = state.items.concat(action.item);
		}
		
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount
		}
	}
	
	if (action.type === 'REMOVE') {
		const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
		const existingItem = state.items[existingCartItemIndex];
		const updatedTotalAmount = state.totalAmount - existingItem.price;
		let updatedItems;
		
		// remove item from cart list if his amount is 1
		if (existingItem.amount === 1) {
			updatedItems = state.items.filter(item => item.id !== action.id)
			
			// decrease amount by one if some cart item has amount bigger than 1
		} else {
			const updatedItem = {...existingItem, amount: existingItem.amount - 1};
			
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		}
		
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount
		}
	}
	
	return defaultCartState;
}

const CartProvider = props => {
	const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
	
	const addItemToCartHandler = item => {
		dispatchCartAction({type: 'ADD', item: item})
	};
	const removeItemFromCartHandler = id => {
		dispatchCartAction({type: 'REMOVE', id: id})
	};
	
	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler
	}
	
	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
}

export default CartProvider;