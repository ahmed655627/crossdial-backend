# Multi-Language Puzzle Data
# Supports: English, Italian, Spanish, French, German, Portuguese, Dutch, Arabic, Hindi, Japanese, Korean, Chinese

LANGUAGE_CONFIG = {
    "en": {"name": "English", "flag": "🇺🇸", "direction": "ltr"},
    "it": {"name": "Italiano", "flag": "🇮🇹", "direction": "ltr"},
    "es": {"name": "Español", "flag": "🇪🇸", "direction": "ltr"},
    "fr": {"name": "Français", "flag": "🇫🇷", "direction": "ltr"},
    "de": {"name": "Deutsch", "flag": "🇩🇪", "direction": "ltr"},
    "pt": {"name": "Português", "flag": "🇧🇷", "direction": "ltr"},
    "nl": {"name": "Nederlands", "flag": "🇳🇱", "direction": "ltr"},
    "ar": {"name": "العربية", "flag": "🇸🇦", "direction": "rtl"},
    "hi": {"name": "हिंदी", "flag": "🇮🇳", "direction": "ltr"},
    "ja": {"name": "日本語", "flag": "🇯🇵", "direction": "ltr"},
    "ko": {"name": "한국어", "flag": "🇰🇷", "direction": "ltr"},
    "zh": {"name": "中文", "flag": "🇨🇳", "direction": "ltr"},
}

