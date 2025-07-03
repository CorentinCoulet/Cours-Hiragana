// État global de l'application avec nouvelles fonctionnalités
class QuizApp {
    constructor() {
        this.currentQuizType = 'multiple-choice'; // Toujours en mode QCM
        this.currentGameMode = 'normal';
        this.currentDifficulty = 'intermediate';
        this.currentFamily = 'all';
        this.quizCount = 10;
        this.timeLimit = 10;
        
        this.currentQuiz = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.mistakes = [];
        this.currentStreak = 0;
        this.bestStreak = 0;
        this.questionStartTime = 0;
        this.responseTimes = [];
        this.isQuizActive = false;
        this.timer = null;
        this.timeRemaining = 0;
        
        // Système de progression
        this.userStats = this.loadUserStats();
        this.currentXP = this.userStats.totalXP || 0;
        this.userLevel = calculateLevel(this.currentXP);
        
        // Cartes mémoire
        this.currentCardIndex = 0;
        this.flashcardData = [];
        
        this.initializeElements();
        this.setupEventListeners();
        this.updateUserInterface();
    }
    
    initializeElements() {
        // Configuration
        this.configSection = document.getElementById('configSection');
        this.quizCountInput = document.getElementById('quizCount');
        this.timeLimitInput = document.getElementById('timeLimit');
        this.familySelect = document.getElementById('familyCheckboxes');
        this.familyCheckboxes = document.querySelectorAll('#familyCheckboxes input[type="checkbox"]');
        this.allFamiliesCheckbox = document.getElementById('allFamilies');
        this.startQuizBtn = document.getElementById('startQuizBtn');
        this.timedOptions = document.getElementById('timedOptions');
        
        // Boutons de sélection
        this.difficultyButtons = document.querySelectorAll('.difficulty-btn');
        this.gameModeButtons = document.querySelectorAll('.game-mode-btn');
        
        // Quiz - QCM uniquement
        this.quizSection = document.getElementById('quizSection');
        this.currentQuestionSpan = document.getElementById('currentQuestion');
        this.totalQuestionsSpan = document.getElementById('totalQuestions');
        this.scoreSpan = document.getElementById('score');
        this.timerDisplay = document.getElementById('timerDisplay');
        this.timeRemainingSpan = document.getElementById('timeRemaining');
        this.survivalStreak = document.getElementById('survivalStreak');
        this.streakCountSpan = document.getElementById('streakCount');
        this.questionTypeDiv = document.getElementById('questionType');
        this.questionDiv = document.getElementById('question');
        this.multipleChoice = document.getElementById('multipleChoice');
        this.choiceButtons = document.querySelectorAll('.choice-btn');
        this.feedbackDiv = document.getElementById('feedback');
        this.skipQuestionBtn = document.getElementById('skipQuestion');
        this.hintButton = document.getElementById('hintButton');
        this.quitQuizBtn = document.getElementById('quitQuiz');
        
        // Résultats
        this.resultsSection = document.getElementById('resultsSection');
        this.finalScoreSpan = document.getElementById('finalScore');
        this.finalTotalSpan = document.getElementById('finalTotal');
        this.scorePercentageSpan = document.getElementById('scorePercentage');
        this.averageTimeSpan = document.getElementById('averageTime');
        this.bestStreakSpan = document.getElementById('bestStreak');
        this.xpGainedSpan = document.getElementById('xpGained');
        this.performanceMessageDiv = document.getElementById('performanceMessage');
        this.badgesEarned = document.getElementById('badgesEarned');
        this.badgesList = document.getElementById('badgesList');
        this.newQuizBtn = document.getElementById('newQuizBtn');
        this.reviewMistakesBtn = document.getElementById('reviewMistakes');
        this.viewStatsBtn = document.getElementById('viewStatsBtn');
        
        // Révision et autres sections
        this.reviewSection = document.getElementById('reviewSection');
        this.mistakesListDiv = document.getElementById('mistakesList');
        this.backToResultsBtn = document.getElementById('backToResults');
        
        // Statistiques
        this.statsSection = document.getElementById('statsSection');
        this.userLevelSpan = document.getElementById('userLevel');
        this.currentXPSpan = document.getElementById('currentXP');
        this.nextLevelXPSpan = document.getElementById('nextLevelXP');
        this.xpProgress = document.getElementById('xpProgress');
        this.totalQuizzesSpan = document.getElementById('totalQuizzes');
        this.successRateSpan = document.getElementById('successRate');
        this.maxStreakSpan = document.getElementById('maxStreak');
        this.masteredCountSpan = document.getElementById('masteredCount');
        this.masteryGrid = document.getElementById('masteryGrid');
        this.resetStatsBtn = document.getElementById('resetStatsBtn');
        this.backFromStats = document.getElementById('backFromStats');
        
        // Menu et navigation
        this.mainMenu = document.getElementById('mainMenu');
        this.referenceBtn = document.getElementById('referenceBtn');
        this.flashcardsBtn = document.getElementById('flashcardsBtn');
        this.statsMenuBtn = document.getElementById('statsMenuBtn');
        
        // Tableau de référence
        this.referenceSection = document.getElementById('referenceSection');
        this.hiraganaTable = document.getElementById('hiraganaTable');
        this.backFromReference = document.getElementById('backFromReference');
        
        // Cartes mémoire
        this.flashcardsSection = document.getElementById('flashcardsSection');
        this.flashcard = document.getElementById('flashcard');
        this.prevCardBtn = document.getElementById('prevCard');
        this.flipCardBtn = document.getElementById('flipCard');
        this.nextCardBtn = document.getElementById('nextCard');
        this.cardProgress = document.getElementById('cardProgress');
        this.backFromFlashcards = document.getElementById('backFromFlashcards');
    }
    
