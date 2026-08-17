import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Google Sheets Proxy endpoint for robust cross-origin sync without iframe restrictions
app.post('/api/sync-sheets', async (req, res) => {
  try {
    const { scriptUrl, payload } = req.body;
    if (!scriptUrl || !payload) {
      return res.status(400).json({ error: 'scriptUrl and payload are required' });
    }

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      redirect: 'follow'
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    return res.json({ success: true, status: response.status, data });
  } catch (error) {
    console.error('Error proxying to Google Sheets:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/fetch-sheets', async (req, res) => {
  try {
    const { scriptUrl, action } = req.query;
    if (!scriptUrl) {
      return res.status(400).json({ success: false, error: 'scriptUrl is required' });
    }

    const targetUrl = action ? `${scriptUrl}?action=${encodeURIComponent(action)}` : scriptUrl;
    const response = await fetch(targetUrl, {
      method: 'GET',
      redirect: 'follow'
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    return res.json(data);
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Serve static assets from root directory
app.use(express.static(__dirname));

// SPA / static fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${PORT}`);
});

