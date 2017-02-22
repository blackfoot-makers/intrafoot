export default function userReducer(state = [], action) {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        allUsers: action.users,
        blackfootUsers: action.blackfootUsers,
        companies: action.companies
      };
    default:
      return state;
  }
}
