// Esto simula el FrontEnd de lo que visualiza el cliente, ante los mensajes que envia, siempre ahy un ida y vuelta
const socket = io();

// emit() es para enviar informacion
socket.emit('message', 'Cambiar producto');

socket.emit('finish', 'Consulta solucionada, gracias!');

// on() es esperando recibir un mensaje
socket.on('client-message', (info) => console.log(info));

socket.on('finish-message', (info) => console.log(info));
