const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name = prompt("What's your name?");
appendMessage('You joined');

socket.emit('new-user', name);

socket.on('user-joined-chat', (name) => {
	appendMessage(`${name} has joined the chat`);
});

socket.on('user-disconnected', (name) => {
	appendMessage(`${name} has left the chat`);
});

socket.on('chat-message', (data) => {
	appendMessage(`${data.name}: ${data.message}`);
});

messageForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const message = messageInput.value;
	socket.emit('send-chat-message', message);
	appendMessage(`You: ${message}`);
	messageInput.value = '';
});

function appendMessage(message) {
	const messageElement = document.createElement('div');
	messageElement.innerText = message;
	messageContainer.append(messageElement);
}
