# Pocket Sackboy - LittleBigPlanet Chatbot

> Pocket Sackboy is a LittleBigPlanet‑themed chatbot that talks PlayStation games with gamer slang, streams responses word‑by‑word, and thinks in loot‑filled phrases – all from the cozy pocket of your favorite crafty hero.

## Features

- PlayStation-only conversations with gamer slang
- Word-by-word streaming responses
- LittleBigPlanet burlap/stitch theme
- Glowing "thinking" text animation
- Random gamer thinking words (looting, respawning, teleporting...)
- Markdown support via marked.js
- Sackboy character art in corners
- Responsive design

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- AI: Google Gemini (gemini-3-flash-preview)
- Markdown: marked.js
- Streaming: Chunked transfer / SSE

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Google Gemini API key

### Installation

1. Clone the repository:
   git clone https://github.com/yourusername/pocket-sackboy.git
   cd pocket-sackboy

2. Install dependencies:
   npm install

3. Create a .env file:
   GEMINI_API_KEY=your_api_key_here

4. Add Sackboy images to public/images/:
   - sackboy-left.png
   - sackboy-right.png

5. Run the server:
   node index.js

6. Open your browser to:
   http://localhost:3000

## Project Structure

pocket-sackboy/
├── public/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── images/
│       ├── sackboy-left.png
│       └── sackboy-right.png
├── index.js
├── .env
├── package.json
├── README.md
└── LICENSE

## License

MIT License - see LICENSE file.

## Disclaimer

Sackboy and LittleBigPlanet are trademarks of Sony Interactive Entertainment. This is a fan-made, non-commercial educational project.

---

Created by Delfan Azhar Andhika