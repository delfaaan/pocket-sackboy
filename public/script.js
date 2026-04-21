const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

const API_URL = 'http://localhost:3000/api/chat';
const conversation = [];

// Show initial message when chat box is empty
function showInitialMessage() {
	if (chatBox.children.length === 0) {
		const initialMsg = document.createElement('div');

		initialMsg.classList.add('message', 'bot', 'initial');
		initialMsg.textContent = "hello, creator. what’s on your stitch?";

		chatBox.appendChild(initialMsg);
	}
}

showInitialMessage();

const gamerThinkingWords = [
	"loading...",
	"buffering...",
	"respawning...",
	"looting...",
	"reloading...",
	"casting spell...",
	"checking stats...",
	"grinding...",
	"waiting for host...",
	"finding match...",
	"optimizing loadout...",
	"quick saving...",
	"teleporting...",
	"repairing armor..."
];

let thinkingWordIndex = 0;

form.addEventListener('submit', async function (e) {
	e.preventDefault();

	const userMessage = input.value.trim();
	if (!userMessage) return;

	appendMessage('user', userMessage);
	conversation.push({ role: 'user', text: userMessage });
	input.value = '';

	const botMessageElement = appendMessage('bot', '');
	botMessageElement.classList.add('thinking');

	const thinkingWord = gamerThinkingWords[thinkingWordIndex % gamerThinkingWords.length];
	botMessageElement.textContent = thinkingWord;

	thinkingWordIndex++;

	let accumulatedText = '';

	try {
		const response = await fetch(API_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ conversation })
		});

		if (!response.ok) throw new Error('Failed to get response from server.');

		botMessageElement.classList.remove('thinking');
		botMessageElement.textContent = '';

		const reader = response.body.getReader();
		const decoder = new TextDecoder();

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			const chunk = decoder.decode(value, { stream: true });
			accumulatedText += chunk;

			const renderedHtml = marked.parse(accumulatedText, { mangle: false, headerIds: false });
			botMessageElement.innerHTML = renderedHtml;
			chatBox.scrollTop = chatBox.scrollHeight;

			await new Promise(resolve => setTimeout(resolve, 25));
		}

		conversation.push({ role: 'model', text: accumulatedText });
	} catch (error) {
		console.error('Error:', error);

		if (botMessageElement) {
			botMessageElement.classList.remove('thinking');
			botMessageElement.textContent = 'Failed to get response from server.';
		}
	}
});

function appendMessage(sender, text) {
	if (chatBox.querySelector('.initial')) {
		// chatBox.innerHTML = ''; // clears only if you want to wipe it completely
		chatBox.querySelector('.initial')?.remove();
	}

	const msg = document.createElement('div');
	
	msg.classList.add('message', sender);
	msg.textContent = text;

	chatBox.appendChild(msg);
	chatBox.scrollTop = chatBox.scrollHeight;

	return msg;
}