# Italian Puzzles
ITALIAN_LEVELS = [
    {
        "id": 1,
        "language": "it",
        "category": "Casa",
        "theme": "La Cucina",
        "letters": ["C", "A", "S", "A", "P", "O", "R", "T"],
        "targetWords": ["CASA", "PORTA", "ROSA", "TOPO", "CARO"],
        "bonusWords": ["ROCA", "POCA", "ARCO", "CAPO"],
        "grid": [
            {"word": "CASA", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "PORTA", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "ROSA", "row": 2, "col": 1, "direction": "horizontal"},
            {"word": "TOPO", "row": 0, "col": 3, "direction": "vertical"},
            {"word": "CARO", "row": 3, "col": 0, "direction": "horizontal"},
        ]
    },
    {
        "id": 2,
        "language": "it",
        "category": "Natura",
        "theme": "Il Giardino",
        "letters": ["F", "I", "O", "R", "E", "S", "L", "A"],
        "targetWords": ["FIORE", "SOLE", "ARIA", "ISOLA", "RISO"],
        "bonusWords": ["FILO", "LIRA", "SERA", "OLIO"],
        "grid": [
            {"word": "FIORE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "SOLE", "row": 1, "col": 1, "direction": "horizontal"},
            {"word": "ARIA", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "ISOLA", "row": 0, "col": 4, "direction": "vertical"},
            {"word": "RISO", "row": 3, "col": 1, "direction": "horizontal"},
        ]
    },
    {
        "id": 3,
        "language": "it",
        "category": "Cibo",
        "theme": "Ristorante",
        "letters": ["P", "A", "N", "E", "V", "I", "O", "L"],
        "targetWords": ["PANE", "VINO", "OLIO", "NAVE", "PIANO"],
        "bonusWords": ["PINO", "LINO", "PILA", "VELA"],
        "grid": [
            {"word": "PANE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "VINO", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "OLIO", "row": 2, "col": 1, "direction": "horizontal"},
            {"word": "NAVE", "row": 0, "col": 3, "direction": "vertical"},
            {"word": "PIANO", "row": 3, "col": 0, "direction": "horizontal"},
        ]
    },
]

# Spanish Puzzles
SPANISH_LEVELS = [
    {
        "id": 1,
        "language": "es",
        "category": "Hogar",
        "theme": "La Casa",
        "letters": ["C", "A", "S", "O", "M", "E", "R"],
        "targetWords": ["CASA", "MESA", "COSA", "ROCA", "AMOR"],
        "bonusWords": ["ROMA", "ARCO", "CARO", "SECAR"],
        "grid": [
            {"word": "CASA", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "MESA", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "COSA", "row": 2, "col": 1, "direction": "horizontal"},
            {"word": "ROCA", "row": 0, "col": 3, "direction": "vertical"},
            {"word": "AMOR", "row": 3, "col": 0, "direction": "horizontal"},
        ]
    },
    {
        "id": 2,
        "language": "es",
        "category": "Naturaleza",
        "theme": "El Bosque",
        "letters": ["S", "O", "L", "A", "R", "B", "E"],
        "targetWords": ["SOL", "ROSA", "BOLA", "ARBOL", "LOBO"],
        "bonusWords": ["RABO", "OBRA", "SOLA", "LOBA"],
        "grid": [
            {"word": "SOL", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "ROSA", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "BOLA", "row": 2, "col": 1, "direction": "horizontal"},
            {"word": "ARBOL", "row": 0, "col": 2, "direction": "vertical"},
            {"word": "LOBO", "row": 3, "col": 0, "direction": "horizontal"},
        ]
    },
    {
        "id": 3,
        "language": "es",
        "category": "Comida",
        "theme": "Restaurante",
        "letters": ["P", "A", "N", "O", "V", "I", "E", "L"],
        "targetWords": ["PAN", "VINO", "NOVIA", "PIANO", "NAVE"],
        "bonusWords": ["PINO", "LINO", "PIEL", "LEON"],
        "grid": [
            {"word": "PAN", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "VINO", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "NOVIA", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "PIANO", "row": 0, "col": 2, "direction": "vertical"},
            {"word": "NAVE", "row": 3, "col": 1, "direction": "horizontal"},
        ]
    },
]

# French Puzzles
FRENCH_LEVELS = [
    {
        "id": 1,
        "language": "fr",
        "category": "Maison",
        "theme": "La Cuisine",
        "letters": ["M", "A", "I", "S", "O", "N", "R", "E"],
        "targetWords": ["MAISON", "MOIS", "RIEN", "NOIR", "SOIR"],
        "bonusWords": ["MARI", "MINE", "RAME", "REIN"],
        "grid": [
            {"word": "MAISON", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "MOIS", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "RIEN", "row": 2, "col": 1, "direction": "horizontal"},
            {"word": "NOIR", "row": 0, "col": 5, "direction": "vertical"},
            {"word": "SOIR", "row": 3, "col": 0, "direction": "horizontal"},
        ]
    },
    {
        "id": 2,
        "language": "fr",
        "category": "Nature",
        "theme": "Le Jardin",
        "letters": ["F", "L", "E", "U", "R", "S", "O", "I"],
        "targetWords": ["FLEUR", "SOLEIL", "ROSE", "LIRE", "RUSE"],
        "bonusWords": ["FUEL", "FILE", "SEUL", "LIEU"],
        "grid": [
            {"word": "FLEUR", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "SOLEIL", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "ROSE", "row": 2, "col": 1, "direction": "horizontal"},
            {"word": "LIRE", "row": 0, "col": 4, "direction": "vertical"},
            {"word": "RUSE", "row": 3, "col": 0, "direction": "horizontal"},
        ]
    },
    {
        "id": 3,
        "language": "fr",
        "category": "Nourriture",
        "theme": "Restaurant",
        "letters": ["P", "A", "I", "N", "V", "E", "U", "R"],
        "targetWords": ["PAIN", "VIN", "PEUR", "RAVI", "PURE"],
        "bonusWords": ["PAIX", "REIN", "PIRE", "VAIN"],
        "grid": [
            {"word": "PAIN", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "VIN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "PEUR", "row": 2, "col": 1, "direction": "horizontal"},
            {"word": "RAVI", "row": 0, "col": 3, "direction": "vertical"},
            {"word": "PURE", "row": 3, "col": 0, "direction": "horizontal"},
        ]
    },
]

# German Puzzles
GERMAN_LEVELS = [
    {
        "id": 1,
        "language": "de",
        "category": "Haus",
        "theme": "Die Kuche",
        "letters": ["H", "A", "U", "S", "T", "I", "R", "E"],
        "targetWords": ["HAUS", "TIER", "HASE", "REIS", "STAR"],
        "bonusWords": ["HAAR", "RAST", "RIST", "STUR"],
        "grid": [
            {"word": "HAUS", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "TIER", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "HASE", "row": 2, "col": 1, "direction": "horizontal"},
            {"word": "REIS", "row": 0, "col": 3, "direction": "vertical"},
            {"word": "STAR", "row": 3, "col": 0, "direction": "horizontal"},
        ]
    },
    {
        "id": 2,
        "language": "de",
        "category": "Natur",
        "theme": "Der Garten",
        "letters": ["B", "A", "U", "M", "R", "O", "S", "E"],
        "targetWords": ["BAUM", "ROSE", "MAUS", "OBST", "RUHE"],
        "bonusWords": ["RAUM", "SAUM", "ROBE", "ROEM"],
        "grid": [
            {"word": "BAUM", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "ROSE", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "MAUS", "row": 2, "col": 1, "direction": "horizontal"},
            {"word": "OBST", "row": 0, "col": 3, "direction": "vertical"},
            {"word": "RUHE", "row": 3, "col": 0, "direction": "horizontal"},
        ]
    },
    {
        "id": 3,
        "language": "de",
        "category": "Essen",
        "theme": "Restaurant",
        "letters": ["B", "R", "O", "T", "W", "E", "I", "N"],
        "targetWords": ["BROT", "WEIN", "OBST", "REIN", "TORE"],
        "bonusWords": ["WORT", "OBER", "ROBE", "NOTE"],
        "grid": [
            {"word": "BROT", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "WEIN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "OBST", "row": 2, "col": 1, "direction": "horizontal"},
            {"word": "REIN", "row": 0, "col": 3, "direction": "vertical"},
            {"word": "TORE", "row": 3, "col": 0, "direction": "horizontal"},
        ]
    },
]

# Portuguese Puzzles  
PORTUGUESE_LEVELS = [
    {
        "id": 1,
        "language": "pt",
        "category": "Casa",
        "theme": "A Cozinha",
        "letters": ["C", "A", "S", "O", "M", "E", "R"],
        "targetWords": ["CASA", "MESA", "CARO", "AMOR", "SOMA"],
        "bonusWords": ["ARCO", "RAMO", "SECO", "MOCA"],
        "grid": [
            {"word": "CASA", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "MESA", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "CARO", "row": 2, "col": 1, "direction": "horizontal"},
            {"word": "AMOR", "row": 0, "col": 3, "direction": "vertical"},
            {"word": "SOMA", "row": 3, "col": 0, "direction": "horizontal"},
        ]
    },
    {
        "id": 2,
        "language": "pt",
        "category": "Natureza",
        "theme": "O Jardim",
        "letters": ["S", "O", "L", "F", "R", "E", "A"],
        "targetWords": ["SOL", "FLOR", "ROSA", "FOLHA", "SERA"],
        "bonusWords": ["FORA", "SOFA", "REAL", "SOLA"],
        "grid": [
            {"word": "SOL", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "FLOR", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "ROSA", "row": 2, "col": 1, "direction": "horizontal"},
            {"word": "FOLHA", "row": 0, "col": 2, "direction": "vertical"},
            {"word": "SERA", "row": 3, "col": 0, "direction": "horizontal"},
        ]
    },
    {
        "id": 3,
        "language": "pt",
        "category": "Comida",
        "theme": "Restaurante",
        "letters": ["P", "A", "O", "V", "I", "N", "H"],
        "targetWords": ["PAO", "VINHO", "NAVIO", "PINHA", "AVIAO"],
        "bonusWords": ["PINO", "AIPO", "OPAH", "PAVA"],
        "grid": [
            {"word": "PAO", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "VINHO", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "NAVIO", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "PINHA", "row": 0, "col": 2, "direction": "vertical"},
            {"word": "AVIAO", "row": 3, "col": 0, "direction": "horizontal"},
        ]
    },
]

# Dutch Puzzles
DUTCH_LEVELS = [
    {
        "id": 1,
        "language": "nl",
        "category": "Huis",
        "theme": "De Keuken",
        "letters": ["H", "U", "I", "S", "T", "A", "F", "E"],
        "targetWords": ["HUIS", "TAFEL", "STAF", "HEFT", "FASE"],
        "bonusWords": ["HAAT", "FEIT", "STUK", "TUIN"],
        "grid": [
            {"word": "HUIS", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "TAFEL", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "STAF", "row": 2, "col": 1, "direction": "horizontal"},
            {"word": "HEFT", "row": 0, "col": 4, "direction": "vertical"},
            {"word": "FASE", "row": 3, "col": 0, "direction": "horizontal"},
        ]
    },
    {
        "id": 2,
        "language": "nl",
        "category": "Natuur",
        "theme": "De Tuin",
        "letters": ["B", "O", "O", "M", "R", "O", "Z", "E"],
        "targetWords": ["BOOM", "ROOS", "ROZE", "ZOOM", "BOOR"],
        "bonusWords": ["ROOM", "MOOR", "BOER", "ROEM"],
        "grid": [
            {"word": "BOOM", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "ROOS", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "ROZE", "row": 2, "col": 1, "direction": "horizontal"},
            {"word": "ZOOM", "row": 0, "col": 3, "direction": "vertical"},
            {"word": "BOOR", "row": 3, "col": 0, "direction": "horizontal"},
        ]
    },
    {
        "id": 3,
        "language": "nl",
        "category": "Eten",
        "theme": "Restaurant",
        "letters": ["B", "R", "O", "D", "W", "I", "J", "N"],
        "targetWords": ["BROOD", "WIJN", "WIND", "ROND", "DORP"],
        "bonusWords": ["WOORD", "BORD", "NOOD", "ROOD"],
        "grid": [
            {"word": "BROOD", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "WIJN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "WIND", "row": 2, "col": 1, "direction": "horizontal"},
            {"word": "ROND", "row": 0, "col": 4, "direction": "vertical"},
            {"word": "DORP", "row": 3, "col": 0, "direction": "horizontal"},
        ]
    },
]

# Arabic Puzzles (simplified romanized for grid compatibility)
ARABIC_LEVELS = [
    {
        "id": 1,
        "language": "ar",
        "category": "البيت",
        "theme": "المطبخ",
        "letters": ["ب", "ي", "ت", "ك", "ت", "ا", "ب"],
        "targetWords": ["بيت", "كتاب", "باب", "تاب"],
        "bonusWords": ["بات", "كاتب"],
        "grid": [
            {"word": "بيت", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "كتاب", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "باب", "row": 2, "col": 1, "direction": "horizontal"},
            {"word": "تاب", "row": 3, "col": 0, "direction": "horizontal"},
        ]
    },
]

# Hindi Puzzles
HINDI_LEVELS = [
    {
        "id": 1,
        "language": "hi",
        "category": "घर",
        "theme": "रसोई",
        "letters": ["घ", "र", "प", "ा", "न", "ी"],
        "targetWords": ["घर", "पानी", "नाम"],
        "bonusWords": ["राम", "पान"],
        "grid": [
            {"word": "घर", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "पानी", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "नाम", "row": 2, "col": 1, "direction": "horizontal"},
        ]
    },
]

# Japanese Puzzles (Hiragana)
JAPANESE_LEVELS = [
    {
        "id": 1,
        "language": "ja",
        "category": "家",
        "theme": "台所",
        "letters": ["い", "え", "う", "ち", "か", "わ"],
        "targetWords": ["いえ", "うち", "かわ"],
        "bonusWords": ["いか", "うえ"],
        "grid": [
            {"word": "いえ", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "うち", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "かわ", "row": 2, "col": 1, "direction": "horizontal"},
        ]
    },
]

# Korean Puzzles
KOREAN_LEVELS = [
    {
        "id": 1,
        "language": "ko",
        "category": "집",
        "theme": "부엌",
        "letters": ["집", "문", "불", "물", "밥"],
        "targetWords": ["집", "문", "불", "물", "밥"],
        "bonusWords": [],
        "grid": [
            {"word": "집", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "문", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "불", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "물", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "밥", "row": 4, "col": 0, "direction": "horizontal"},
        ]
    },
]

# Chinese Puzzles (Simplified)
CHINESE_LEVELS = [
    {
        "id": 1,
        "language": "zh",
        "category": "家",
        "theme": "厨房",
        "letters": ["家", "门", "水", "火", "山"],
        "targetWords": ["家", "门", "水", "火", "山"],
        "bonusWords": [],
        "grid": [
            {"word": "家", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "门", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "水", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "火", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "山", "row": 4, "col": 0, "direction": "horizontal"},
        ]
    },
]

# Combine all multilingual levels
MULTILINGUAL_LEVELS = {
    "it": ITALIAN_LEVELS,
    "es": SPANISH_LEVELS,
    "fr": FRENCH_LEVELS,
    "de": GERMAN_LEVELS,
    "pt": PORTUGUESE_LEVELS,
    "nl": DUTCH_LEVELS,
    "ar": ARABIC_LEVELS,
    "hi": HINDI_LEVELS,
    "ja": JAPANESE_LEVELS,
    "ko": KOREAN_LEVELS,
    "zh": CHINESE_LEVELS,
}

def get_levels_by_language(language_code: str):
    """Get all levels for a specific language"""
    return MULTILINGUAL_LEVELS.get(language_code, [])

def get_all_supported_languages():
    """Get list of all supported languages"""
    return LANGUAGE_CONFIG

def get_level_by_language_and_id(language_code: str, level_id: int):
    """Get a specific level by language and ID"""
    levels = MULTILINGUAL_LEVELS.get(language_code, [])
    for level in levels:
        if level["id"] == level_id:
            return level
    return None
