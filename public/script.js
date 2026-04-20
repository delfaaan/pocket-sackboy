const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

const API_URL = 'http://localhost:3000/api/chat';
const conversation = [];

form.addEventListener('submit', async function (e) {
	e.preventDefault();

	const userMessage = input.value.trim();
	if (!userMessage) return;

	// 1. Add user message to UI and history
	appendMessage('user', userMessage);
	conversation.push({ role: 'user', text: userMessage });
	input.value = '';

	// 2. Show temporary "Thinking..." bot message
	const botMessageElement = appendMessage('bot', 'Thinking...');

	try {
		// 3. Send the user's message as a POST request
		const response = await fetch(API_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ conversation })
		});

		if (!response.ok) throw new Error('Failed to get response from server.');

		const data = await response.json();

		// 4. Update UI with the full response
		if (data && data.result) {
			botMessageElement.textContent = data.result;
			conversation.push({ role: 'model', text: data.result });
		} else {
			botMessageElement.textContent = 'Sorry, no response received.';
		}
	} catch (error) {
		console.error('Error:', error);
		botMessageElement.textContent = 'Failed to get response from server.';
	}
});

function appendMessage(sender, text) {
	const msg = document.createElement('div');
	msg.classList.add('message', sender);
	msg.textContent = text;
	chatBox.appendChild(msg);
	chatBox.scrollTop = chatBox.scrollHeight;
	return msg;
};