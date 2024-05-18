const express = require('express');
const router = express.Router();
const db = require('../src/db');
const validator = require('validator');


router.post('/short', function(req, res) {
    const url = req.body.url;
    
    if (!url || !validator.isURL(url)) {
        return res.json({
            "error": "No has introducido una URL válida."
        });
    } else {
        db.insert(url, (err, id) => {
            if (err) {
                res.status(500).json({
                    "error": "Error interno al procesar la solicitud."
                });
            } else {
                res.status(200).json({
                    'message': id
                });
            }
        });
    }
});

module.exports = router;
