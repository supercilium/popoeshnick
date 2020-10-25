import { SET_ALKASH } from '../actionTypes'
import { Store, SetUserActionInterface } from '../store'

const initialState: Store = {
  alkash: {},
}

export const userState = (state = initialState, action: SetUserActionInterface): Store => {
  switch (action.type) {
    case SET_ALKASH:
      return { ...state, alkash: action.payload }
    default:
      return state
  }
}
