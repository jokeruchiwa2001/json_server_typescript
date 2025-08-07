import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
// Fonction helper pour lire les fichiers JSON
const readJsonFile = (filename) => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(process.cwd(), filename);
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Erreur lecture ${filename}:`, err);
                reject(err);
            }
            else {
                try {
                    resolve(JSON.parse(data));
                }
                catch (parseErr) {
                    console.error(`Erreur parsing ${filename}:`, parseErr);
                    reject(parseErr);
                }
            }
        });
    });
};
// Endpoint pour colis.json
app.get('/colis', async (req, res) => {
    try {
        console.log('Requête reçue sur /colis');
        const data = await readJsonFile('colis.json');
        res.json(data);
    }
    catch (err) {
        console.error('Erreur /colis:', err);
        res.status(500).json({ error: 'Erreur serveur lors de la lecture des colis' });
    }
});
// Endpoint pour cargaisons.json
app.get('/cargaisons', async (req, res) => {
    try {
        console.log('Requête reçue sur /cargaisons');
        const data = await readJsonFile('cargaisons.json');
        res.json(data);
    }
    catch (err) {
        console.error('Erreur /cargaisons:', err);
        res.status(500).json({ error: 'Erreur serveur lors de la lecture des cargaisons' });
    }
});
app.get('/', (req, res) => {
    res.send(`
    <h2>JSON Server TypeScript</h2>
    <ul>
      <li><a href="/colis">/colis</a></li>
      <li><a href="/cargaisons">/cargaisons</a></li>
    </ul>
  `);
});
// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error('Erreur non gérée:', err);
    res.status(500).json({ error: 'Erreur serveur interne' });
});
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
//# sourceMappingURL=server.js.map