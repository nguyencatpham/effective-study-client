// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import CommonLayout from '../layouts/CommonLayout'
import HomeRoute from './Home'
import SignInRoute from './SignIn'
import SignUpRoute from './SignUp'

/*  Note: Instead of using JSX, we recommend using react-router
 PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => {
  const addCssToBody = (nextState, transition) => {
    // if router not home "/" check authenticate
    if (nextState.location.pathname !== '/') {
      let state = store.getState()
      if (!state.app.acceptToken) { transition('/signin') }
    }

    let body = document.body
    if (body.className.indexOf('logreg-wrapp') !== -1) {
      body.className = body.className.replace(' logreg-wrapp', '')
    }
  }

  return [
    {
      path: '/',
      onEnter: addCssToBody,
      component: CoreLayout,
      indexRoute: HomeRoute(store),
      childRoutes: [
      ]
    },
    {
      path: '/signin',
      component: CommonLayout,
      indexRoute: SignInRoute(store)
    },
    {
      path: '/signup',
      component: CommonLayout,
      indexRoute: SignUpRoute(store)
    },
  ]
}

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
 using getChildRoutes with the following signature:

 getChildRoutes (location, cb) {
 require.ensure([], (require) => {
 cb(null, [
 // Remove imports!
 require('./Counter').default(store)
 ])
 })
 }

 However, this is not necessary for code-splitting! It simply provides
 an API for async route definitions. Your code splitting should occur
 inside the route `getComponent` function, since it is only invoked
 when the route exists and matches.
 */

export default createRoutes
