export const mockUsers = [
  {
    id: 1,
    name: 'Nithesh Chennu',
    email: 'nithesh@gmail.com',
    role: 'admin',
    status: 'active'
  },
  {
    id: 2,
    name: 'Vivek Dussa',
    email: 'dvivek@gmail.com',
    role: 'manager',
    status: 'active'
  }
];

export const mockRoles = [
  {
    id: 1,
    name: 'Admin',
    description: 'Full system access',
    permissions: ['create_user', 'edit_user', 'delete_user', 'manage_roles']
  },
  {
    id: 2,
    name: 'Manager',
    description: 'Custom access',
    permissions: ['create_user', 'edit_user','view_content']
  },
  {
    id: 3,
    name: 'User',
    description: 'Basic access',
    permissions: ['view_content']
  }
];

export const mockPermissions = [
  'create_user',
  'edit_user',
  'delete_user',
  'manage_roles',
  'view_content'
];