import axios from "axios";

const ADD_TO_CART = "ADD_TO_CART";
const GET_CART_PRODUCTS = "GET_CART_PRODUCTS";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const CHANGE_QUANTITY = "CHANGE_QUANTITY";
const LOGIN_ADD_TO_CART = "LOGIN_ADD_TO_CART";


export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product,
  };
};

export const getCartProducts = (products) => {
  return {
    type: GET_CART_PRODUCTS,
    products,
  };
};
 export const deleteProduct = (product) =>{
   return {
     type: DELETE_PRODUCT, 
     product
   }
 }

 export const change_Quantity = (product) => {
  return {
    type: CHANGE_QUANTITY,
    product,
  };
};

export const login_add_to_cart = (cart) => {
  return {
    type: LOGIN_ADD_TO_CART,
    cart
  }
}

//THUNKS
export const loginChangeQuantity = (id, update) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/products/users/${id}`, update)
      dispatch(change_Quantity(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// export const guestChangeQuanity = (updatedProduct)=>{
//   return async (dispatch) =>{
    
//   }
// }

export const loginAddingToCart = (userId, addedProduct) =>{
  return async (dispatch) =>{
    try{
      console.log("Are we here?");
      const {data} = await axios.post(`/api/users/${userId}/cart`, addedProduct)
      console.log("Did we get data?", data)
      dispatch(data);
    }catch(err){
      console.log(err)
    }
  }
}

const initState = [];
export default function cartReducer(state = initState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.product];
    case GET_CART_PRODUCTS:
      return state;
    case DELETE_PRODUCT:
      return [...state.filter(product => product.id !== action.product.id)]
    case CHANGE_QUANTITY:
      return state.map((product) => (product.id === action.product.id ? action.product : product));
    case LOGIN_ADD_TO_CART:
      return [...state, action.cart];
    default:
      return state;
  }
}

// o: before done make sure to remove unused code
// //INSIDE HOME COMPONENT
// if (action.type === ADD_TO_CART) {

//   let addedItem = action.id;
//   //check if the action id exists in the addedItems
//   let existed_item = state.addedItems.find(
//     (product) => action.id === product.id
//   );
//   if (existed_item) {
//     addedItem.quantity += 1;
//     return {
//       ...state,
//       total: state.total + addedItem.price,
//     };
//   } else {
//     addedItem.quantity = 1;
//     //calculating the total
//     let newTotal = state.total + addedItem.price;

//     return {
//       ...state,
//       addedItems: [...state.addedItems, addedItem],
//       total: newTotal,
//     };
//   }
// } else {
//   return state;
// }
