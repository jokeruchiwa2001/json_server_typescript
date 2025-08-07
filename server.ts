import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint pour colis.json
app.get('/colis', (req, res) => {
  const colisPath = path.join(process.cwd(), 'colis.json');
  fs.readFile(colisPath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Erreur serveur');
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});