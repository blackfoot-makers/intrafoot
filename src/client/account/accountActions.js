export function setUser(user) {
  return (dispatch) => {
    dispatch({
      type: 'SET_USER',
      user
    });
  };
}

export function getUser() {
  return (dispatch) => {
    dispatch(setUser(Meteor.user()));
  };
}

export function editUser(newUser) {
  const currentUser = Meteor.user();

  currentUser.profile = {
    ...currentUser.profile,
    email: newUser.email,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    company: newUser.company,
    title: newUser.title
  };

  Meteor.users.update({ _id: currentUser._id }, { $set: { profile: currentUser.profile } });
  return (dispatch) => {
    dispatch(setUser(currentUser));
  };
}
