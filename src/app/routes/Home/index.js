import { injectReducer } from '../../store/reducers'

export default (store) => {
  const onEnter = (nextState, transition) => {
  }

  return {
    onEnter: onEnter,
    /*  Async getComponent is only invoked when route matches   */
    getComponent (nextState, cb) {
      /*  Webpack - use 'require.ensure' to create a split point
       and embed an async module loader (jsonp) when bundling   */
      require.ensure([], (require) => {
        /*  Webpack - use require callback to define
         dependencies for bundling   */
        const Home = require('./containers').default
        const reducer = require('./reducers').default

        /*  Add the reducer to the store on key 'counter'  */
        injectReducer(store, {key: 'home', reducer})

        /*  Return getComponent   */
        cb(null, Home)

        /* Webpack named bundle   */
      }, 'home')
    }
  };
}