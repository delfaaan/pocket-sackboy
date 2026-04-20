import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'
import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const upload = multer();
const port = 3000;
const model = 'gemini-3-flash-preview';

const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY,
});

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_req, res) => {
	res.send('hello, world.');
});

app.post('/generate-text', async (req, res) => {
	try {
		const { prompt } = req.body;

		const response = await ai.models.generateContent({
			model,
			contents: prompt
		});

		res.status(200).json({ result: response.text });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.post('/generate-from-file', upload.single('file'), async (req, res) => {
	try {
		const { prompt } = req.body;
		const base64File = req.file.buffer.toString('base64');

		const response = await ai.models.generateContent({
			model,
			contents: [
				{ text: prompt, type: 'text' },
				{
					inlineData: {
						data: base64File,
						mimeType: req.file.mimetype
					}
				}
			]
		});

		res.status(200).json({ result: response.text });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.post('/api/chat', async (req, res) => {
	const { conversation } = req.body;

	try {
		if (!Array.isArray(conversation)) throw new Error('messages must be an array.');

		const contents = conversation.map(({ role, text }) => ({
			role,
			parts: [{ text }]
		}));

		const response = await ai.models.generateContent({
			model: model,
			contents,
			config: {
				temperature: 0.9,
				systemInstruction: "aware of the context the user said to you, be formal, you could use sarcasm but not too much, and keep your responses short. always reply with lowercase characters. answer in english by default. and start your conversation by saying 'what's on your mind?'"
			},
		});

		res.status(200).json({ result: response.text });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.listen(port, () => {
	console.log(`program listening on port ${port}`);
});