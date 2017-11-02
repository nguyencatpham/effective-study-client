import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'

import Loading from '../components/Loading/Loading'
import { showLoading, hideLoading } from '../components/Loading/LoadingReducer'

class HelpperWrapper extends React.PureComponent {
  constructor(props) {
    super(props); // required
  }

  componentWillMount() {
    let store = this.props.store;
    store.dispatch(showLoading());
    setTimeout(function(){ store.dispatch(hideLoading()); }, 2000);

  }

  render() {
    let { browserHistory, routes } = this.props;
    return (
      <div>
        <Router history={browserHistory} children={routes} />

        <Loading />
      </div>
    );
  }
}

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.array.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }
  componentDidMount () {
  }

  render () {
    const { routes, store } = this.props
    return (
      <Provider store={store}>
        <HelpperWrapper browserHistory={browserHistory} routes={routes} store={store}></HelpperWrapper>
      </Provider>
    )
  }
}

export default AppContainer
