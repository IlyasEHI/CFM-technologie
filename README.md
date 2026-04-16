# CFM Technologie 🏭

Site web officiel de **CFM Technologie SARL** - Entreprise de mécanique de précision et sous-traitance industrielle basée à Casablanca, Maroc.

## 📋 À propos

CFM Technologie SARL est une entreprise créée en 2008, spécialisée dans :
- **Conception et fabrication d'outillage industriel**
- **Mécanique de précision et usinage**
- **Sous-traitance industrielle**
- **Bureau d'études SOLIDWORKS**

📍 **Adresse** : BD Chefchaouni Km 11.5, Quartier Industriel Béausite, Casablanca
📞 **Téléphone** : +212 522 67 46 28
🌐 **Site web** : https://cfm-technologie.ma (pending deployment)

## 🛠️ Technologies utilisées

- **HTML5** sémantique + SEO optimisé
- **CSS3** moderne avec variables CSS (+4.000 lignes)
- **JavaScript Vanilla** (GSAP-like animations, chatbot)
- **Responsive Design** (mobile-first)
- **Schema.org** pour le référencement local

## 📁 Structure du projet

```
cfm-technologie-site/
├── index.html          # Page d'accueil principale
├── devis.html          # Formulaire de demande de devis
├── css/
│   └── styles.css      # Feuille de styles complète
├── js/
│   └── app.js          # Interactions, animations, chatbot
├── assets/             # Images, logos, favicon
├── .github/
│   └── workflows/      # GitHub Actions pour CI/CD
├── GMB_DOSSIER.md      # Dossier Google Business Profile
└── README.md           # Ce fichier
```

## 🚀 Déploiement

Le site est configuré pour être déployé sur **Azure Static Web Apps**.

### GitHub Actions

- **Déploiement automatique** sur push vers `main`
- Workflow configuré dans `.github/workflows/azure-static-web-apps-*.yml`

### Déploiement manuel

```bash
# Prérequis : Azure CLI + SWA CLI
npm install -g @azure/static-web-apps-cli

# Déployer
swa deploy ./ --deployment-token $TOKEN
```

## 🔧 Fonctionnalités

- ✅ Design corporate premium (bleu/orange industriel)
- ✅ Animations fluides (parallax, hover effects)
- ✅ Chatbot intelligent intégré
- ✅ Formulaire de devis interactif
- ✅ SEO local optimisé (Casablanca, Aïn Sebâa)
- ✅ Horaires d'ouverture dynamiques
- ✅ Responsive (mobile, tablette, desktop)

## 📄 License

Propriétaire - CFM Technologie SARL

---

**ICE** : 000052028000095  
**Créée** : 2008  
**Activité** : Mécanique de précision et sous-traitance industrielle
