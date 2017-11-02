export default store => next => action => {
    const { type } = action;
    if (type === 'INIT') {
      try {
        const storedState = JSON.parse(
          localStorage.getItem('rewood')
        );
        if (storedState) {
          store.dispatch({
            type: 'RESET_APP_STATE',
            payload: storedState
          });
        }
        return;
      } catch (e) {
        // Unable to load or parse stored state, proceed as usual
      }
    }
  
    next(action);
  }
  