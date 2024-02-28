const express = require('express');
const projectController = require('./project_co');
 
const router = express.Router();

router
  .route('/')
  .get(projectController.getAllProject)
  .post(projectController.createProject);
router
  .route('/:id')
  .get(projectController.getProject)
  .patch(projectController.updateProject )
  .delete(projectController.deleteProject);


module.exports = router;