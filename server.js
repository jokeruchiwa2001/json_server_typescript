const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3005', 'https://transcargo.onrender.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());

// Helper functions pour lire/écrire les fichiers JSON
const readJSONFile = (filename) => {
  try {
    const filePath = path.join(__dirname, filename);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Erreur lecture ${filename}:`, error);
    return [];
  }
};

const writeJSONFile = (filename, data) => {
  try {
    const filePath = path.join(__dirname, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Erreur écriture ${filename}:`, error);
    return false;
  }
};

// Routes principales
app.get('/', (req, res) => {
  res.json({
    message: 'JSON Server TypeScript pour TransCargo',
    version: '1.0.0',
    endpoints: [
      'GET /cargaisons',
      'POST /cargaisons', 
      'GET /cargaisons/:id',
      'PUT /cargaisons/:id',
      'DELETE /cargaisons/:id',
      'GET /colis',
      'POST /colis',
      'GET /colis/:id', 
      'PUT /colis/:id',
      'DELETE /colis/:id',
      'GET /test'
    ]
  });
});

// ROUTES CARGAISONS
app.get('/cargaisons', (req, res) => {
  const cargaisons = readJSONFile('cargaisons.json');
  res.json(cargaisons);
});

app.get('/cargaisons/:id', (req, res) => {
  const cargaisons = readJSONFile('cargaisons.json');
  const cargaison = cargaisons.find(c => c.id === req.params.id);
  
  if (!cargaison) {
    return res.status(404).json({ error: 'Cargaison non trouvée' });
  }
  
  res.json(cargaison);
});

app.post('/cargaisons', (req, res) => {
  const cargaisons = readJSONFile('cargaisons.json');
  const nouvelleCargaison = {
    id: `CG-${Date.now().toString(36).toUpperCase()}`,
    ...req.body,
    dateCreation: new Date().toISOString()
  };
  
  cargaisons.push(nouvelleCargaison);
  
  if (writeJSONFile('cargaisons.json', cargaisons)) {
    res.status(201).json(nouvelleCargaison);
  } else {
    res.status(500).json({ error: 'Erreur lors de la sauvegarde' });
  }
});

app.put('/cargaisons/:id', (req, res) => {
  const cargaisons = readJSONFile('cargaisons.json');
  const index = cargaisons.findIndex(c => c.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Cargaison non trouvée' });
  }
  
  cargaisons[index] = { ...cargaisons[index], ...req.body };
  
  if (writeJSONFile('cargaisons.json', cargaisons)) {
    res.json(cargaisons[index]);
  } else {
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
});

app.delete('/cargaisons/:id', (req, res) => {
  const cargaisons = readJSONFile('cargaisons.json');
  const index = cargaisons.findIndex(c => c.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Cargaison non trouvée' });
  }
  
  cargaisons.splice(index, 1);
  
  if (writeJSONFile('cargaisons.json', cargaisons)) {
    res.status(204).send();
  } else {
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
});

// ROUTES COLIS
app.get('/colis', (req, res) => {
  const colis = readJSONFile('colis.json');
  res.json(colis);
});

app.get('/colis/:id', (req, res) => {
  const colis = readJSONFile('colis.json');
  const colisItem = colis.find(c => c.id === req.params.id);
  
  if (!colisItem) {
    return res.status(404).json({ error: 'Colis non trouvé' });
  }
  
  res.json(colisItem);
});

app.post('/colis', (req, res) => {
  const colis = readJSONFile('colis.json');
  const nouveauColis = {
    id: `COL-${Date.now().toString(36).toUpperCase()}`,
    ...req.body,
    dateCreation: new Date().toISOString()
  };
  
  colis.push(nouveauColis);
  
  if (writeJSONFile('colis.json', colis)) {
    res.status(201).json(nouveauColis);
  } else {
    res.status(500).json({ error: 'Erreur lors de la sauvegarde' });
  }
});

app.put('/colis/:id', (req, res) => {
  const colis = readJSONFile('colis.json');
  const index = colis.findIndex(c => c.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Colis non trouvé' });
  }
  
  colis[index] = { ...colis[index], ...req.body };
  
  if (writeJSONFile('colis.json', colis)) {
    res.json(colis[index]);
  } else {
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
});

app.delete('/colis/:id', (req, res) => {
  const colis = readJSONFile('colis.json');
  const index = colis.findIndex(c => c.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Colis non trouvé' });
  }
  
  colis.splice(index, 1);
  
  if (writeJSONFile('colis.json', colis)) {
    res.status(204).send();
  } else {
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
});

// Route de test
app.get('/test', (req, res) => {
  res.json({ message: 'JSON Server fonctionne !', timestamp: new Date().toISOString() });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 JSON Server TypeScript démarré sur le port ${PORT}`);
  console.log(`📡 API disponible sur http://localhost:${PORT}`);
  console.log(`📋 Endpoints:`);
  console.log(`   GET    http://localhost:${PORT}/cargaisons`);
  console.log(`   GET    http://localhost:${PORT}/colis`);
  console.log(`   GET    http://localhost:${PORT}/test`);
});
