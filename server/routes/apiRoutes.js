const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Rota genérica para integrações
router.post('/proxy', apiController.handleApiRequest);

module.exports = router;
