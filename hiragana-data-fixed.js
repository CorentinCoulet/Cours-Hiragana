// Base de données des hiragana avec leurs lectures romanji
const HIRAGANA_DATA = [
    // Voyelles
    { hiragana: 'あ', romanji: 'a' }, { hiragana: 'い', romanji: 'i' }, { hiragana: 'う', romanji: 'u' }, 
    { hiragana: 'え', romanji: 'e' }, { hiragana: 'お', romanji: 'o' },
    
    // Série K
    { hiragana: 'か', romanji: 'ka' }, { hiragana: 'き', romanji: 'ki' }, { hiragana: 'く', romanji: 'ku' }, 
    { hiragana: 'け', romanji: 'ke' }, { hiragana: 'こ', romanji: 'ko' },
    
    // Série G
    { hiragana: 'が', romanji: 'ga' }, { hiragana: 'ぎ', romanji: 'gi' }, { hiragana: 'ぐ', romanji: 'gu' }, 
    { hiragana: 'げ', romanji: 'ge' }, { hiragana: 'ご', romanji: 'go' },
    
    // Série S
    { hiragana: 'さ', romanji: 'sa' }, { hiragana: 'し', romanji: 'shi' }, { hiragana: 'す', romanji: 'su' }, 
    { hiragana: 'せ', romanji: 'se' }, { hiragana: 'そ', romanji: 'so' },
    
    // Série Z
    { hiragana: 'ざ', romanji: 'za' }, { hiragana: 'じ', romanji: 'ji' }, { hiragana: 'ず', romanji: 'zu' }, 
    { hiragana: 'ぜ', romanji: 'ze' }, { hiragana: 'ぞ', romanji: 'zo' },
    
    // Série T
    { hiragana: 'た', romanji: 'ta' }, { hiragana: 'ち', romanji: 'chi' }, { hiragana: 'つ', romanji: 'tsu' }, 
    { hiragana: 'て', romanji: 'te' }, { hiragana: 'と', romanji: 'to' },
    
    // Série D
    { hiragana: 'だ', romanji: 'da' }, { hiragana: 'ぢ', romanji: 'di' }, { hiragana: 'づ', romanji: 'du' }, 
    { hiragana: 'で', romanji: 'de' }, { hiragana: 'ど', romanji: 'do' },
    
    // Série N
    { hiragana: 'な', romanji: 'na' }, { hiragana: 'に', romanji: 'ni' }, { hiragana: 'ぬ', romanji: 'nu' }, 
    { hiragana: 'ね', romanji: 'ne' }, { hiragana: 'の', romanji: 'no' },
    
    // Série H
    { hiragana: 'は', romanji: 'ha' }, { hiragana: 'ひ', romanji: 'hi' }, { hiragana: 'ふ', romanji: 'fu' }, 
    { hiragana: 'へ', romanji: 'he' }, { hiragana: 'ほ', romanji: 'ho' },
    
    // Série B
    { hiragana: 'ば', romanji: 'ba' }, { hiragana: 'び', romanji: 'bi' }, { hiragana: 'ぶ', romanji: 'bu' }, 
    { hiragana: 'べ', romanji: 'be' }, { hiragana: 'ぼ', romanji: 'bo' },
    
    // Série P
    { hiragana: 'ぱ', romanji: 'pa' }, { hiragana: 'ぴ', romanji: 'pi' }, { hiragana: 'ぷ', romanji: 'pu' }, 
    { hiragana: 'ぺ', romanji: 'pe' }, { hiragana: 'ぽ', romanji: 'po' },
    
    // Série M
    { hiragana: 'ま', romanji: 'ma' },
    { hiragana: 'み', romanji: 'mi' },
    { hiragana: 'む', romanji: 'mu' },
    { hiragana: 'め', romanji: 'me' },
    { hiragana: 'も', romanji: 'mo' },
    
    // Série Y
    { hiragana: 'や', romanji: 'ya' },
    { hiragana: 'ゆ', romanji: 'yu' },
    { hiragana: 'よ', romanji: 'yo' },
    
    // Série R
    { hiragana: 'ら', romanji: 'ra' },
    { hiragana: 'り', romanji: 'ri' },
    { hiragana: 'る', romanji: 'ru' },
    { hiragana: 'れ', romanji: 're' },
    { hiragana: 'ろ', romanji: 'ro' },
    
    // Série W et N
    { hiragana: 'わ', romanji: 'wa' },
    { hiragana: 'を', romanji: 'wo' },
    { hiragana: 'ん', romanji: 'n' }
];

