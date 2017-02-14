export default function projectReducer(state = [], action) {
  switch (action.type) {
    case 'SET_PROJECT':
      return action.projects;
    default:
      return state;
  }
}
