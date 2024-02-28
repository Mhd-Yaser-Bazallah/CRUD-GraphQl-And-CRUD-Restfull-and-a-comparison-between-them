const express = require('express');
const clientController = require('./Client_co');
const router = express.Router();

router
  .route('/')
  .get(clientController.getAllClient)
  .post(clientController.createClient);

router
  .route('/:id')
  .get(clientController.getClient)
  .patch( clientController.updateClient)
  .delete(clientController.deleteClient);


module.exports = router;