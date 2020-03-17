import {
  createStore,
} from 'redux'
import rootReducer from './reducers/rootReducer'

// eslint-disable-next-line import/prefer-default-export
export const store = createStore(rootReducer,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
