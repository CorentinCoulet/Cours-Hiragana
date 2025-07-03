# 🈵 Apprentissage des Hiragana

Application web interactive pour apprendre les hiragana japonais avec un système de quiz QCM intelligent.

## 🚀 Fonctionnalités

- **Quiz QCM** avec 3 choix possibles (1 correct, 2 incorrects)
- **Sélection intuitive** des familles d'hiragana avec checkboxes
- **Répétitions intelligentes** : vous pouvez demander plus de questions que d'hiragana disponibles
- **Validation adaptative** : 
  - ✅ Réponse correcte → 300ms (rapide)
  - ❌ Réponse incorrecte → 1750ms (temps de réflexion)
- **3 modes de jeu** : Normal, Chronomètre, Survie
- **Système de progression** avec niveaux de difficulté
- **Statistiques détaillées** et badges
- **Interface responsive** et moderne

## 🎯 Utilisation

1. **Sélectionnez** les familles d'hiragana à pratiquer (clic simple sur les checkboxes)
2. **Définissez** le nombre de questions (peut dépasser le nombre d'hiragana disponibles)
3. **Choisissez** votre mode de jeu et niveau de difficulté
4. **Démarrez** le quiz et répondez aux questions QCM
5. **Progressez** et consultez vos statistiques

## 📁 Structure

- `index.html` - Interface principale
- `style.css` - Styles et design
- `script-extended.js` - Logique de l'application
- `hiragana-data-fixed.js` - Base de données des hiragana
- `tests.js` - Tests unitaires
- `package.json` - Configuration du projet

## 🧪 Tests

```bash
node tests.js
```

## 🎨 Design

Interface moderne avec thème sombre/clair, animations fluides et design responsive pour tous les écrans.
