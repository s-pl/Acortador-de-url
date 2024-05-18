const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const generateID = require('./idGen');  // Asegúrate de que la ruta es correcta

let dbPath = path.resolve(__dirname, '../database/url.db');
let db;


    db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error al abrir la base de datos:', err.message);
            throw err;
        }
        console.log('Conexión a la base de datos SQLite establecida.');
        createTables();  // Llamada a la función para crear las tablas
    });


function createTables() {
    const createUrlTableSQL = `
        CREATE TABLE IF NOT EXISTS url (
            id TEXT PRIMARY KEY,
            url TEXT NOT NULL,
            fecha TEXT NOT NULL
        );
    `;
    
    const createClicksTableSQL = `
        CREATE TABLE IF NOT EXISTS url_clicks (
            id TEXT PRIMARY KEY,
            url TEXT NOT NULL,
            clicks INTEGER DEFAULT 0
        );
    `;
    
    db.run(createUrlTableSQL, (err) => {
        if (err) {
            console.error('Error al crear la tabla "url":', err.message);
            throw err;
        }
        console.log('Tabla "url" creada o ya existe.');
    });

    db.run(createClicksTableSQL, (err) => {
        if (err) {
            console.error('Error al crear la tabla "url_clicks":', err.message);
            throw err;
        }
        console.log('Tabla "url_clicks" creada o ya existe.');
    });
}

function insert(url, callback) {
    const fechaCreacion = new Date().toISOString();
    const id = generateID.ID();  // Usar uuid para generar ID único

    db.run('INSERT INTO url (id, url, fecha) VALUES (?, ?, ?)', [id, url, fechaCreacion], function(err) {
        if (err) {
            console.error('Error al añadir la url:', err.message);
            callback(new Error("Error interno al añadir la url (500)"));
        } else {
            db.run('INSERT INTO url_clicks (id, url, clicks) VALUES (?, ?, 0)', [id, url], function(err) {
                if (err) {
                    console.error('Error al añadir la url a la tabla de clics:', err.message);
                    callback(new Error("Error interno al añadir la url a la tabla de clics (500)"));
                } else {
                    console.log('Nueva URL acortada y registrada para seguimiento de clics', url);
                    callback(null, id);
                }
            });
        }
    });
}

function getURL(id, callback) {
    const query = "SELECT url FROM url WHERE id = ?";
    
    db.get(query, [id], (err, row) => {
        if (err) {
            console.error('Error al obtener la URL:', err.message);
            callback(err);
        } else if (row) {
            incrementClicks(id);
            callback(null, row.url);
        } else {
            callback(new Error('No se encontró la URL para el ID proporcionado.'));
        }
    });
}

function incrementClicks(id) {
    const updateClicksSQL = "UPDATE url_clicks SET clicks = clicks + 1 WHERE id = ?";
    db.run(updateClicksSQL, [id], (err) => {
        if (err) {
            console.error('Error al incrementar los clics:', err.message);
        } else {
            console.log(`Clics incrementados para el ID: ${id}`);
        }
    });
}
function getClicks(id, callback) {
    const query = "SELECT clicks FROM url_clicks WHERE id = ?";
    
    db.get(query, [id], (err, row) => {
        if (err) {
            console.error('Error al obtener los clics:', err.message);
            callback(err);
        } else if (row) {
            callback(null, row);
        } else {
            callback(new Error('No hay clics para la URL proporcionada.'));
        }
    });
}


module.exports = {
  
    insert,
    getURL,
    getClicks
};
