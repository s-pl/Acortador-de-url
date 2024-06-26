# Acortador de URLs

Este es un servicio simple de acortamiento de URLs construido con Node.js, Express y SQLite.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Navega al directorio del proyecto.
3. Ejecuta `npm install` para instalar las dependencias.
4. Inicia el servidor ejecutando `npm start`.

## Uso

- Para acortar una URL, realiza una solicitud POST al endpoint `/short` con un cuerpo JSON que contenga la URL. Ejemplo: `{"url": "https://example.com"}`.
- Para obtener información sobre una URL acortada, realiza una solicitud GET a `/info/:id`, donde `:id` es el identificador único de la URL acortada.

## Dependencias

- [Express](https://www.npmjs.com/package/express):
- [SQLite3](https://www.npmjs.com/package/sqlite3): 
- [Validator](https://www.npmjs.com/package/validator): 
## Ejemplo de uso
- [Render](https://acortador-de-url.onrender.com/)
## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

