export function visibilityFilter(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

const PER_PAGE_SKIP = 10;
export function pageSkip(state = 0, action = {}) {
  switch (action.type) {
    case 'MODERATION_CHANGE_PAGE':
      // take the currentPageNumber from the payload
      return action.data.currentPageNumber * PER_PAGE_SKIP;
    default:
      return state;
  }
}

export function setTodo(state = [], action) {
  switch (action.type) {
    case 'SET_TODO':
      return {
        todos: action.todos,
        incompleteCount: action.incompleteCount,
      };
    default:
      return state;
  }
}
