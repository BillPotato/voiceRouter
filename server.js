// Simple Express backend for speech-to-text (ES module syntax)
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import vosk from 'vosk';
const { Model, Recognizer } = vosk;
import cors from 'cors';

app.use(cors());

const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(cors());

// Load Vosk model (make sure to download and unzip a model to ./model)
const MODEL_PATH = './model';
let model;
try {
  model = new Model(MODEL_PATH);
} catch (err) {
  console.error('Vosk model not found. Download and unzip a model to ./model');
  process.exit(1);
}

// POST /api/speech-to-text: receives audio file and returns transcript
app.post('/api/speech-to-text', upload.single('audio'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const buffer = fs.readFileSync(filePath);
  const rec = new Recognizer({model: model, sampleRate: 16000});
  rec.acceptWaveform(buffer);
  const result = rec.finalResult();
  res.json({ transcript: result.text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (req.file) fs.unlinkSync(req.file.path);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Speech-to-text backend running on port ${PORT}`);
});
