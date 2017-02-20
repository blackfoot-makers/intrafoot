export default function projectReducer(state = [], action) {
  switch (action.type) {
    case 'SET_FACTURE':
      return action.factures;
    default:
      return state;
  }
}