    setupEventListeners() {
        // Configuration
        this.difficultyButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.selectDifficulty(e.target.dataset.level));
        });
        
        this.gameModeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.selectGameMode(e.target.dataset.mode));
        });
        
        this.familyCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => this.handleFamilySelection(e));
        });
        
        this.startQuizBtn.addEventListener('click', () => this.startQuiz());
        
        // Quiz - uniquement les choix multiples
        this.choiceButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => this.selectChoice(index));
        });
        
        this.skipQuestionBtn.addEventListener('click', () => this.skipQuestion());
        this.hintButton.addEventListener('click', () => this.showHint());
        this.quitQuizBtn.addEventListener('click', () => this.quitQuiz());
        
        // Résultats et navigation
        this.newQuizBtn.addEventListener('click', () => this.startNewQuiz());
        this.reviewMistakesBtn.addEventListener('click', () => this.showMistakesReview());
        this.viewStatsBtn.addEventListener('click', () => this.showStats());
        this.backToResultsBtn.addEventListener('click', () => this.backToResults());
        
        // Statistiques
        this.resetStatsBtn.addEventListener('click', () => this.resetStats());
        this.backFromStats.addEventListener('click', () => this.showSection('config'));
        
        // Menu principal
        this.referenceBtn.addEventListener('click', () => this.showReference());
        this.flashcardsBtn.addEventListener('click', () => this.showFlashcards());
        this.statsMenuBtn.addEventListener('click', () => this.showStats());
        
        // Navigation
        this.backFromReference.addEventListener('click', () => this.showSection('config'));
        this.backFromFlashcards.addEventListener('click', () => this.showSection('config'));
        
        // Cartes mémoire
        this.prevCardBtn.addEventListener('click', () => this.previousCard());
        this.flipCardBtn.addEventListener('click', () => this.flipCard());
        this.nextCardBtn.addEventListener('click', () => this.nextCard());
        this.flashcard.addEventListener('click', () => this.flipCard());
    }
    
    // Méthodes de sélection et configuration
    selectDifficulty(level) {
        this.currentDifficulty = level;
        this.setActiveButton(this.difficultyButtons, level, 'data-level');
        
        // Ajuster le nombre maximum selon la difficulté
        const maxCount = getHiraganaByDifficulty(level).length;
        this.quizCountInput.max = maxCount;
        if (parseInt(this.quizCountInput.value) > maxCount) {
            this.quizCountInput.value = maxCount;
        }
    }
    
    selectGameMode(mode) {
        this.currentGameMode = mode;
        this.setActiveButton(this.gameModeButtons, mode, 'data-mode');
        
        // Afficher/cacher les options du mode chronomètre
        this.toggleSection('timedOptions', mode === 'timed');
    }
    
    // Gestion du quiz
    startQuiz() {
        this.quizCount = parseInt(this.quizCountInput.value) || 10;
        this.timeLimit = parseInt(this.timeLimitInput.value) || 10;
        
        // Générer le quiz selon les paramètres
        this.generateQuiz();
        
        // Initialiser les variables du quiz
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.mistakes = [];
        this.currentStreak = 0;
        this.responseTimes = [];
        this.isQuizActive = true;
        
        // Afficher la section quiz
        this.showSection('quiz');
        
        // Configurer l'interface selon le mode
        this.setupQuizInterface();
        
        // Afficher la première question
        this.displayCurrentQuestion();
    }
    
    generateQuiz() {
        let availableHiragana = [];
        
        // Sélectionner selon la famille et la difficulté
        if (this.currentFamily === 'mistakes' && this.userStats.mistakes) {
            // Quiz basé sur les erreurs précédentes
            const mistakeCharacters = Object.keys(this.userStats.mistakes);
            availableHiragana = filterHiraganaData(mistakeCharacters);
        } else if (this.currentFamily === 'all') {
            // Selon la difficulté
            const difficultyHiragana = getHiraganaByDifficulty(this.currentDifficulty);
            availableHiragana = filterHiraganaData(difficultyHiragana);
        } else if (Array.isArray(this.currentFamily)) {
            // Sélection multiple de familles
            let combinedHiragana = [];
            this.currentFamily.forEach(family => {
                if (family === 'mistakes' && this.userStats.mistakes) {
                    const mistakeCharacters = Object.keys(this.userStats.mistakes);
                    combinedHiragana = combinedHiragana.concat(mistakeCharacters);
                } else if (family !== 'all') {
                    const familyHiragana = getHiraganaByFamily(family);
                    combinedHiragana = combinedHiragana.concat(familyHiragana);
                }
            });
            // Supprimer les doublons
            const uniqueHiragana = [...new Set(combinedHiragana)];
            availableHiragana = filterHiraganaData(uniqueHiragana);
        } else {
            // Famille spécifique
            const familyHiragana = getHiraganaByFamily(this.currentFamily);
            availableHiragana = filterHiraganaData(familyHiragana);
        }
        
        // Mélanger et prendre le nombre demandé avec répétitions possibles
        const shuffledHiragana = shuffleArray(availableHiragana);
        let baseQuiz = [];
        if (shuffledHiragana.length >= this.quizCount) {
            baseQuiz = shuffledHiragana.slice(0, this.quizCount);
        } else {
            while (baseQuiz.length < this.quizCount) {
                const remainingNeeded = this.quizCount - baseQuiz.length;
                if (remainingNeeded >= shuffledHiragana.length) {
                    baseQuiz = baseQuiz.concat(shuffleArray([...shuffledHiragana]));
                } else {
                    const extraShuffled = shuffleArray([...shuffledHiragana]);
                    baseQuiz = baseQuiz.concat(extraShuffled.slice(0, remainingNeeded));
                }
            }
        }
        // Générer un type de question aléatoire pour chaque item
        this.currentQuiz = baseQuiz.map(item => {
            const type = Math.random() < 0.5 ? 'hiragana-to-romanji' : 'romanji-to-hiragana';
            return { item, type };
        });
    }
    
    setupQuizInterface() {
        // Toujours en mode QCM
        const normalAnswerDiv = document.getElementById('normalAnswer');
        if (normalAnswerDiv) {
            normalAnswerDiv.classList.add('hidden');
        }
        this.multipleChoice.classList.remove('hidden');
        
        // Configuration selon le mode de jeu
        this.timerDisplay.classList.toggle('hidden', this.currentGameMode !== 'timed');
        this.survivalStreak.classList.toggle('hidden', this.currentGameMode !== 'survival');
    }
    
    displayCurrentQuestion() {
        if (this.currentQuestionIndex >= this.currentQuiz.length) {
            this.endQuiz();
            return;
        }
        const current = this.currentQuiz[this.currentQuestionIndex];
        const currentItem = current.item;
        const currentType = current.type;
        this.currentQuizType = currentType;
        // Mettre à jour les informations du quiz
        this.updateDisplay('currentQuestion', this.currentQuestionIndex + 1);
        this.updateDisplay('totalQuestions', this.quizCount);
        this.updateDisplay('score', this.score);
        this.updateDisplay('streakCount', this.currentStreak);
        // Affichage selon le type de question
        if (currentType === 'hiragana-to-romanji') {
            this.updateDisplay('questionType', 'Hiragana → Romanji (QCM)');
            this.updateDisplay('question', currentItem.hiragana);
        } else {
            this.updateDisplay('questionType', 'Romanji → Hiragana (QCM)');
            this.updateDisplay('question', currentItem.romanji);
        }
        // Configuration pour choix multiples (toujours actif)
        this.setupMultipleChoice(currentItem, currentType);
        // Réinitialiser le feedback
        this.hideFeedback();
        // Démarrer le timer si nécessaire
        this.questionStartTime = Date.now();
        if (this.currentGameMode === 'timed') {
            this.startTimer();
        }
    }
    
    setupMultipleChoice(currentItem, currentType = 'hiragana-to-romanji') {
        let correctAnswer, choices;
        const availableHiraganaData = this.currentQuiz.map(q => q.item);
        if (currentType === 'hiragana-to-romanji') {
            correctAnswer = currentItem.romanji;
            choices = generateMultipleChoices(correctAnswer, 'hiragana-to-romanji', 3, availableHiraganaData);
        } else {
            correctAnswer = currentItem.hiragana;
            choices = generateMultipleChoices(correctAnswer, 'romanji-to-hiragana', 3, availableHiraganaData);
        }
        // S'assurer que les choix sont uniques
        const uniqueChoices = Array.from(new Set(choices));
        // Si on a moins de 3 choix uniques, compléter avec d'autres distracteurs
        while (uniqueChoices.length < 3) {
            let pool;
            if (currentType === 'hiragana-to-romanji') {
                pool = HIRAGANA_DATA.map(item => item.romanji);
            } else {
                pool = HIRAGANA_DATA.map(item => item.hiragana);
            }
            // Exclure déjà présents
            const remaining = pool.filter(val => !uniqueChoices.includes(val) && val !== correctAnswer);
            if (remaining.length === 0) break;
            const extra = remaining[Math.floor(Math.random() * remaining.length)];
            uniqueChoices.push(extra);
        }
        // Ajouter la bonne réponse et mélanger
        if (!uniqueChoices.includes(correctAnswer)) uniqueChoices.push(correctAnswer);
        const finalChoices = shuffleArray(uniqueChoices).slice(0, 3);
        this.choiceButtons.forEach((btn, index) => {
            if (index < finalChoices.length) {
                btn.textContent = finalChoices[index];
                btn.classList.remove('correct', 'incorrect');
                btn.disabled = false;
                btn.dataset.answer = finalChoices[index];
                btn.style.display = 'block';
            } else {
                btn.style.display = 'none';
            }
        });
    }
    
    startTimer() {
        this.timeRemaining = this.timeLimit;
        this.updateTimerDisplay();
        
        this.timer = setInterval(() => {
            this.timeRemaining--;
            this.updateTimerDisplay();
            
            if (this.timeRemaining <= 0) {
                this.handleTimeOut();
            }
        }, 1000);
    }
    
    updateTimerDisplay() {
        this.timeRemainingSpan.textContent = this.timeRemaining;
        
        // Changer la couleur selon le temps restant
        if (this.timeRemaining <= 3) {
            this.timerDisplay.style.backgroundColor = 'var(--error-color)';
        } else if (this.timeRemaining <= 5) {
            this.timerDisplay.style.backgroundColor = 'var(--accent-color)';
        } else {
            this.timerDisplay.style.backgroundColor = 'var(--secondary-color)';
        }
    }
    
    handleTimeOut() {
        clearInterval(this.timer);
        this.skipQuestion();
    }
    
    selectChoice(choiceIndex) {
        if (!this.isQuizActive) return;
        
        const selectedButton = this.choiceButtons[choiceIndex];
        const userAnswer = selectedButton.dataset.answer;
        
        this.processAnswer(userAnswer, choiceIndex);
    }
    
    processAnswer(userAnswer, choiceIndex = null) {
        // Arrêter le timer
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        // Calculer le temps de réponse
        const responseTime = (Date.now() - this.questionStartTime) / 1000;
        this.responseTimes.push(responseTime);
        const current = this.currentQuiz[this.currentQuestionIndex];
        const currentItem = current.item;
        const currentType = current.type;
        let isCorrect = false;
        if (currentType === 'hiragana-to-romanji') {
            isCorrect = isRomanjiCorrect(userAnswer, currentItem.romanji);
        } else if (currentType === 'romanji-to-hiragana') {
            isCorrect = userAnswer === currentItem.hiragana;
        }
        
        // Afficher le feedback
        this.showFeedback(isCorrect, currentItem, userAnswer, choiceIndex, currentType);
        
        // Mettre à jour le score et les statistiques
        this.updateScore(isCorrect, currentItem, userAnswer, responseTime, currentType);
        
        // Délai adapté selon la réponse : rapide si correct, plus lent si incorrect
        const delay = isCorrect ? 300 : 1750; // 300ms si correct, 1750ms si incorrect
        
        setTimeout(() => {
            this.nextQuestion();
        }, delay);
    }
    
    updateScore(isCorrect, currentItem, userAnswer, responseTime, currentType) {
        if (isCorrect) {
            this.score++;
            this.currentStreak++;
            this.bestStreak = Math.max(this.bestStreak, this.currentStreak);
        } else {
            this.currentStreak = 0;
            this.mistakes.push({
                question: currentType === 'romanji-to-hiragana' ? currentItem.romanji : currentItem.hiragana,
                userAnswer: userAnswer,
                correctAnswer: currentType === 'romanji-to-hiragana' ? currentItem.hiragana : currentItem.romanji,
                type: currentType,
                responseTime: responseTime,
                hiragana: currentItem.hiragana
            });
            
            // Mode survie - fin du quiz en cas d'erreur
            if (this.currentGameMode === 'survival') {
                setTimeout(() => {
                    this.endQuiz();
                }, 1750); // Délai plus long pour laisser voir l'erreur en mode survie
                return;
            }
        }
        
        // Mettre à jour l'affichage
        this.scoreSpan.textContent = this.score;
        this.streakCountSpan.textContent = this.currentStreak;
    }
    
    showFeedback(isCorrect, currentItem, userAnswer, choiceIndex = null, currentType = 'hiragana-to-romanji') {
        this.feedbackDiv.classList.remove('hidden', 'correct', 'incorrect');
        if (isCorrect) {
            this.feedbackDiv.classList.add('correct');
            this.feedbackDiv.textContent = '✅ Correct !';
            if (choiceIndex !== null) {
                this.choiceButtons[choiceIndex].classList.add('correct');
            }
        } else {
            this.feedbackDiv.classList.add('incorrect');
            this.feedbackDiv.innerHTML = `❌ Incorrect.`;
            if (choiceIndex !== null) {
                this.choiceButtons[choiceIndex].classList.add('incorrect');
                // Trouver l'autre écriture correspondant à la réponse utilisateur
                let extra = '';
                if (currentType === 'hiragana-to-romanji') {
                    // On cherche le hiragana correspondant au romanji choisi
                    let userHiragana = '';
                    if (typeof HIRAGANA_DATA !== 'undefined') {
                        const found = HIRAGANA_DATA.find(item => item.romanji === userAnswer);
                        if (found) userHiragana = found.hiragana;
                    }
                    if (userHiragana) {
                        extra = `<div class='choice-extra'>${userHiragana}</div>`;
                    }
                } else {
                    // On cherche le romanji correspondant au hiragana choisi
                    let userRomanji = '';
                    if (typeof HIRAGANA_DATA !== 'undefined') {
                        const found = HIRAGANA_DATA.find(item => item.hiragana === userAnswer);
                        if (found) userRomanji = found.romanji;
                    }
                    if (userRomanji) {
                        extra = `<div class='choice-extra'>${userRomanji}</div>`;
                    }
                }
                // Ajouter l'autre écriture dans le bouton sélectionné
                if (extra) {
                    this.choiceButtons[choiceIndex].innerHTML = `${userAnswer}${extra}`;
                }
                this.choiceButtons.forEach(btn => {
                    btn.disabled = true;
                    // Remettre le texte normal pour les autres boutons
                    if (btn !== this.choiceButtons[choiceIndex]) {
                        btn.innerHTML = btn.textContent;
                    }
                });
                // Mettre en vert la bonne réponse
                let correctValue = (currentType === 'hiragana-to-romanji') ? currentItem.romanji : currentItem.hiragana;
                this.choiceButtons.forEach(btn => {
                    if (btn.dataset.answer === correctValue) {
                        btn.classList.add('correct');
                    }
                });
            }
        }
    }
    
    showHint() {
        const current = this.currentQuiz[this.currentQuestionIndex];
        const currentItem = current.item;
        const hint = getMnemonic(currentItem.hiragana);
        this.feedbackDiv.classList.remove('hidden', 'correct', 'incorrect');
        this.feedbackDiv.innerHTML = `💡 <strong>Indice :</strong> ${hint}`;
        this.feedbackDiv.style.background = '#e0f2fe';
        this.feedbackDiv.style.color = '#0277bd';
        this.feedbackDiv.style.border = '1px solid #0288d1';
    }
    
    hideFeedback() {
        this.feedbackDiv.classList.add('hidden');
        this.feedbackDiv.style.background = '';
        this.feedbackDiv.style.color = '';
        this.feedbackDiv.style.border = '';
    }
    
    skipQuestion() {
        if (!this.isQuizActive) return;
        
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        const currentItem = this.currentQuiz[this.currentQuestionIndex];
        const responseTime = (Date.now() - this.questionStartTime) / 1000;
        
        this.mistakes.push({
            question: this.currentQuizType === 'romanji-to-hiragana' ? currentItem.romanji : currentItem.hiragana,
            userAnswer: '(passé)',
            correctAnswer: this.currentQuizType === 'romanji-to-hiragana' ? currentItem.hiragana : currentItem.romanji,
            type: this.currentQuizType,
            responseTime: responseTime,
            hiragana: currentItem.hiragana
        });
        
        this.currentStreak = 0;
        this.responseTimes.push(responseTime);
        
        // Mode survie - fin du quiz si on passe
        if (this.currentGameMode === 'survival') {
            this.endQuiz();
            return;
        }
        
        this.nextQuestion();
    }
    
    nextQuestion() {
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex >= this.quizCount || 
            (this.currentGameMode === 'survival' && this.mistakes.length > 0)) {
            this.endQuiz();
        } else {
            this.displayCurrentQuestion();
        }
    }
    
    endQuiz() {
        this.isQuizActive = false;
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        // Calculer les statistiques finales
        this.calculateFinalStats();
        
        // Sauvegarder les statistiques
        this.saveUserStats();
        
        // Vérifier les badges
        this.checkBadges();
        
        this.showResults();
    }
    
    calculateFinalStats() {
        this.averageResponseTime = this.responseTimes.length > 0 
            ? this.responseTimes.reduce((a, b) => a + b, 0) / this.responseTimes.length 
            : 0;
        
        this.xpGained = calculateXPGain(
            this.score, 
            this.currentQuestionIndex, 
            this.averageResponseTime, 
            this.currentDifficulty
        );
        
        this.currentXP += this.xpGained;
        this.userLevel = calculateLevel(this.currentXP);
    }
    
    saveUserStats() {
        // Mettre à jour les statistiques utilisateur
        this.userStats.totalQuizzes = (this.userStats.totalQuizzes || 0) + 1;
        this.userStats.totalQuestions = (this.userStats.totalQuestions || 0) + this.currentQuestionIndex;
        this.userStats.totalCorrect = (this.userStats.totalCorrect || 0) + this.score;
        this.userStats.totalXP = this.currentXP;
        this.userStats.bestStreak = Math.max(this.userStats.bestStreak || 0, this.bestStreak);
        this.userStats.averageResponseTime = this.averageResponseTime;
        
        // Sauvegarder les erreurs pour le système de révision
        if (!this.userStats.mistakes) {
            this.userStats.mistakes = {};
        }
        
        this.mistakes.forEach(mistake => {
            const hiragana = mistake.hiragana;
            if (!this.userStats.mistakes[hiragana]) {
                this.userStats.mistakes[hiragana] = { errors: 0, attempts: 0 };
            }
            this.userStats.mistakes[hiragana].errors++;
            this.userStats.mistakes[hiragana].attempts++;
        });
        
        // Compter les tentatives réussies
        this.currentQuiz.forEach((item, index) => {
            if (index < this.currentQuestionIndex) {
                const hiragana = item.hiragana;
                if (!this.userStats.mistakes[hiragana]) {
                    this.userStats.mistakes[hiragana] = { errors: 0, attempts: 0 };
                }
                this.userStats.mistakes[hiragana].attempts++;
            }
        });
        
        // Sauvegarder dans localStorage
        localStorage.setItem('hiraganaQuizStats', JSON.stringify(this.userStats));
    }
    
    loadUserStats() {
        const saved = localStorage.getItem('hiraganaQuizStats');
        return saved ? JSON.parse(saved) : {};
    }
    
    checkBadges() {
        this.newBadges = [];
        
        if (!this.userStats.badges) {
            this.userStats.badges = [];
        }
        
        // Vérifier chaque badge
        if (!this.userStats.badges.includes('first-quiz') && this.userStats.totalQuizzes === 1) {
            this.newBadges.push('first-quiz');
        }
        
        if (!this.userStats.badges.includes('perfect-score') && this.score === this.currentQuestionIndex) {
            this.newBadges.push('perfect-score');
        }
        
        if (!this.userStats.badges.includes('speed-demon') && this.averageResponseTime < 2) {
            this.newBadges.push('speed-demon');
        }
        
        if (!this.userStats.badges.includes('survivor') && this.bestStreak >= 20) {
            this.newBadges.push('survivor');
        }
        
        if (!this.userStats.badges.includes('quiz-addict') && this.userStats.totalQuizzes >= 50) {
            this.newBadges.push('quiz-addict');
        }
        
        // Ajouter les nouveaux badges
        this.userStats.badges.push(...this.newBadges);
    }
    
    showResults() {
        const percentage = this.currentQuestionIndex > 0 
            ? Math.round((this.score / this.currentQuestionIndex) * 100) 
            : 0;
        
        this.finalScoreSpan.textContent = this.score;
        this.finalTotalSpan.textContent = this.currentQuestionIndex;
        this.scorePercentageSpan.textContent = `${percentage}%`;
        this.averageTimeSpan.textContent = `${this.averageResponseTime.toFixed(1)}s`;
        this.bestStreakSpan.textContent = this.bestStreak;
        this.xpGainedSpan.textContent = `+${this.xpGained} XP`;
        
        // Message de performance
        let message = '';
        if (this.currentGameMode === 'survival') {
            message = `🏃‍♂️ Mode Survie : ${this.score} bonnes réponses consécutives !`;
        } else if (percentage >= 90) {
            message = '🌟 Excellent ! Vous maîtrisez parfaitement ces hiragana !';
        } else if (percentage >= 75) {
            message = '👍 Très bien ! Encore quelques efforts et ce sera parfait !';
        } else if (percentage >= 60) {
            message = '📚 Bon travail ! Continuez à vous entraîner !';
        } else {
            message = '💪 Continuez vos efforts ! La pratique mène à la perfection !';
        }
        this.performanceMessageDiv.textContent = message;
        
        // Afficher les badges gagnés
        if (this.newBadges && this.newBadges.length > 0) {
            this.badgesEarned.classList.remove('hidden');
            this.badgesList.innerHTML = '';
            this.newBadges.forEach(badgeId => {
                const badge = BADGES[badgeId];
                const badgeElement = document.createElement('span');
                badgeElement.className = 'badge';
                badgeElement.textContent = badge.name;
                badgeElement.title = badge.description;
                this.badgesList.appendChild(badgeElement);
            });
        } else {
            this.badgesEarned.classList.add('hidden');
        }
        
        // Afficher ou cacher le bouton de révision
        if (this.mistakes.length > 0) {
            this.reviewMistakesBtn.style.display = 'inline-block';
        } else {
            this.reviewMistakesBtn.style.display = 'none';
        }
        
        this.showSection('results');
    }
    
    showMistakesReview() {
        this.mistakesListDiv.innerHTML = '';

        if (this.mistakes.length === 0) {
            this.mistakesListDiv.innerHTML = '<p>Aucune erreur ! Parfait ! 🎉</p>';
        } else {
            this.mistakes.forEach(mistake => {
                const mistakeDiv = document.createElement('div');
                mistakeDiv.className = 'mistake-item';

                const questionType = mistake.type === 'hiragana-to-romanji' ? 'Hiragana → Romanji' : 
                                   mistake.type === 'multiple-choice' ? 'Choix multiples' : 'Romanji → Hiragana';

                // Trouver l'hiragana correspondant à la réponse utilisateur si possible
                let userHiragana = '';
                if (mistake.type === 'hiragana-to-romanji' || mistake.type === 'multiple-choice') {
                    // On cherche dans HIRAGANA_DATA le hiragana dont le romanji correspond à la réponse utilisateur
                    if (typeof HIRAGANA_DATA !== 'undefined') {
                        const found = HIRAGANA_DATA.find(item => item.romanji === mistake.userAnswer);
                        if (found) userHiragana = found.hiragana;
                    }
                } else if (mistake.type === 'romanji-to-hiragana') {
                    userHiragana = mistake.userAnswer;
                }

                let userAnswerDisplay = mistake.userAnswer;
                if (userHiragana && userHiragana !== mistake.userAnswer) {
                    userAnswerDisplay += ` (${userHiragana})`;
                }

                mistakeDiv.innerHTML = `
                    <div class="mistake-question">${questionType}: ${mistake.question}</div>
                    <div class="mistake-answer">Votre réponse: ${userAnswerDisplay}</div>
                    <div class="correct-answer">Bonne réponse: ${mistake.correctAnswer}</div>
                    <div class="response-time">Temps: ${mistake.responseTime.toFixed(1)}s</div>
                `;
                
                this.mistakesListDiv.appendChild(mistakeDiv);
            });
        }

        this.showSection('review');
    }
    
    // Méthodes de navigation et utilitaires
    backToResults() {
        this.showSection('results');
    }
    
    quitQuiz() {
        this.isQuizActive = false;
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.showSection('config');
    }
    
    startNewQuiz() {
        this.showSection('config');
    }
    
    showStats() {
        this.updateStatsDisplay();
        this.showSection('stats');
    }
    
    updateStatsDisplay() {
        // Informations de niveau
        this.userLevelSpan.textContent = this.userLevel;
        this.currentXPSpan.textContent = this.currentXP;
        
        const nextLevelXP = getXPForNextLevel(this.userLevel);
        this.nextLevelXPSpan.textContent = nextLevelXP;
        
        const currentLevelXP = this.userLevel > 1 ? getXPForNextLevel(this.userLevel - 1) : 0;
        const progressXP = this.currentXP - currentLevelXP;
        const neededXP = nextLevelXP - currentLevelXP;
        const progressPercentage = (progressXP / neededXP) * 100;
        
        this.xpProgress.style.width = `${progressPercentage}%`;
        
        // Statistiques générales
        this.totalQuizzesSpan.textContent = this.userStats.totalQuizzes || 0;
        
        const successRate = this.userStats.totalQuestions > 0 
            ? Math.round((this.userStats.totalCorrect / this.userStats.totalQuestions) * 100)
            : 0;
        this.successRateSpan.textContent = `${successRate}%`;
        
        this.maxStreakSpan.textContent = this.userStats.bestStreak || 0;
        
        // Compter les hiragana maîtrisés (taux de réussite > 80%)
        let masteredCount = 0;
        if (this.userStats.mistakes) {
            Object.values(this.userStats.mistakes).forEach(data => {
                const successRate = ((data.attempts - data.errors) / data.attempts) * 100;
                if (successRate >= 80) masteredCount++;
            });
        }
        this.masteredCountSpan.textContent = masteredCount;
        
        // Grille de maîtrise
        this.updateMasteryGrid();
    }
    
    updateMasteryGrid() {
        this.masteryGrid.innerHTML = '';
        
        HIRAGANA_DATA.forEach(item => {
            const masteryItem = document.createElement('div');
            masteryItem.className = 'mastery-item';
            masteryItem.textContent = item.hiragana;
            
            let successRate = 100;
            if (this.userStats.mistakes && this.userStats.mistakes[item.hiragana]) {
                const data = this.userStats.mistakes[item.hiragana];
                successRate = ((data.attempts - data.errors) / data.attempts) * 100;
            }
            
            masteryItem.dataset.successRate = `${Math.round(successRate)}%`;
            
            if (successRate >= 90) {
                masteryItem.classList.add('mastered');
            } else if (successRate >= 70) {
                masteryItem.classList.add('advanced');
            } else if (successRate >= 50) {
                masteryItem.classList.add('intermediate');
            } else {
                masteryItem.classList.add('beginner');
            }
            
            this.masteryGrid.appendChild(masteryItem);
        });
    }
    
    resetStats() {
        if (confirm('Êtes-vous sûr de vouloir réinitialiser toutes vos statistiques ? Cette action est irréversible.')) {
            localStorage.removeItem('hiraganaQuizStats');
            this.userStats = {};
            this.currentXP = 0;
            this.userLevel = 1;
            this.updateStatsDisplay();
            this.updateUserInterface();
        }
    }
    
    showReference() {
        this.createReferenceTable();
        this.showSection('reference');
    }
    
    createReferenceTable() {
        this.hiraganaTable.innerHTML = '';
        
        HIRAGANA_DATA.forEach(item => {
            const refItem = document.createElement('div');
            refItem.className = 'hiragana-ref-item';
            refItem.innerHTML = `
                <span class="ref-hiragana">${item.hiragana}</span>
                <span class="ref-romanji">${item.romanji}</span>
            `;
            
            // Ajouter un événement pour jouer le son (futur)
            refItem.addEventListener('click', () => {
                // Audio feedback could be added here in the future
            });
            
            this.hiraganaTable.appendChild(refItem);
        });
    }
    
    showFlashcards() {
        this.setupFlashcards();
        this.showSection('flashcards');
    }
    
    setupFlashcards() {
        // Utiliser tous les hiragana ou selon la difficulté
        const hiraganaList = getHiraganaByDifficulty(this.currentDifficulty);
        this.flashcardData = filterHiraganaData(hiraganaList);
        this.currentCardIndex = 0;
        this.updateFlashcard();
    }
    
    updateFlashcard() {
        if (this.flashcardData.length === 0) return;
        
        const currentCard = this.flashcardData[this.currentCardIndex];
        
        // Mettre à jour le contenu
        document.querySelector('.card-character').textContent = currentCard.hiragana;
        document.querySelector('.card-romanji').textContent = currentCard.romanji;
        
        // Mettre à jour la progression
        this.cardProgress.textContent = `${this.currentCardIndex + 1} / ${this.flashcardData.length}`;
        
        // Réinitialiser l'état retourné
        this.flashcard.classList.remove('flipped');
    }
    
    flipCard() {
        this.flashcard.classList.toggle('flipped');
    }
    
    nextCard() {
        this.currentCardIndex = (this.currentCardIndex + 1) % this.flashcardData.length;
        this.updateFlashcard();
    }
    
    previousCard() {
        this.currentCardIndex = this.currentCardIndex === 0 
            ? this.flashcardData.length - 1 
            : this.currentCardIndex - 1;
        this.updateFlashcard();
    }
    
    showSection(sectionName) {
        // Cacher toutes les sections
        const sections = [
            this.configSection, this.quizSection, this.resultsSection, 
            this.reviewSection, this.statsSection, this.referenceSection, 
            this.flashcardsSection
        ];
        
        sections.forEach(section => {
            if (section) section.classList.add('hidden');
        });
        
        // Afficher la section demandée
        switch (sectionName) {
            case 'config':
                this.configSection.classList.remove('hidden');
                break;
            case 'quiz':
                this.quizSection.classList.remove('hidden');
                break;
            case 'results':
                this.resultsSection.classList.remove('hidden');
                break;
            case 'review':
                this.reviewSection.classList.remove('hidden');
                break;
            case 'stats':
                this.statsSection.classList.remove('hidden');
                break;
            case 'reference':
                this.referenceSection.classList.remove('hidden');
                break;
            case 'flashcards':
                this.flashcardsSection.classList.remove('hidden');
                break;
        }
    }
    
    updateUserInterface() {
        // Mettre à jour l'interface avec les données utilisateur actuelles
        // Ici on pourrait ajouter des éléments visuels basés sur le niveau, etc.
    }
    
    handleFamilySelection(event) {
        const checkbox = event.target;
        
        // Si on coche "Tous les hiragana", décocher les autres
        if (checkbox.value === 'all' && checkbox.checked) {
            this.familyCheckboxes.forEach(cb => {
                if (cb.value !== 'all') {
                    cb.checked = false;
                }
            });
            this.currentFamily = 'all';
        } 
        // Si on coche autre chose, décocher "Tous les hiragana"
        else if (checkbox.value !== 'all' && checkbox.checked) {
            this.allFamiliesCheckbox.checked = false;
            this.updateCurrentFamily();
        }
        // Si on décoche quelque chose
        else if (!checkbox.checked) {
            this.updateCurrentFamily();
            
            // Si plus rien n'est sélectionné, cocher "Tous les hiragana"
            const hasSelection = Array.from(this.familyCheckboxes).some(cb => cb.checked);
            if (!hasSelection) {
                this.allFamiliesCheckbox.checked = true;
                this.currentFamily = 'all';
            }
        }
    }
    
    updateCurrentFamily() {
        const selectedFamilies = Array.from(this.familyCheckboxes)
            .filter(cb => cb.checked && cb.value !== 'all')
            .map(cb => cb.value);
            
        if (selectedFamilies.length === 0) {
            this.currentFamily = 'all';
        } else if (selectedFamilies.length === 1) {
            this.currentFamily = selectedFamilies[0];
        } else {
            this.currentFamily = selectedFamilies;
        }
    }
    
    // Méthodes utilitaires
    toggleSection(sectionId, show = true) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.toggle('hidden', !show);
        }
    }
    
    updateDisplay(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = value;
        }
    }
    
    setActiveButton(buttons, activeDataValue, dataAttribute = 'data-level') {
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute(dataAttribute) === activeDataValue);
        });
    }
}

// Initialiser l'application quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    window.quizApp = new QuizApp();
});


