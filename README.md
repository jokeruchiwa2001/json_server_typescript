# JSON Server TypeScript pour TransCargo

## 🚀 Démarrage

```bash
# Installer les dépendances
npm install

# Démarrer le serveur
npm start

# Développement avec auto-reload
npm run dev
```

## 📡 API Endpoints

### Cargaisons
- `GET /cargaisons` - Liste toutes les cargaisons
- `GET /cargaisons/:id` - Récupère une cargaison par ID
- `POST /cargaisons` - Crée une nouvelle cargaison
- `PUT /cargaisons/:id` - Met à jour une cargaison
- `DELETE /cargaisons/:id` - Supprime une cargaison

### Colis
- `GET /colis` - Liste tous les colis
- `GET /colis/:id` - Récupère un colis par ID
- `POST /colis` - Crée un nouveau colis
- `PUT /colis/:id` - Met à jour un colis
- `DELETE /colis/:id` - Supprime un colis

### Clients
- `GET /clients` - Liste tous les clients
- `POST /clients` - Crée un nouveau client

## 🔧 Configuration

Le serveur démarre sur le port **3001** en local.

CORS configuré pour :
- `http://localhost:3000` 
- `http://localhost:3005`
- `https://transcargo.onrender.com`

## 📁 Fichiers de données

- `cargaisons.json` - Données des cargaisons
- `colis.json` - Données des colis  
- `clients.json` - Données des clients

Les données sont automatiquement sauvegardées dans ces fichiers.
