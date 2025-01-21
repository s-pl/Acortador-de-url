import { createClient } from 'redis';
import isUrl from 'is-url';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);
dotenv.config();

const client = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

client.on('error', err => console.error('Redis Client Error:', err));

await client.connect();

export function renderHome(req, res) {
    res.sendFile(__dirname + "/static/index.html")
}

export async function shortUrl(req, res) {
    try {
        const urlToCut = req.body.urlToCut;

        if (!urlToCut || !isUrl(urlToCut)) {
            return res.status(400).json({ error: 'No has introducido una URL válida' });
        }

        const ID = Math.random().toString(36).slice(2, 9);
        await client.set(ID, urlToCut);

        res.json({ success: `${req.protocol}://${req.get('host')}/${ID}` });
    } catch (error) {

        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export async function redirectToUrl(req, res) {
    try {
        const { url } = req.params;

        if (!url) {
            return res.status(400).json({ error: 'No has introducido una url!' });
        }

        const originalUrl = await client.get(url);

        if (originalUrl) {
            return res.redirect(originalUrl);
        }

        res.status(404).json({ error: 'URL no encontrada' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
