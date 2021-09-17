// Bring in express and define the router for this route path
import { Router } from 'express';
var router = Router();

// Index route
router.get('/', function(req, res, next) {
  // Render index.pug view
  res.render('index', { title: 'Express' });
});

// Login route
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Test Page Reached' });
});

// Export the router for this page
export default router;