// Variantes acceptables pour certains romanji
const ROMANJI_VARIANTS = {
    'shi': ['si'],
    'chi': ['ti'],
    'tsu': ['tu'],
    'fu': ['hu'],
    'ji': ['zi'],
    'zu': ['du'],
    'wo': ['o']
};

// Données étendues avec familles et niveaux de difficulté
const HIRAGANA_FAMILIES = {
    vowels: ['あ', 'い', 'う', 'え', 'お'],
    'k-series': ['か', 'き', 'く', 'け', 'こ'],
    'g-series': ['が', 'ぎ', 'ぐ', 'げ', 'ご'],
    's-series': ['さ', 'し', 'す', 'せ', 'そ'],
    'z-series': ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'],
    't-series': ['た', 'ち', 'つ', 'て', 'と'],
    'd-series': ['だ', 'ぢ', 'づ', 'で', 'ど'],
    'n-series': ['な', 'に', 'ぬ', 'ね', 'の'],
    'h-series': ['は', 'ひ', 'ふ', 'へ', 'ほ'],
    'b-series': ['ば', 'び', 'ぶ', 'べ', 'ぼ'],
    'p-series': ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'],
    'm-series': ['ま', 'み', 'む', 'め', 'も'],
    'y-series': ['や', 'ゆ', 'よ'],
    'r-series': ['ら', 'り', 'る', 'れ', 'ろ'],
    'w-series': ['わ', 'を', 'ん']
};

const DIFFICULTY_LEVELS = {
    beginner: ['あ', 'い', 'う', 'え', 'お'],
    intermediate: [
        ...HIRAGANA_FAMILIES.vowels,
        ...HIRAGANA_FAMILIES['k-series'],
        ...HIRAGANA_FAMILIES['s-series'],
        ...HIRAGANA_FAMILIES['t-series'],
        ...HIRAGANA_FAMILIES['n-series'],
        ...HIRAGANA_FAMILIES['h-series'],
        ...HIRAGANA_FAMILIES['m-series'],
        ...HIRAGANA_FAMILIES['y-series'],
        ...HIRAGANA_FAMILIES['r-series'],
        ...HIRAGANA_FAMILIES['w-series']
    ],
    advanced: HIRAGANA_DATA.map(item => item.hiragana)
};

// Conseils mnémotechniques pour chaque hiragana
const MNEMONICS = {
    'あ': 'Ressemble à un "A" avec une barre horizontale',
    'い': 'Deux traits verticaux comme "ii"',
    'う': 'Ressemble à un "u" avec une queue',
    'え': 'Comme un "e" retourné',
    'お': 'Ressemble à un "o" avec une croix',
    'か': 'Un couteau (knife) qui coupe - "ka"',
    'き': 'Une clé (key) - "ki"',
    'く': 'Un bec de canard qui fait "cou cou" - "ku"',
    'け': 'Un K majuscule - "ke"',
    'こ': 'Deux lignes parallèles - "ko"',
    'さ': 'Un samouraï avec son sabre - "sa"',
    'し': 'Un hameçon qui pêche - "shi"',
    'す': 'Un serpent qui siffle - "su"',
    'せ': 'Ressemble à "se" écrit rapidement',
    'そ': 'Un zigzag - "so"',
    'た': 'Un "t" avec une barre - "ta"',
    'ち': 'Un oiseau qui pépie "chi"',
    'つ': 'Un tsunami qui arrive - "tsu"',
    'て': 'Une main qui tend quelque chose - "te"',
    'と': 'Un clou (toe en anglais) - "to"',
    'な': 'Une croix avec une barre - "na"',
    'に': 'Deux traits qui se rejoignent - "ni"',
    'ぬ': 'Des nouilles qui pendent - "nu"',
    'ね': 'Un chat qui dort et ronfle - "ne"',
    'の': 'Un "no" en cursive',
    'は': 'Deux personnes qui dansent - "ha"',
    'ひ': 'Un sourire - "hi"',
    'ふ': 'Un mont Fuji - "fu"',
    'へ': 'Une montagne pointue - "he"',
    'ほ': 'Une maison avec un toit - "ho"',
    'ま': 'Un masque japonais - "ma"',
    'み': 'Trois lignes ondulées - "mi"',
    'む': 'Une vache qui fait "mu"',
    'め': 'Un œil avec des cils - "me"',
    'も': 'Plus de lignes courbes - "mo"',
    'や': 'Un homme qui court - "ya"',
    'ゆ': 'Un poisson unique - "yu"',
    'よ': 'Un yo-yo qui tombe - "yo"',
    'ら': 'Une note de musique "la"',
    'り': 'Une rivière qui coule - "ri"',
    'る': 'Une boucle qui tourne - "ru"',
    'れ': 'Un réveil qui sonne - "re"',
    'ろ': 'Une route qui tourne - "ro"',
    'わ': 'Un "wa" en cursive',
    'を': 'Un escargot - "wo"',
    'ん': 'Un "n" courbé'
};

