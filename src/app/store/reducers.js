import { combineReducers } from 'redux'
import locationReducer from './location'
import { reducer as formReducer } from 'redux-form'
import appReducer from '../containers/AppReducer'
import customDatePickerReducer from '../components/CustomDatePicker/CustomDatePickerReducer'
import loadingReducer from '../components/Loading/LoadingReducer'
import cartReducer from '../routes/Cart/modules/CartReducer'
import productDetailReducer from '../routes/ProductDetail/modules/ProductDetailReducer'
import signinInReducer from '../routes/SignIn/modules/SignInReducer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    form: formReducer,
    customDatePicker: customDatePickerReducer,
    loading: loadingReducer,
    app: appReducer,
   cart: cartReducer,
    productDetail: productDetailReducer,
    signin: signinInReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
