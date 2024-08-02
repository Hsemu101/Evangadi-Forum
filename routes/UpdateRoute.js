const express = require('express');
const router = express.Router();
const { updateProfile } = require('../Controller/updateuser')
const authMiddleware = require('../middleware/autentication'); 

// Route for updating profile
router.put('/profile/', authMiddleware, updateProfile);

module.exports = router;