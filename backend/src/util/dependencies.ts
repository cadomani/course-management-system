// Add a callback/decorator to check for login and authentication on every page
export const loginRequired = function(req: any, res: any, next: any) {
  // Don't redirect as routes are handled by react router, instead, send a 401 response that can be handled by the frontend
  if (!req.isAuthenticated()) {
    return res.send(401)
  }
  return next();
}