// Système de badges
const BADGES = {
    'first-quiz': { name: '🎯 Premier Quiz', description: 'Compléter votre premier quiz' },
    'perfect-score': { name: '🌟 Score Parfait', description: 'Obtenir 100% à un quiz' },
    'speed-demon': { name: '⚡ Démon de Vitesse', description: 'Répondre en moins de 2 secondes en moyenne' },
    'survivor': { name: '💪 Survivant', description: 'Réussir 20 questions consécutives' },
    'vowel-master': { name: '🔤 Maître des Voyelles', description: 'Maîtriser toutes les voyelles' },
    'beginner-graduate': { name: '🎓 Diplômé Débutant', description: 'Compléter le niveau débutant' },
    'intermediate-graduate': { name: '📚 Diplômé Intermédiaire', description: 'Compléter le niveau intermédiaire' },
    'hiragana-master': { name: '👑 Maître Hiragana', description: 'Maîtriser tous les hiragana' },
    'quiz-addict': { name: '🎮 Accro aux Quiz', description: 'Compléter 50 quiz' },
    'perfectionist': { name: '💯 Perfectionniste', description: 'Obtenir 100% sur 10 quiz' }
};

// Fonction pour obtenir toutes les variantes acceptables d'un romanji
function getRomanjiVariants(romanji) {
    const variants = [romanji.toLowerCase()];
    if (ROMANJI_VARIANTS[romanji]) {
        variants.push(...ROMANJI_VARIANTS[romanji]);
    }
    return variants;
}

// Fonction pour vérifier si une réponse romanji est correcte
function isRomanjiCorrect(userAnswer, correctAnswer) {
    const userAnswerLower = userAnswer.toLowerCase().trim();
    const correctVariants = getRomanjiVariants(correctAnswer);
    return correctVariants.includes(userAnswerLower);
}

// Fonction pour mélanger un tableau (algorithme Fisher-Yates)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Fonction pour obtenir les hiragana selon la difficulté
function getHiraganaByDifficulty(level) {
    return DIFFICULTY_LEVELS[level] || DIFFICULTY_LEVELS.intermediate;
}

// Fonction pour obtenir les hiragana d'une famille
function getHiraganaByFamily(family) {
    if (family === 'all') return HIRAGANA_DATA.map(item => item.hiragana);
    return HIRAGANA_FAMILIES[family] || [];
}

// Fonction pour obtenir un conseil mnémotechnique
function getMnemonic(hiragana) {
    return MNEMONICS[hiragana] || 'Aucun conseil disponible pour ce caractère.';
}

// Fonction pour filtrer les données hiragana
function filterHiraganaData(hiraganaList) {
    return HIRAGANA_DATA.filter(item => hiraganaList.includes(item.hiragana));
}

