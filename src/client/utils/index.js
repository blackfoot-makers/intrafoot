import { Roles } from 'meteor/alanning:roles';

export function redirectToLogin(message, nextState, replace) {
  const notification = document.getElementById('snackbarIntraFoot');
  if (notification) {
    notification.MaterialSnackbar.showSnackbar({
      message
    });
  }

  replace({
    pathname: '/user',
    state: { nextPathname: nextState.location.pathname }
  });
}

export function requireAuth(nextState, replace) {
  const currentUser = Meteor.user();

  if (!currentUser || !Roles.userIsInRole(currentUser, 'admin')) {
    redirectToLogin(
      'You must be a Blackfoot employee to access this page',
      nextState,
      replace
    );
  } else if (currentUser && !currentUser.emails[0].verified) {
    redirectToLogin(
      'You must verify your email address before you can log in',
      nextState,
      replace
    );
  }
}
