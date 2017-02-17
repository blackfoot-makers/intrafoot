export default function projectReducer(state = [], action) {
  switch (action.type) {
    case 'SET_DEVIS':
      return action.devis;
    default:
      return state;
  }
}
