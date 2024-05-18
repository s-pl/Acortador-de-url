const express = require('express');
const router = express.Router();
const db = require('../src/db');
const validator = require('validator');

router.get('/:id', function(req, res) {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({
            "error": "No se ha proporcionado un ID válido."
        });
    }

    db.getURL(id, (err, url) => {
        if (err) {
            res.status(500).json({
                "error": "Error interno al procesar la solicitud."
            });
        } else if (!url) {
            res.status(404).json({
                "error": "No se encontró la URL para el ID proporcionado."
            });
        } else {
            res.status(200).redirect(url);
        }
    });
});

module.exports = router;
