const initialState = {
  alkash: {},
};
export default function userstate(state = initialState, action) {
  switch (action.type) {
    case 'SET_ALKASH':
      return { ...state, profile: action.payload };
    default:
      return state;
  }
}
