// src/server.js
const express = require('express');
const WhatsAppClient = require('./client');

const app = express();
const port = 3000;
const waClient = new WhatsAppClient();

app.use(express.static('public'));

// Rota para enviar o QR code ao frontend
app.get('/data', (req, res) => {
    res.json({ 
        qrCode: waClient.getQRCodeData() || null ,
        connected: waClient.getStatus()
    });
});

// Inicializar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
