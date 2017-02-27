export default function factureReducer(state = [], action) {
  switch (action.type) {
    case 'SET_FACTURE':
      return action.factures;
    default:
      return state;
  }
}
