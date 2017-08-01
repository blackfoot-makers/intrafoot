/* eslint-disable */
Roles.setRolesOnUserObj = (users, roles, group) => {
  if (!users) throw new Error("Missing 'users' param");
  if (!roles) throw new Error("Missing 'roles' param");
  if (group) {
    if (typeof group !== 'string') { throw new Error("Roles error: Invalid parameter 'group'. Expected 'string' type"); }
    if (group[0] === '$') { throw new Error("Roles error: groups can not start with '$'"); }

    // convert any periods to underscores
    group = group.replace(/\./g, '_');
  }

  // ensure arrays to simplify code
  if (!_.isArray(users)) users = [users];
  if (!_.isArray(roles)) roles = [roles];


  // remove invalid roles
  roles = _.reduce(roles, (memo, role) => {
    if (role
        && typeof role === 'string'
        && role.trim().length > 0) {
      memo.push(role.trim());
    }
    return memo;
  }, []);

  // if roles is empty, quit
  if (roles.length === 0) return;

  // ensure all roles exist in 'roles' collection
  existingRoles = _.reduce(Meteor.roles.find({}).fetch(), (memo, role) => {
    memo[role.name] = true;
    return memo;
  }, {});
  _.each(roles, (role) => {
    if (!existingRoles[role]) {
      Roles.createRole(role);
    }
  });

  // ensure users is an array of objects
  _.each(users, (user) => {
    if (typeof user !== 'object') {
      throw new Error("Expected 'users' argument to be an object or array of objects");
    }
  });


  // Set the roles on the actual user object

  if (group) {
    // roles is a key/value dict object

    _.each(users, (user) => {
      user.roles = {};
      user.roles[group] = roles;
    });
  } else {
    // roles is an array of strings

    _.each(users, (user) => {
      user.roles = roles;
    });
  }
};  // end setRolesOnUserObj
