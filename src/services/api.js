// Simulate API latency
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate API response wrapper
const apiResponse = async (data, error = null) => {
  await delay(500); // Simulate network delay
  if (error) {
    throw new Error(error);
  }
  return { data, status: 'success' };
};

// Users API
export const usersApi = {
  async getUsers() {
    return apiResponse(JSON.parse(localStorage.getItem('users')) || []);
  },

  async createUser(userData) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = { ...userData, id: Date.now() };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return apiResponse(newUser);
  },

  async updateUser(userId, userData) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const index = users.findIndex(user => user.id === userId);
    if (index === -1) {
      return apiResponse(null, 'User not found');
    }
    users[index] = { ...users[index], ...userData };
    localStorage.setItem('users', JSON.stringify(users));
    return apiResponse(users[index]);
  },

  async deleteUser(userId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const filteredUsers = users.filter(user => user.id !== userId);
    localStorage.setItem('users', JSON.stringify(filteredUsers));
    return apiResponse({ success: true });
  }
};

// Roles API
export const rolesApi = {
  async getRoles() {
    return apiResponse(JSON.parse(localStorage.getItem('roles')) || []);
  },

  async createRole(roleData) {
    const roles = JSON.parse(localStorage.getItem('roles')) || [];
    const newRole = { ...roleData, id: Date.now() };
    roles.push(newRole);
    localStorage.setItem('roles', JSON.stringify(roles));
    return apiResponse(newRole);
  },

  async updateRole(roleId, roleData) {
    const roles = JSON.parse(localStorage.getItem('roles')) || [];
    const index = roles.findIndex(role => role.id === roleId);
    if (index === -1) {
      return apiResponse(null, 'Role not found');
    }
    roles[index] = { ...roles[index], ...roleData };
    localStorage.setItem('roles', JSON.stringify(roles));
    return apiResponse(roles[index]);
  },

  async deleteRole(roleId) {
    const roles = JSON.parse(localStorage.getItem('roles')) || [];
    const filteredRoles = roles.filter(role => role.id !== roleId);
    localStorage.setItem('roles', JSON.stringify(filteredRoles));
    return apiResponse({ success: true });
  }
};

// Permissions API
export const permissionsApi = {
  async getPermissions() {
    return apiResponse(JSON.parse(localStorage.getItem('permissions')) || []);
  },

  async createPermission(permission) {
    const permissions = JSON.parse(localStorage.getItem('permissions')) || [];
    if (permissions.includes(permission)) {
      return apiResponse(null, 'Permission already exists');
    }
    permissions.push(permission);
    localStorage.setItem('permissions', JSON.stringify(permissions));
    return apiResponse(permission);
  },

  async deletePermission(permission) {
    const permissions = JSON.parse(localStorage.getItem('permissions')) || [];
    const filteredPermissions = permissions.filter(p => p !== permission);
    localStorage.setItem('permissions', JSON.stringify(filteredPermissions));
    return apiResponse({ success: true });
  }
};