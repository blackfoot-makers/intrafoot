export default function virtucompteReducer(state = [], action) {
  switch (action.type) {
    case 'SET_VIRTUCOMPTE':
      return action.virtucomptes;
    default:
      return state;
  }
}
