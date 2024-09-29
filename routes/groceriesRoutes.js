const express = require('express');
const router = express.Router();
const groceriesController = require('../controllers/groceriescontroller');
const { requireAuth } = require('../middleware/authmiddleware');

router.post('/searchgroceries', groceriesController.groceries_post);

module.exports = router;
