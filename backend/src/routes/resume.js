// Route pour les CV
const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const auth = require('../middleware/auth');

router.use(auth); // Protège toutes les routes CV

router.get('/', resumeController.getAllResumes);
router.post('/', resumeController.createResume);
router.put('/:id', resumeController.updateResume);
router.delete('/:id', resumeController.deleteResume);

module.exports = router;