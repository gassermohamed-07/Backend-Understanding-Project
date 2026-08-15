
const requireRole = (allowedRoles) => {
  return (req, res, next) => {
      try {

        const membership = req.user.workspaces.find(w => w.workspace.toString() === req.params.workspaceId);
        
        if (!membership) {
          const error = new Error("You are not a member of this workspace!");
          error.statuscode = 403;
          throw error;
        };

        
        req.membership = membership;

        if (!allowedRoles.includes(membership.role)) {
          const error = new Error("You do not have permission to perform this action!");
          error.statuscode = 403;
          throw error;
    };

    next();
  } catch (error) {
    next(error);
    }
  }
};

export default requireRole;

