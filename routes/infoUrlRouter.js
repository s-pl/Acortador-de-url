const express = require('express');
const router = express.Router();
const db = require('../src/db');

router.get('/info/:id', function(req, res) {  // Asegúrate de que la ruta comience con "/"
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({
            "error": "No se ha proporcionado un ID válido."
        });
    }

    db.getClicks(id, (err, data) => {
        if (err) {
            res.status(500).json({
                "error": "Error interno al procesar la solicitud."
            });
        } else if (!data) {
            res.status(404).json({
                "error": "No se encontraron clics para el ID proporcionado."
            });
        } else {
            res.status(200).json({
                'clicks': data.clicks
            });
        }
    });
});

module.exports = router;
