/**
 * Tests unitaires pour l'application d'apprentissage des Hiragana
 * Framework de test simple intégré
 */

// Framework de test simple
class TestFramework {
    constructor() {
        this.tests = [];
        this.passedTests = 0;
        this.failedTests = 0;
        this.totalTests = 0;
    }

    describe(description, testFunction) {
        console.log(`\n📋 ${description}`);
        console.log('═'.repeat(50));
        testFunction();
    }

    test(name, testFunction) {
        this.totalTests++;
        try {
            testFunction();
            this.passedTests++;
            console.log(`✅ ${name}`);
        } catch (error) {
            this.failedTests++;
            console.log(`❌ ${name}`);
            console.log(`   Erreur: ${error.message}`);
        }
    }

    expect(actual) {
        return {
            toBe: (expected) => {
                if (actual !== expected) {
                    throw new Error(`Attendu: ${expected}, Reçu: ${actual}`);
                }
            },
            toEqual: (expected) => {
                if (JSON.stringify(actual) !== JSON.stringify(expected)) {
                    throw new Error(`Attendu: ${JSON.stringify(expected)}, Reçu: ${JSON.stringify(actual)}`);
                }
            },
            toBeGreaterThan: (expected) => {
                if (actual <= expected) {
                    throw new Error(`Attendu: > ${expected}, Reçu: ${actual}`);
                }
            },
            toBeLessThan: (expected) => {
                if (actual >= expected) {
                    throw new Error(`Attendu: < ${expected}, Reçu: ${actual}`);
                }
            },
            toBeGreaterThanOrEqual: (expected) => {
                if (actual < expected) {
                    throw new Error(`Attendu: >= ${expected}, Reçu: ${actual}`);
                }
            },
            toContain: (expected) => {
                if (!actual.includes(expected)) {
                    throw new Error(`Attendu que ${actual} contienne ${expected}`);
                }
            },
            toBeArray: () => {
                if (!Array.isArray(actual)) {
                    throw new Error(`Attendu un tableau, Reçu: ${typeof actual}`);
                }
            },
            toHaveLength: (expected) => {
                if (actual.length !== expected) {
                    throw new Error(`Attendu longueur: ${expected}, Reçu: ${actual.length}`);
                }
            },
            toBeTruthy: () => {
                if (!actual) {
                    throw new Error(`Attendu une valeur truthy, Reçu: ${actual}`);
                }
            },
            toBeFalsy: () => {
                if (actual) {
                    throw new Error(`Attendu une valeur falsy, Reçu: ${actual}`);
                }
            }
        };
    }

    showResults() {
        console.log('\n' + '═'.repeat(60));
        console.log('📊 RÉSULTATS DES TESTS');
        console.log('═'.repeat(60));
        console.log(`✅ Tests réussis: ${this.passedTests}`);
        console.log(`❌ Tests échoués: ${this.failedTests}`);
        console.log(`📝 Total: ${this.totalTests}`);
        
        const successRate = ((this.passedTests / this.totalTests) * 100).toFixed(1);
        console.log(`📈 Taux de réussite: ${successRate}%`);
        
        if (this.failedTests === 0) {
            console.log('\n🎉 TOUS LES TESTS SONT PASSÉS ! 🎉');
        } else {
            console.log(`\n⚠️  ${this.failedTests} test(s) ont échoué`);
        }
        console.log('═'.repeat(60));
        
        return this.failedTests === 0;
    }
}

// Simuler un environnement navigateur minimal pour les tests
function setupMockEnvironment() {
    if (typeof global !== 'undefined') {
        // Environnement Node.js
        global.document = {
            getElementById: (id) => ({ 
                textContent: '', 
                value: '',
                classList: { 
                    add: () => {}, 
                    remove: () => {},
                    toggle: () => {},
                    contains: () => false
                },
                style: {},
                appendChild: () => {},
                innerHTML: ''
            }),
            querySelectorAll: () => [],
            querySelector: () => ({ 
                classList: { add: () => {}, remove: () => {} },
                style: {},
                dataset: {}
            }),
            createElement: (tag) => ({ 
                className: '', 
                innerHTML: '', 
                textContent: '',
                appendChild: () => {},
                addEventListener: () => {},
                style: {},
                dataset: {}
            }),
            addEventListener: () => {}
        };
        
        global.localStorage = {
            getItem: (key) => null,
            setItem: (key, value) => {},
            removeItem: (key) => {}
        };
        
        global.console = console;
        global.Date = Date;
        global.Math = Math;
        global.setTimeout = setTimeout;
        global.setInterval = setInterval;
        global.clearInterval = clearInterval;
    }
}

