const express = require('express');
const router = express.Router();
const nftmintController = require('../controllers/nftmintController');
const authController = require('./../controllers/authController');
const upload = require('../utils/upload');

router.get('', nftmintController.getAllNFTs);
router.get('/:id', nftmintController.getNFT);

// Protect all routes after this middleware
router.use(authController.protect);

router.post('', upload, nftmintController.mintNFT);

module.exports = router;