export default function prestaReducer(state = [], action) {
  switch (action.type) {
    case 'SET_PRESTA':
      return action.prestas;
    default:
      return state;
  }
}
