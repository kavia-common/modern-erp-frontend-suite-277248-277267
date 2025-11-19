import { useUser } from '../contexts/UserContext';

// PUBLIC_INTERFACE
/**
 * Custom hook for role-based access control
 * @returns {Object} Role checking functions and current role
 */
const useUserRole = () => {
  const { currentUser, hasPermission, isAdmin, isManager, isStaff, isReadOnly } = useUser();

  const canCreate = () => hasPermission('Staff');
  const canEdit = () => hasPermission('Staff');
  const canDelete = () => hasPermission('Manager');
  const canApprove = () => hasPermission('Manager');
  const canManageUsers = () => hasPermission('Admin');
  const canViewReports = () => hasPermission('Staff');
  const canExport = () => hasPermission('Staff');

  return {
    role: currentUser.role,
    isAdmin,
    isManager,
    isStaff,
    isReadOnly,
    canCreate,
    canEdit,
    canDelete,
    canApprove,
    canManageUsers,
    canViewReports,
    canExport,
    hasPermission
  };
};

export default useUserRole;
