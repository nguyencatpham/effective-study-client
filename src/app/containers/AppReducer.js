import { browserHistory } from 'react-router'
import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const RESET_APP_STATE = 'RESET_APP_STATE'
export const UPDATE_APP_STATE = 'UPDATE_APP_STATE'
export const SIGNOUT_ERROR = 'SIGNOUT_ERROR'

// ------------------------------------
// Actions
// ------------------------------------
export function updateAppState (userData) {
  return {
    type: UPDATE_APP_STATE,
    userData
  }
}

export function signOut () {
  return (dispatch, getState) => {
    axios.post('/accounts/logout')
      .then(function (response) {
        // clear userData
        dispatch(updateAppState())
        browserHistory.push('/signin')
      }).catch(function (error) {
        dispatch(signOutError(error.response.data))
      })
  }
}

export function signOutError () {
  return {
    type: SIGNOUT_ERROR
  }
}

export const actions = {
  updateAppState,
  signOut
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RESET_APP_STATE]: (state, action) => ({
    ...state,
    acceptToken: action.payload && action.payload.acceptToken ? action.payload.acceptToken : null,
    refreshToken: action.payload && action.payload.refreshToken ? action.payload.refreshToken : null,
    userData: action.payload && action.payload.userData ? action.payload.userData : {}
  }),
  [UPDATE_APP_STATE]: (state, action) => {
    if (action.userData) {
      return {
        ...state,
        acceptToken: action.userData && action.userData.acceptToken ? action.userData.acceptToken : null,
        refreshToken: action.userData && action.userData.refreshToken ? action.userData.refreshToken : null,
        userData: action.userData ? action.userData : {},
      }
    }

    return initialState
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  acceptToken: null,
  refreshToken: null,
  userData: {}
}

export default function appReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
