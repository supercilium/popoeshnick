import {
  createStore,
} from 'redux'
import { userState } from './reducers'
import { UserProfile } from "../model/user"
import * as actionTypes from './actionTypes'

export interface Store {
  alkash: Partial<UserProfile>;
}

export interface SetUserActionInterface {
  type: typeof actionTypes.SET_ALKASH;
  payload: Partial<UserProfile>;
}

type withDevtools = {
  // TODO add alkash model
  __REDUX_DEVTOOLS_EXTENSION__?: any;
}

export const store = createStore(userState,
  process.env.NODE_ENV !== 'production' && (window as Window & typeof global & withDevtools).__REDUX_DEVTOOLS_EXTENSION__ && (window as Window & typeof global & withDevtools).__REDUX_DEVTOOLS_EXTENSION__())
