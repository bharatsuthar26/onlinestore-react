import {createStore} from 'redux';
const initialState={
    cart:localStorage.getItem('mycart')!='undefined'?JSON.parse(localStorage.getItem('mycart')):[]
}
const reducer=(state=initialState,action)=>{
   switch(action.type){
     case 'UPDATE_CART' : return {cart:action.payload}
     default : return state;
   }
}
const store=createStore(reducer);
export default store;