// Génération de choix multiples
function generateMultipleChoices(correctAnswer, type, count = 3, availableHiraganaData = null) {
    const choices = [correctAnswer];
    
    // Utiliser les hiragana disponibles si fournis, sinon utiliser toute la base
    const sourceData = availableHiraganaData || HIRAGANA_DATA;
    const availableChoices = type === 'hiragana-to-romanji' 
        ? sourceData.map(item => item.romanji)
        : sourceData.map(item => item.hiragana);
    
    // Filtrer pour éviter les doublons avec la bonne réponse
    const filteredChoices = availableChoices.filter(choice => choice !== correctAnswer);
    
    // Si pas assez de choix dans les hiragana disponibles, compléter avec toute la base
    if (filteredChoices.length < count - 1) {
        const allChoices = type === 'hiragana-to-romanji' 
            ? HIRAGANA_DATA.map(item => item.romanji)
            : HIRAGANA_DATA.map(item => item.hiragana);
        
        const additionalChoices = allChoices.filter(choice => 
            choice !== correctAnswer && !filteredChoices.includes(choice)
        );
        
        filteredChoices.push(...additionalChoices);
    }
    
    // Ajouter des choix aléatoires
    while (choices.length < count && filteredChoices.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredChoices.length);
        const randomChoice = filteredChoices.splice(randomIndex, 1)[0];
        choices.push(randomChoice);
    }
    
    // Mélanger les choix
    return shuffleArray(choices);
}

// Calcul du niveau basé sur l'XP
function calculateLevel(xp) {
    // Formule: niveau = racine(XP / 100) + 1
    return Math.floor(Math.sqrt(xp / 100)) + 1;
}

// XP nécessaire pour le prochain niveau
function getXPForNextLevel(currentLevel) {
    return Math.pow(currentLevel, 2) * 100;
}

// Attribution d'XP basée sur la performance
function calculateXPGain(score, total, averageTime, difficulty) {
    let baseXP = score * 10; // 10 XP par bonne réponse
    
    // Bonus de difficulté
    const difficultyMultiplier = {
        beginner: 1,
        intermediate: 1.5,
        advanced: 2
    };
    baseXP *= difficultyMultiplier[difficulty] || 1;
    
    // Bonus de vitesse (si moins de 3 secondes en moyenne)
    if (averageTime < 3) {
        baseXP *= 1.5;
    }
    
    // Bonus de score parfait
    if (score === total) {
        baseXP *= 1.25;
    }
    
    return Math.round(baseXP);
}

// Export pour utilisation dans script.js et tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        HIRAGANA_DATA, 
        HIRAGANA_FAMILIES,
        DIFFICULTY_LEVELS,
        MNEMONICS,
        BADGES,
        ROMANJI_VARIANTS,
        getRomanjiVariants,
        isRomanjiCorrect, 
        shuffleArray,
        getHiraganaByDifficulty,
        getHiraganaByFamily,
        getMnemonic,
        filterHiraganaData,
        generateMultipleChoices,
        calculateLevel,
        getXPForNextLevel,
        calculateXPGain
    };
} else {
    // Variables globales pour le navigateur
    window.HIRAGANA_DATA = HIRAGANA_DATA;
    window.HIRAGANA_FAMILIES = HIRAGANA_FAMILIES;
    window.DIFFICULTY_LEVELS = DIFFICULTY_LEVELS;
    window.MNEMONICS = MNEMONICS;
    window.BADGES = BADGES;
    window.ROMANJI_VARIANTS = ROMANJI_VARIANTS;
    window.getRomanjiVariants = getRomanjiVariants;
    window.isRomanjiCorrect = isRomanjiCorrect;
    window.shuffleArray = shuffleArray;
    window.getHiraganaByDifficulty = getHiraganaByDifficulty;
    window.getHiraganaByFamily = getHiraganaByFamily;
    window.getMnemonic = getMnemonic;
    window.filterHiraganaData = filterHiraganaData;
    window.generateMultipleChoices = generateMultipleChoices;
    window.calculateLevel = calculateLevel;
    window.getXPForNextLevel = getXPForNextLevel;
    window.calculateXPGain = calculateXPGain;
}