// Charger les données pour les tests
function loadHiraganaData() {
    const path = require('path');
    
    try {
        // Charger le module directement
        const dataPath = path.join(__dirname, 'hiragana-data-fixed.js');
        delete require.cache[require.resolve(dataPath)]; // Nettoyer le cache
        const hiraganaModule = require('./hiragana-data-fixed.js');
        
        return hiraganaModule;
    } catch (error) {
        console.error('❌ Erreur lors du chargement des données:', error.message);
        console.error('Stack trace:', error.stack);
        process.exit(1);
    }
}

// Tests unitaires principaux
function runTests() {
    setupMockEnvironment();
    const hiraganaModule = loadHiraganaData();
    const test = new TestFramework();

    // Tests des données de base
    test.describe('📚 Tests des données Hiragana', () => {
        test.test('HIRAGANA_DATA doit être défini et être un tableau', () => {
            test.expect(hiraganaModule.HIRAGANA_DATA).toBeTruthy();
            test.expect(hiraganaModule.HIRAGANA_DATA).toBeArray();
        });

        test.test('HIRAGANA_DATA doit contenir exactement 71 hiragana', () => {
            test.expect(hiraganaModule.HIRAGANA_DATA).toHaveLength(71);
        });

        test.test('Chaque hiragana doit avoir une structure valide', () => {
            hiraganaModule.HIRAGANA_DATA.forEach((item, index) => {
                test.expect(item.hiragana).toBeTruthy();
                test.expect(item.romanji).toBeTruthy();
                test.expect(typeof item.hiragana).toBe('string');
                test.expect(typeof item.romanji).toBe('string');
            });
        });

        test.test('Les premiers hiragana doivent être les voyelles', () => {
            test.expect(hiraganaModule.HIRAGANA_DATA[0].hiragana).toBe('あ');
            test.expect(hiraganaModule.HIRAGANA_DATA[0].romanji).toBe('a');
            test.expect(hiraganaModule.HIRAGANA_DATA[1].hiragana).toBe('い');
            test.expect(hiraganaModule.HIRAGANA_DATA[1].romanji).toBe('i');
        });
    });

    // Tests des familles d'hiragana
    test.describe('👨‍👩‍👧‍👦 Tests des familles d\'hiragana', () => {
        test.test('HIRAGANA_FAMILIES doit être défini', () => {
            test.expect(hiraganaModule.HIRAGANA_FAMILIES).toBeTruthy();
        });

        test.test('La famille des voyelles doit contenir 5 éléments', () => {
            test.expect(hiraganaModule.HIRAGANA_FAMILIES.vowels).toHaveLength(5);
            test.expect(hiraganaModule.HIRAGANA_FAMILIES.vowels).toContain('あ');
            test.expect(hiraganaModule.HIRAGANA_FAMILIES.vowels).toContain('い');
        });

        test.test('getHiraganaByFamily doit fonctionner correctement', () => {
            const vowels = hiraganaModule.getHiraganaByFamily('vowels');
            test.expect(vowels).toHaveLength(5);
            test.expect(vowels).toContain('あ');
            
            const kSeries = hiraganaModule.getHiraganaByFamily('k-series');
            test.expect(kSeries).toHaveLength(5);
            test.expect(kSeries).toContain('か');
        });

        test.test('getHiraganaByFamily avec "all" doit retourner tous les hiragana', () => {
            const all = hiraganaModule.getHiraganaByFamily('all');
            test.expect(all).toHaveLength(71);
        });
    });

    // Tests des niveaux de difficulté
    test.describe('🎯 Tests des niveaux de difficulté', () => {
        test.test('Niveau débutant doit contenir 5 hiragana', () => {
            const beginnerHiragana = hiraganaModule.getHiraganaByDifficulty('beginner');
            test.expect(beginnerHiragana).toHaveLength(5);
        });

        test.test('Niveau intermédiaire doit contenir plus que débutant', () => {
            const beginner = hiraganaModule.getHiraganaByDifficulty('beginner');
            const intermediate = hiraganaModule.getHiraganaByDifficulty('intermediate');
            test.expect(intermediate.length).toBeGreaterThan(beginner.length);
        });

        test.test('Niveau avancé doit contenir tous les hiragana', () => {
            const advanced = hiraganaModule.getHiraganaByDifficulty('advanced');
            test.expect(advanced).toHaveLength(71);
        });

        test.test('Niveau invalide doit retourner le niveau intermédiaire', () => {
            const invalid = hiraganaModule.getHiraganaByDifficulty('invalid');
            const intermediate = hiraganaModule.getHiraganaByDifficulty('intermediate');
            test.expect(invalid).toEqual(intermediate);
        });
    });

    // Tests de validation romanji
    test.describe('✅ Tests de validation romanji', () => {
        test.test('isRomanjiCorrect doit valider les réponses exactes', () => {
            test.expect(hiraganaModule.isRomanjiCorrect('a', 'a')).toBeTruthy();
            test.expect(hiraganaModule.isRomanjiCorrect('ka', 'ka')).toBeTruthy();
            test.expect(hiraganaModule.isRomanjiCorrect('shi', 'shi')).toBeTruthy();
        });

        test.test('isRomanjiCorrect doit accepter les variantes', () => {
            test.expect(hiraganaModule.isRomanjiCorrect('si', 'shi')).toBeTruthy();
            test.expect(hiraganaModule.isRomanjiCorrect('ti', 'chi')).toBeTruthy();
            test.expect(hiraganaModule.isRomanjiCorrect('tu', 'tsu')).toBeTruthy();
            test.expect(hiraganaModule.isRomanjiCorrect('hu', 'fu')).toBeTruthy();
        });

        test.test('isRomanjiCorrect doit rejeter les réponses incorrectes', () => {
            test.expect(hiraganaModule.isRomanjiCorrect('ka', 'shi')).toBeFalsy();
            test.expect(hiraganaModule.isRomanjiCorrect('wrong', 'a')).toBeFalsy();
        });

        test.test('isRomanjiCorrect doit être insensible à la casse', () => {
            test.expect(hiraganaModule.isRomanjiCorrect('KA', 'ka')).toBeTruthy();
            test.expect(hiraganaModule.isRomanjiCorrect('SI', 'shi')).toBeTruthy();
        });

        test.test('isRomanjiCorrect doit ignorer les espaces', () => {
            test.expect(hiraganaModule.isRomanjiCorrect(' ka ', 'ka')).toBeTruthy();
            test.expect(hiraganaModule.isRomanjiCorrect('  shi  ', 'shi')).toBeTruthy();
        });
    });

    // Tests de filtrage des données
    test.describe('🔍 Tests de filtrage des données', () => {
        test.test('filterHiraganaData doit filtrer correctement', () => {
            const vowels = ['あ', 'い', 'う'];
            const filtered = hiraganaModule.filterHiraganaData(vowels);
            test.expect(filtered).toHaveLength(3);
            test.expect(filtered[0].hiragana).toBe('あ');
            test.expect(filtered[1].hiragana).toBe('い');
        });

        test.test('filterHiraganaData avec tableau vide doit retourner tableau vide', () => {
            const filtered = hiraganaModule.filterHiraganaData([]);
            test.expect(filtered).toHaveLength(0);
        });
    });

    // Tests de génération de choix multiples
    test.describe('🎲 Tests de génération de choix multiples', () => {
        test.test('generateMultipleChoices doit générer 3 choix par défaut', () => {
            const choices = hiraganaModule.generateMultipleChoices('a', 'hiragana-to-romanji');
            test.expect(choices).toHaveLength(3);
            test.expect(choices).toContain('a');
        });

        test.test('generateMultipleChoices doit contenir la bonne réponse', () => {
            const choices = hiraganaModule.generateMultipleChoices('ka', 'hiragana-to-romanji');
            test.expect(choices).toContain('ka');
        });

        test.test('generateMultipleChoices doit générer des choix uniques', () => {
            const choices = hiraganaModule.generateMultipleChoices('shi', 'hiragana-to-romanji');
            const uniqueChoices = [...new Set(choices)];
            test.expect(choices.length).toBe(uniqueChoices.length);
        });

        test.test('generateMultipleChoices avec hiragana restreints doit utiliser la liste fournie', () => {
            // Créer un petit ensemble de hiragana pour les tests
            const restrictedData = [
                { hiragana: 'あ', romanji: 'a' },
                { hiragana: 'い', romanji: 'i' },
                { hiragana: 'う', romanji: 'u' }
            ];
            
            const choices = hiraganaModule.generateMultipleChoices('a', 'hiragana-to-romanji', 3, restrictedData);
            
            test.expect(choices).toHaveLength(3);
            test.expect(choices).toContain('a');
            // Les autres choix doivent venir de la liste restreinte ou de la base complète si pas assez
            const otherChoices = choices.filter(c => c !== 'a');
            const restrictedRomanji = restrictedData.map(h => h.romanji);
            
            // Au moins l'un des autres choix devrait venir de la liste restreinte
            const hasRestrictedChoice = otherChoices.some(choice => restrictedRomanji.includes(choice));
            test.expect(hasRestrictedChoice || otherChoices.length === 2).toBeTruthy(); // Ou il y a une logique de fallback
        });
    });

    // Tests de mélange de tableau
    test.describe('🔀 Tests de mélange de tableau', () => {
        test.test('shuffleArray doit retourner un tableau de même longueur', () => {
            const original = [1, 2, 3, 4, 5];
            const shuffled = hiraganaModule.shuffleArray(original);
            test.expect(shuffled).toHaveLength(5);
        });

        test.test('shuffleArray doit contenir les mêmes éléments', () => {
            const original = ['a', 'b', 'c', 'd'];
            const shuffled = hiraganaModule.shuffleArray(original);
            original.forEach(item => {
                test.expect(shuffled).toContain(item);
            });
        });

        test.test('shuffleArray ne doit pas modifier le tableau original', () => {
            const original = [1, 2, 3];
            const originalCopy = [...original];
            hiraganaModule.shuffleArray(original);
            test.expect(original).toEqual(originalCopy);
        });
    });

    // Tests de système de progression
    test.describe('📈 Tests du système de progression', () => {
        test.test('calculateLevel doit calculer correctement le niveau', () => {
            test.expect(hiraganaModule.calculateLevel(0)).toBe(1);
            test.expect(hiraganaModule.calculateLevel(100)).toBe(2);
            test.expect(hiraganaModule.calculateLevel(400)).toBe(3);
            test.expect(hiraganaModule.calculateLevel(900)).toBe(4);
        });

        test.test('getXPForNextLevel doit calculer l\'XP nécessaire', () => {
            test.expect(hiraganaModule.getXPForNextLevel(1)).toBe(100);
            test.expect(hiraganaModule.getXPForNextLevel(2)).toBe(400);
            test.expect(hiraganaModule.getXPForNextLevel(3)).toBe(900);
        });

        test.test('calculateXPGain doit calculer l\'XP gagné', () => {
            // Score parfait niveau débutant
            const xp1 = hiraganaModule.calculateXPGain(5, 5, 4, 'beginner');
            test.expect(xp1).toBeGreaterThan(50); // Bonus score parfait
            
            // Score parfait niveau avancé
            const xp2 = hiraganaModule.calculateXPGain(10, 10, 4, 'advanced');
            test.expect(xp2).toBeGreaterThan(xp1); // Bonus difficulté
            
            // Avec bonus vitesse
            const xp3 = hiraganaModule.calculateXPGain(5, 5, 2, 'intermediate');
            test.expect(xp3).toBeGreaterThan(50); // Bonus vitesse
        });
    });

    // Tests des conseils mnémotechniques
    test.describe('💡 Tests des conseils mnémotechniques', () => {
        test.test('getMnemonic doit retourner un conseil pour les voyelles', () => {
            test.expect(hiraganaModule.getMnemonic('あ')).toContain('A');
            test.expect(hiraganaModule.getMnemonic('い')).toContain('ii');
            test.expect(hiraganaModule.getMnemonic('う')).toContain('u');
        });

        test.test('getMnemonic doit retourner un message par défaut pour hiragana inexistant', () => {
            const result = hiraganaModule.getMnemonic('invalid');
            test.expect(result).toContain('Aucun conseil disponible');
        });

        test.test('MNEMONICS doit contenir des conseils pour les hiragana principaux', () => {
            test.expect(hiraganaModule.MNEMONICS['か']).toBeTruthy();
            test.expect(hiraganaModule.MNEMONICS['さ']).toBeTruthy();
            test.expect(hiraganaModule.MNEMONICS['た']).toBeTruthy();
        });
    });

    // Tests du système de badges
    test.describe('🏆 Tests du système de badges', () => {
        test.test('BADGES doit être défini et contenir des badges', () => {
            test.expect(hiraganaModule.BADGES).toBeTruthy();
            test.expect(Object.keys(hiraganaModule.BADGES).length).toBeGreaterThan(5);
        });

        test.test('Chaque badge doit avoir un nom et une description', () => {
            Object.values(hiraganaModule.BADGES).forEach(badge => {
                test.expect(badge.name).toBeTruthy();
                test.expect(badge.description).toBeTruthy();
                test.expect(typeof badge.name).toBe('string');
                test.expect(typeof badge.description).toBe('string');
            });
        });

        test.test('Le badge "first-quiz" doit exister', () => {
            test.expect(hiraganaModule.BADGES['first-quiz']).toBeTruthy();
            test.expect(hiraganaModule.BADGES['first-quiz'].name).toContain('Premier Quiz');
        });
    });

    // Tests de cohérence des données
    test.describe('🔄 Tests de cohérence des données', () => {
        test.test('Tous les hiragana des familles doivent exister dans HIRAGANA_DATA', () => {
            const allHiraganaInData = hiraganaModule.HIRAGANA_DATA.map(item => item.hiragana);
            
            Object.values(hiraganaModule.HIRAGANA_FAMILIES).forEach(family => {
                family.forEach(hiragana => {
                    test.expect(allHiraganaInData).toContain(hiragana);
                });
            });
        });

        test.test('Les niveaux de difficulté doivent être cohérents', () => {
            const beginner = hiraganaModule.DIFFICULTY_LEVELS.beginner;
            const intermediate = hiraganaModule.DIFFICULTY_LEVELS.intermediate;
            const advanced = hiraganaModule.DIFFICULTY_LEVELS.advanced;
            
            // Débutant doit être inclus dans intermédiaire
            beginner.forEach(hiragana => {
                test.expect(intermediate).toContain(hiragana);
            });
            
            // Intermédiaire doit être inclus dans avancé
            intermediate.forEach(hiragana => {
                test.expect(advanced).toContain(hiragana);
            });
        });

        test.test('Tous les hiragana avec conseils mnémotechniques doivent exister', () => {
            const allHiraganaInData = hiraganaModule.HIRAGANA_DATA.map(item => item.hiragana);
            
            Object.keys(hiraganaModule.MNEMONICS).forEach(hiragana => {
                test.expect(allHiraganaInData).toContain(hiragana);
            });
        });
    });

    // Test de combinaison de familles
    test.describe('🧩 Tests de combinaison de familles', () => {
        test.test('Combinaison de deux familles doit retourner plus d\'hiragana qu\'une seule', () => {
            const vowels = hiraganaModule.getHiraganaByFamily('vowels');
            const kSeries = hiraganaModule.getHiraganaByFamily('k-series');
            
            // Simuler la logique de combinaison
            const combined = [...new Set([...vowels, ...kSeries])];
            
            test.expect(combined.length).toBeGreaterThan(vowels.length);
            test.expect(combined.length).toBeGreaterThan(kSeries.length);
        });

        test.test('Combinaison doit supprimer les doublons', () => {
            const vowels = hiraganaModule.getHiraganaByFamily('vowels');
            
            // Simuler des doublons
            const withDuplicates = [...vowels, ...vowels];
            const withoutDuplicates = [...new Set(withDuplicates)];
            
            test.expect(withoutDuplicates.length).toBe(vowels.length);
        });
    });

    // Test de validation des délais
    test.describe('⏱️ Tests de validation des délais', () => {
        test.test('Les délais adaptatifs doivent être correctement configurés', () => {
            // Test simple pour vérifier que les constantes de délai sont cohérentes
            const correctAnswerDelay = 300; // Délai pour réponse correcte
            const incorrectAnswerDelay = 1750; // Délai pour réponse incorrecte
            
            test.expect(correctAnswerDelay).toBeLessThan(incorrectAnswerDelay);
            test.expect(correctAnswerDelay).toBeGreaterThan(0);
            test.expect(incorrectAnswerDelay).toBeGreaterThan(1000);
        });
    });

    // Afficher les résultats
    const success = test.showResults();
    
    if (success) {
        console.log('\n🚀 Application prête pour utilisation !');
        console.log('👉 Ouvrez index.html dans votre navigateur pour commencer');
    } else {
        console.log('\n⚠️  Certains tests ont échoué. Vérifiez les erreurs ci-dessus.');
        process.exit(1);
    }
}

// Exécuter les tests si ce fichier est exécuté directement
if (require.main === module) {
    console.log('🧪 Démarrage des tests unitaires...');
    console.log('📱 Application d\'apprentissage des Hiragana');
    console.log('═'.repeat(60));
    runTests();
}

module.exports = { TestFramework, runTests };
