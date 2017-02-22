export default function accountReducer(state = [], action) {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        currentUser: action.currentUser,
      };
    default:
      return state;
  }
}
