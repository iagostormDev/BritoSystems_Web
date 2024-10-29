// src/client.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const QRCode = require('qrcode');

class WhatsAppClient {
    constructor() {
        this.client = new Client({ authStrategy: new LocalAuth() });
        this.connected = false;
        this.qrCodeData = '';

        this.initializeClient();
    }

    initializeClient() {
        this.client.on('qr', this.handleQRCode.bind(this));
        this.client.on('ready', this.handleConnected.bind(this));
        this.client.on('message', this.handleMessage.bind(this));
        this.client.initialize();
    }

    handleConnected() {
        console.log('Cliente conectado com sucesso!');
        this.connected = true;
    }

    handleQRCode(qr) {
        QRCode.toDataURL(qr, (err, url) => {
            if (err) {
                console.error('Erro ao gerar QR Code', err);
                return;
            }
            this.qrCodeData = url; // Armazenar QR Code
            console.log("QR code atualizado e pronto para exibição no frontend.");
        });
    }

    handleMessage(message) {
        console.log(`Mensagem recebida de ${message.from}: ${message.body}`);
        // const responses = {
        //     oi: 'Olá! Como posso te ajudar?',
        //     ping: 'Pong!',
        // };

        // const response = responses[message.body.toLowerCase()];
        // if (response) {
        //     message.reply(response);
        // }
    }

    getQRCodeData() {
        return this.qrCodeData;
    }

    getStatus() {
        return this.connected;
    }
}

module.exports = WhatsAppClient;