# Words of Wonders - 50 Levels Data
# Organized by difficulty: Easy (1-15), Medium (16-35), Hard (36-50)

LEVEL_DATA = [
    # ============== EASY LEVELS (1-15) ==============
    {
        "id": 1,
        "wonder": "Great Pyramid of Giza",
        "location": "Egypt",
        "letters": ["S", "U", "N", "D", "A", "Y"],
        "targetWords": ["SUN", "DAY", "AND", "SAD", "SAY", "SUNDAY"],
        "grid": [
            {"word": "SUN", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "DAY", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "AND", "row": 1, "col": 1, "direction": "vertical"},
            {"word": "SAD", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "SAY", "row": 3, "col": 4, "direction": "horizontal"},
            {"word": "SUNDAY", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["SANDY", "DAYS", "ANUS", "YUAN", "DUNS", "NAYS", "YAWNS"]
    },
    {
        "id": 2,
        "wonder": "Colosseum",
        "location": "Rome, Italy",
        "letters": ["W", "O", "R", "D", "S"],
        "targetWords": ["ROW", "SOW", "WORD", "WORDS", "ROWS"],
        "grid": [
            {"word": "ROW", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "SOW", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "WORD", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "ROWS", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "WORDS", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["SWORD", "DORS", "RODS", "ORDS", "DOWS", "TROW"]
    },
    {
        "id": 3,
        "wonder": "Great Wall of China",
        "location": "China",
        "letters": ["W", "A", "L", "L", "S"],
        "targetWords": ["ALL", "SAW", "LAW", "WALL", "WALLS"],
        "grid": [
            {"word": "ALL", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "SAW", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "LAW", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "WALL", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "WALLS", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["AWLS", "SLAW", "LAWS", "ALLS", "SWAM"]
    },
    {
        "id": 4,
        "wonder": "Machu Picchu",
        "location": "Peru",
        "letters": ["S", "T", "O", "N", "E"],
        "targetWords": ["SON", "TON", "TEN", "SET", "TONE", "STONE"],
        "grid": [
            {"word": "SON", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "TON", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "TEN", "row": 1, "col": 2, "direction": "horizontal"},
            {"word": "SET", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "TONE", "row": 3, "col": 3, "direction": "horizontal"},
            {"word": "STONE", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["ONES", "NEST", "NETS", "SENT", "NOTE", "NOTES", "ONSET", "TONES", "NOSE", "TOES"]
    },
    {
        "id": 5,
        "wonder": "Taj Mahal",
        "location": "India",
        "letters": ["L", "O", "V", "E", "S"],
        "targetWords": ["LOVE", "LOSE", "SOLE", "VOLE", "LOVES"],
        "grid": [
            {"word": "LOVE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "LOSE", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "SOLE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "VOLE", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "LOVES", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["VOLES", "SOLVE", "SOLES", "OLES", "OVEL", "LEVO"]
    },
    {
        "id": 6,
        "wonder": "Petra",
        "location": "Jordan",
        "letters": ["T", "R", "A", "I", "N"],
        "targetWords": ["AIR", "ART", "RAT", "TAN", "RAIN", "TRAIN"],
        "grid": [
            {"word": "AIR", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "ART", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "RAT", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "TAN", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "RAIN", "row": 3, "col": 3, "direction": "horizontal"},
            {"word": "TRAIN", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["ANTI", "RANT", "TARN", "RIANT", "ARIA", "TIARA"]
    },
    {
        "id": 7,
        "wonder": "Christ the Redeemer",
        "location": "Rio de Janeiro, Brazil",
        "letters": ["B", "E", "A", "C", "H"],
        "targetWords": ["ACE", "BEE", "CAB", "EACH", "ACHE", "BEACH"],
        "grid": [
            {"word": "ACE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "BEE", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "CAB", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "EACH", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "ACHE", "row": 3, "col": 3, "direction": "horizontal"},
            {"word": "BEACH", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["BACH", "BACHE", "BEECH"]
    },
    {
        "id": 8,
        "wonder": "Chichen Itza",
        "location": "Mexico",
        "letters": ["L", "I", "G", "H", "T"],
        "targetWords": ["HIT", "LIT", "GILT", "LIGHT"],
        "grid": [
            {"word": "HIT", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "LIT", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "GILT", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "LIGHT", "row": 3, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["HILT", "GLIT", "TIGH"]
    },
    {
        "id": 9,
        "wonder": "Eiffel Tower",
        "location": "Paris, France",
        "letters": ["S", "T", "A", "R", "S"],
        "targetWords": ["ART", "RAT", "SAT", "TAR", "STAR", "STARS"],
        "grid": [
            {"word": "ART", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "RAT", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "SAT", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "TAR", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "STAR", "row": 3, "col": 3, "direction": "horizontal"},
            {"word": "STARS", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["RATS", "ARTS", "TARS", "TSAR", "TSARS"]
    },
    {
        "id": 10,
        "wonder": "Stonehenge",
        "location": "England, UK",
        "letters": ["E", "A", "R", "T", "H"],
        "targetWords": ["EAR", "EAT", "ATE", "HAT", "HEAT", "EARTH"],
        "grid": [
            {"word": "EAR", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "EAT", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "ATE", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "HAT", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "HEAT", "row": 3, "col": 3, "direction": "horizontal"},
            {"word": "EARTH", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["RATE", "TEAR", "HATE", "HARE", "HEART", "HATER", "ETHER"]
    },
    {
        "id": 11,
        "wonder": "Angkor Wat",
        "location": "Cambodia",
        "letters": ["W", "A", "T", "E", "R"],
        "targetWords": ["WAR", "WET", "EAT", "ATE", "RATE", "WATER"],
        "grid": [
            {"word": "WAR", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "WET", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "EAT", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "ATE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "RATE", "row": 3, "col": 3, "direction": "horizontal"},
            {"word": "WATER", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["WEAR", "TEAR", "WARE", "TARE", "WART", "RAWE"]
    },
    {
        "id": 12,
        "wonder": "Hagia Sophia",
        "location": "Istanbul, Turkey",
        "letters": ["F", "L", "O", "W", "E", "R"],
        "targetWords": ["FLO", "OWE", "ROW", "LOW", "FLOW", "FLOWER"],
        "grid": [
            {"word": "FLO", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "OWE", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "ROW", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "LOW", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "FLOW", "row": 3, "col": 3, "direction": "horizontal"},
            {"word": "FLOWER", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["FORE", "WORE", "FOWL", "WOLF", "ROLE", "LOWER", "ROWER"]
    },
    {
        "id": 13,
        "wonder": "Leaning Tower of Pisa",
        "location": "Italy",
        "letters": ["C", "L", "O", "U", "D"],
        "targetWords": ["OLD", "COD", "CUD", "LOUD", "CLOUD"],
        "grid": [
            {"word": "OLD", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "COD", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "CUD", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "LOUD", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "CLOUD", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["COLD", "CLOD", "COULD", "DULL"]
    },
    {
        "id": 14,
        "wonder": "Parthenon",
        "location": "Athens, Greece",
        "letters": ["G", "R", "E", "E", "N"],
        "targetWords": ["ERE", "GEE", "GREEN"],
        "grid": [
            {"word": "ERE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "GEE", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "GREEN", "row": 2, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["GENE", "GENRE", "RENEGE"]
    },
    {
        "id": 15,
        "wonder": "Mount Fuji",
        "location": "Japan",
        "letters": ["B", "L", "U", "E", "S"],
        "targetWords": ["BUS", "SUB", "USE", "BLUE", "BLUES"],
        "grid": [
            {"word": "BUS", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "SUB", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "USE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "BLUE", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "BLUES", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["SLUE", "LUBE", "LUBES"]
    },
    
    # ============== MEDIUM LEVELS (16-35) ==============
    {
        "id": 16,
        "wonder": "Sagrada Familia",
        "location": "Barcelona, Spain",
        "letters": ["D", "R", "E", "A", "M", "S"],
        "targetWords": ["DAM", "ARM", "EAR", "READ", "DREAM", "DREAMS"],
        "grid": [
            {"word": "DAM", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "ARM", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "EAR", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "READ", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "DREAM", "row": 3, "col": 2, "direction": "horizontal"},
            {"word": "DREAMS", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["MARE", "DEAR", "DARE", "MADE", "ARMED", "DARES", "MARES", "READS", "SMEAR"]
    },
    {
        "id": 17,
        "wonder": "Big Ben",
        "location": "London, UK",
        "letters": ["N", "I", "G", "H", "T", "S"],
        "targetWords": ["HIS", "HIT", "SIT", "SIGH", "NIGHT", "NIGHTS"],
        "grid": [
            {"word": "HIS", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "HIT", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "SIT", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "SIGH", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "NIGHT", "row": 3, "col": 2, "direction": "horizontal"},
            {"word": "NIGHTS", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["THIN", "THIS", "SHIN", "STING", "THING", "THINGS", "SIGHT"]
    },
    {
        "id": 18,
        "wonder": "Sydney Opera House",
        "location": "Australia",
        "letters": ["O", "C", "E", "A", "N", "S"],
        "targetWords": ["CAN", "ONE", "ACE", "CONE", "OCEAN", "OCEANS"],
        "grid": [
            {"word": "CAN", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "ONE", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "ACE", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "CONE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "OCEAN", "row": 3, "col": 2, "direction": "horizontal"},
            {"word": "OCEANS", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["CANE", "ONCE", "ACNE", "CONES", "CANOE", "SCONE", "CANOES"]
    },
    {
        "id": 19,
        "wonder": "Golden Gate Bridge",
        "location": "San Francisco, USA",
        "letters": ["B", "R", "I", "D", "G", "E"],
        "targetWords": ["BIG", "RID", "RIG", "RIDE", "RIDGE", "BRIDGE"],
        "grid": [
            {"word": "BIG", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "RID", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "RIG", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "RIDE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "RIDGE", "row": 3, "col": 2, "direction": "horizontal"},
            {"word": "BRIDGE", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["BIRD", "DIRE", "GRID", "GIRD", "BRIDE", "DIRGE"]
    },
    {
        "id": 20,
        "wonder": "Burj Khalifa",
        "location": "Dubai, UAE",
        "letters": ["T", "O", "W", "E", "R", "S"],
        "targetWords": ["TOW", "ROW", "OWE", "TORE", "STORE", "TOWERS"],
        "grid": [
            {"word": "TOW", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "ROW", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "OWE", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "TORE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "STORE", "row": 3, "col": 2, "direction": "horizontal"},
            {"word": "TOWERS", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["WORE", "ROWS", "STEW", "WEST", "REST", "WORST", "STREW", "TOWER", "WROTE"]
    },
    {
        "id": 21,
        "wonder": "Neuschwanstein Castle",
        "location": "Bavaria, Germany",
        "letters": ["C", "A", "S", "T", "L", "E"],
        "targetWords": ["ACE", "ATE", "CAT", "CAST", "SCALE", "CASTLE"],
        "grid": [
            {"word": "ACE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "ATE", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "CAT", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "CAST", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "SCALE", "row": 3, "col": 2, "direction": "horizontal"},
            {"word": "CASTLE", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["LATE", "SALT", "TALE", "SEAL", "SEAT", "LEAST", "STEAL", "TALES", "SLATE"]
    },
    {
        "id": 22,
        "wonder": "Statue of Liberty",
        "location": "New York, USA",
        "letters": ["F", "R", "E", "E", "D", "O", "M"],
        "targetWords": ["FED", "RED", "ODE", "FREE", "FREED", "FREEDOM"],
        "grid": [
            {"word": "FED", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "RED", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "ODE", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "FREE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "FREED", "row": 3, "col": 2, "direction": "horizontal"},
            {"word": "FREEDOM", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["FORE", "MODE", "MORE", "FORM", "DOME", "REED", "RODE", "ERODE", "DEFER"]
    },
    {
        "id": 23,
        "wonder": "Kremlin",
        "location": "Moscow, Russia",
        "letters": ["W", "I", "N", "T", "E", "R"],
        "targetWords": ["WIN", "WIT", "TIN", "WIRE", "WRITE", "WINTER"],
        "grid": [
            {"word": "WIN", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "WIT", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "TIN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "WIRE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "WRITE", "row": 3, "col": 2, "direction": "horizontal"},
            {"word": "WINTER", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["TWIN", "WREN", "TIER", "TIRE", "RITE", "TINE", "INERT", "INTER", "TWINE", "WRIT"]
    },
    {
        "id": 24,
        "wonder": "Alhambra",
        "location": "Granada, Spain",
        "letters": ["P", "A", "L", "A", "C", "E"],
        "targetWords": ["APE", "LAP", "CAP", "PALE", "PLACE", "PALACE"],
        "grid": [
            {"word": "APE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "LAP", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "CAP", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "PALE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "PLACE", "row": 3, "col": 2, "direction": "horizontal"},
            {"word": "PALACE", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["PACE", "LACE", "CAPE", "LEAP", "PEAL", "PLEA", "ACNE"]
    },
    {
        "id": 25,
        "wonder": "Moai Statues",
        "location": "Easter Island, Chile",
        "letters": ["I", "S", "L", "A", "N", "D"],
        "targetWords": ["AID", "LID", "AND", "SAIL", "LAND", "ISLAND"],
        "grid": [
            {"word": "AID", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "LID", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "AND", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "SAIL", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "LAND", "row": 3, "col": 3, "direction": "horizontal"},
            {"word": "ISLAND", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["DIAL", "LAID", "SAID", "SNAIL", "SLAIN", "NAILS", "LANDS"]
    },
    {
        "id": 26,
        "wonder": "Versailles Palace",
        "location": "France",
        "letters": ["G", "A", "R", "D", "E", "N"],
        "targetWords": ["AGE", "EAR", "RED", "DARE", "GRAND", "GARDEN"],
        "grid": [
            {"word": "AGE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "EAR", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "RED", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "DARE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "GRAND", "row": 3, "col": 2, "direction": "horizontal"},
            {"word": "GARDEN", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["RAGE", "DEAR", "READ", "GEAR", "RANG", "RANGE", "ANGER", "DANGER"]
    },
    {
        "id": 27,
        "wonder": "Forbidden City",
        "location": "Beijing, China",
        "letters": ["T", "E", "M", "P", "L", "E"],
        "targetWords": ["MET", "PET", "LET", "MEET", "TEMPLE"],
        "grid": [
            {"word": "MET", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "PET", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "LET", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "MEET", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "TEMPLE", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["PEEL", "MELT", "PELT", "ELEM", "EMMET"]
    },
    {
        "id": 28,
        "wonder": "Acropolis",
        "location": "Athens, Greece",
        "letters": ["A", "N", "C", "I", "E", "N", "T"],
        "targetWords": ["ACE", "ANT", "CAN", "NEAT", "ACCENT", "ANCIENT"],
        "grid": [
            {"word": "ACE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "ANT", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "CAN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "NEAT", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "ACCENT", "row": 3, "col": 1, "direction": "horizontal"},
            {"word": "ANCIENT", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["CANE", "CENT", "NICE", "ACNE", "ANTIC", "CANINE"]
    },
    {
        "id": 29,
        "wonder": "Terracotta Army",
        "location": "Xi'an, China",
        "letters": ["S", "O", "L", "D", "I", "E", "R"],
        "targetWords": ["OLD", "OIL", "LIE", "RIDE", "OLDER", "SOLDIER"],
        "grid": [
            {"word": "OLD", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "OIL", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "LIE", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "RIDE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "OLDER", "row": 3, "col": 2, "direction": "horizontal"},
            {"word": "SOLDIER", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["ROLE", "DIRE", "SIDE", "SLED", "SLIDE", "SOLID", "OILER", "SOILED"]
    },
    {
        "id": 30,
        "wonder": "Mont Saint-Michel",
        "location": "Normandy, France",
        "letters": ["M", "O", "N", "A", "S", "T", "E", "R", "Y"],
        "targetWords": ["MAT", "RAT", "TAN", "MEAN", "STONE", "MONASTERY"],
        "grid": [
            {"word": "MAT", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "RAT", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "TAN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "MEAN", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "STONE", "row": 3, "col": 1, "direction": "horizontal"},
            {"word": "MONASTERY", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["STAR", "YEAR", "NOSE", "TONE", "MAST", "STORY", "STREAM", "MASTER"]
    },
    {
        "id": 31,
        "wonder": "Santorini",
        "location": "Greece",
        "letters": ["S", "U", "N", "S", "E", "T"],
        "targetWords": ["SUN", "SET", "NET", "NUT", "SENT", "SUNSET"],
        "grid": [
            {"word": "SUN", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "SET", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "NET", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "NUT", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "SENT", "row": 3, "col": 3, "direction": "horizontal"},
            {"word": "SUNSET", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["NEST", "NUTS", "TENS", "TUNE", "SUNS", "NETS", "TUNES", "UNSET"]
    },
    {
        "id": 32,
        "wonder": "Niagara Falls",
        "location": "USA/Canada",
        "letters": ["W", "A", "T", "E", "R", "F", "A", "L", "L"],
        "targetWords": ["WAR", "EAT", "FAR", "FALL", "WATER", "WATERFALL"],
        "grid": [
            {"word": "WAR", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "EAT", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "FAR", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "FALL", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "WATER", "row": 3, "col": 2, "direction": "horizontal"},
            {"word": "WATERFALL", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["RATE", "WALL", "TALL", "FLAT", "TEAR", "WEAR", "LATE", "LATER", "ALTER", "RAFT"]
    },
    {
        "id": 33,
        "wonder": "Victoria Falls",
        "location": "Zambia/Zimbabwe",
        "letters": ["N", "A", "T", "U", "R", "E"],
        "targetWords": ["NUT", "RAN", "ATE", "RATE", "TUNE", "NATURE"],
        "grid": [
            {"word": "NUT", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "RAN", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "ATE", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "RATE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "TUNE", "row": 3, "col": 3, "direction": "horizontal"},
            {"word": "NATURE", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["NEAR", "TEAR", "RENT", "AUNT", "EARN", "TRUE", "TURN", "UREA"]
    },
    {
        "id": 34,
        "wonder": "Blue Mosque",
        "location": "Istanbul, Turkey",
        "letters": ["S", "P", "I", "R", "I", "T"],
        "targetWords": ["SIT", "TIP", "RIP", "STIR", "TRIP", "SPIRIT"],
        "grid": [
            {"word": "SIT", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "TIP", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "RIP", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "STIR", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "TRIP", "row": 3, "col": 3, "direction": "horizontal"},
            {"word": "SPIRIT", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["SPIT", "TIPS", "RIPS", "STRIP", "TRIPS"]
    },
    {
        "id": 35,
        "wonder": "Prague Castle",
        "location": "Czech Republic",
        "letters": ["H", "I", "S", "T", "O", "R", "Y"],
        "targetWords": ["HIS", "SIT", "HOT", "STORY", "SHORT", "HISTORY"],
        "grid": [
            {"word": "HIS", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "SIT", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "HOT", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "STORY", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "SHORT", "row": 3, "col": 2, "direction": "horizontal"},
            {"word": "HISTORY", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["SORT", "RIOT", "ROSY", "HORSY", "SHIRT", "THIRTY"]
    },
    
    # ============== HARD LEVELS (36-50) ==============
    {
        "id": 36,
        "wonder": "Bagan Temples",
        "location": "Myanmar",
        "letters": ["M", "Y", "S", "T", "E", "R", "Y"],
        "targetWords": ["TRY", "YES", "SET", "REST", "STORY", "MYSTERY"],
        "grid": [
            {"word": "TRY", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "YES", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "SET", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "REST", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "STORY", "row": 3, "col": 2, "direction": "horizontal"},
            {"word": "MYSTERY", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["STEM", "TERM", "TERMS", "MERRY", "MESSY", "SYSTEM", "MASTER"]
    },
    {
        "id": 37,
        "wonder": "Borobudur",
        "location": "Java, Indonesia",
        "letters": ["J", "O", "U", "R", "N", "E", "Y"],
        "targetWords": ["JOY", "RUN", "ORE", "RUNE", "ENJOY", "JOURNEY"],
        "grid": [
            {"word": "JOY", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "RUN", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "ORE", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "RUNE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "ENJOY", "row": 3, "col": 2, "direction": "horizontal"},
            {"word": "JOURNEY", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["YOUR", "JURY", "EURO", "HORN", "YORE", "ONRY", "JOURN"]
    },
    {
        "id": 38,
        "wonder": "Uluru",
        "location": "Australia",
        "letters": ["A", "D", "V", "E", "N", "T", "U", "R", "E"],
        "targetWords": ["ANT", "RAN", "VET", "VENT", "RAVEN", "ADVENTURE"],
        "grid": [
            {"word": "ANT", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "RAN", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "VET", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "VENT", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "RAVEN", "row": 3, "col": 2, "direction": "horizontal"},
            {"word": "ADVENTURE", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["DARE", "RENT", "TRUE", "TURN", "TREND", "VENUE", "ENDURE", "NATURE", "ADVENT"]
    },
    {
        "id": 39,
        "wonder": "Ha Long Bay",
        "location": "Vietnam",
        "letters": ["B", "E", "A", "U", "T", "I", "F", "U", "L"],
        "targetWords": ["BAT", "FIT", "LIE", "BEAT", "TABLE", "BEAUTIFUL"],
        "grid": [
            {"word": "BAT", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "FIT", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "LIE", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "BEAT", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "TABLE", "row": 3, "col": 2, "direction": "horizontal"},
            {"word": "BEAUTIFUL", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["BELT", "FAIL", "FLAT", "LIFE", "BLUE", "ABLE", "FATE", "BAIL", "LEAF", "FABLE"]
    },
    {
        "id": 40,
        "wonder": "Amalfi Coast",
        "location": "Italy",
        "letters": ["W", "O", "N", "D", "E", "R", "F", "U", "L"],
        "targetWords": ["OWN", "FUN", "OLD", "FLOW", "WONDER", "WONDERFUL"],
        "grid": [
            {"word": "OWN", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "FUN", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "OLD", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "FLOW", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "WONDER", "row": 3, "col": 1, "direction": "horizontal"},
            {"word": "WONDERFUL", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["FLOW", "FOWL", "FUND", "LOUD", "WORLD", "FOUND", "ROUND", "FLOWER", "FOUNDER"]
    },
    {
        "id": 41,
        "wonder": "Cinque Terre",
        "location": "Italy",
        "letters": ["S", "P", "L", "E", "N", "D", "I", "D"],
        "targetWords": ["DIP", "PEN", "LID", "PINE", "SPEND", "SPLENDID"],
        "grid": [
            {"word": "DIP", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "PEN", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "LID", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "PINE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "SPEND", "row": 3, "col": 2, "direction": "horizontal"},
            {"word": "SPLENDID", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["SLIP", "SPIN", "PILE", "LINE", "LEND", "PENS", "SLIDE", "LINED", "SPINE"]
    },
    {
        "id": 42,
        "wonder": "Matterhorn",
        "location": "Switzerland",
        "letters": ["M", "O", "U", "N", "T", "A", "I", "N"],
        "targetWords": ["MAN", "NUT", "TAN", "MINT", "MOUNT", "MOUNTAIN"],
        "grid": [
            {"word": "MAN", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "NUT", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "TAN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "MINT", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "MOUNT", "row": 3, "col": 2, "direction": "horizontal"},
            {"word": "MOUNTAIN", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["MAIN", "UNIT", "INTO", "AMOUNT", "NATION", "MUTANT"]
    },
    {
        "id": 43,
        "wonder": "Northern Lights",
        "location": "Iceland",
        "letters": ["M", "A", "G", "I", "C", "A", "L"],
        "targetWords": ["AGE", "GAL", "AIM", "CALM", "MAGIC", "MAGICAL"],
        "grid": [
            {"word": "AGE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "GAL", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "AIM", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "CALM", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "MAGIC", "row": 3, "col": 2, "direction": "horizontal"},
            {"word": "MAGICAL", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["MAIL", "CLAM", "CLAIM", "GALA", "MICA"]
    },
    {
        "id": 44,
        "wonder": "Grand Canyon",
        "location": "Arizona, USA",
        "letters": ["M", "A", "J", "E", "S", "T", "I", "C"],
        "targetWords": ["JAM", "SET", "ACE", "MICE", "MASTIC", "MAJESTIC"],
        "grid": [
            {"word": "JAM", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "SET", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "ACE", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "MICE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "MASTIC", "row": 3, "col": 1, "direction": "horizontal"},
            {"word": "MAJESTIC", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["MIST", "CAST", "MAST", "JEST", "JAMS", "STEAM", "MATES", "TEAMS"]
    },
    {
        "id": 45,
        "wonder": "Serengeti",
        "location": "Tanzania",
        "letters": ["W", "I", "L", "D", "L", "I", "F", "E"],
        "targetWords": ["LID", "WED", "FED", "WILD", "FIELD", "WILDLIFE"],
        "grid": [
            {"word": "LID", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "WED", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "FED", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "WILD", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "FIELD", "row": 3, "col": 2, "direction": "horizontal"},
            {"word": "WILDLIFE", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["LIFE", "FILE", "WIFE", "FLED", "FILL", "WIELD", "FILED", "FILLED", "DWELL"]
    },
    {
        "id": 46,
        "wonder": "Amazon Rainforest",
        "location": "Brazil",
        "letters": ["T", "R", "O", "P", "I", "C", "A", "L"],
        "targetWords": ["TAP", "POT", "COP", "TRIP", "TOPIC", "TROPICAL"],
        "grid": [
            {"word": "TAP", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "POT", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "COP", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "TRIP", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "TOPIC", "row": 3, "col": 2, "direction": "horizontal"},
            {"word": "TROPICAL", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["PART", "PORT", "CLAP", "TRAP", "COAT", "PILOT", "OPTIC", "PORTAL", "PATROL"]
    },
    {
        "id": 47,
        "wonder": "Bora Bora",
        "location": "French Polynesia",
        "letters": ["P", "A", "R", "A", "D", "I", "S", "E"],
        "targetWords": ["SAD", "AIR", "PAD", "SIDE", "RAPID", "PARADISE"],
        "grid": [
            {"word": "SAD", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "AIR", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "PAD", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "SIDE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "RAPID", "row": 3, "col": 2, "direction": "horizontal"},
            {"word": "PARADISE", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["PAIR", "RAID", "DEAR", "IDEA", "PAID", "RISE", "PRIDE", "RAISED", "PRAISE"]
    },
    {
        "id": 48,
        "wonder": "Maldives",
        "location": "Indian Ocean",
        "letters": ["E", "X", "O", "T", "I", "C"],
        "targetWords": ["TOE", "TIE", "ICE", "EXIT", "TOXIC", "EXOTIC"],
        "grid": [
            {"word": "TOE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "TIE", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "ICE", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "EXIT", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "TOXIC", "row": 3, "col": 2, "direction": "horizontal"},
            {"word": "EXOTIC", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["CITE", "TOES", "TIES", "OXEN", "EXIST"]
    },
    {
        "id": 49,
        "wonder": "Great Barrier Reef",
        "location": "Australia",
        "letters": ["U", "N", "D", "E", "R", "S", "E", "A"],
        "targetWords": ["SEA", "END", "RAN", "DEAR", "UNDER", "UNDERSEA"],
        "grid": [
            {"word": "SEA", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "END", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "RAN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "DEAR", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "UNDER", "row": 3, "col": 2, "direction": "horizontal"},
            {"word": "UNDERSEA", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["NEAR", "READ", "EARN", "SANE", "USED", "NURSE", "SEARED", "ENSURED"]
    },
    {
        "id": 50,
        "wonder": "Aurora Borealis",
        "location": "Arctic Circle",
        "letters": ["S", "P", "E", "C", "T", "A", "C", "U", "L", "A", "R"],
        "targetWords": ["CUP", "CAR", "CUT", "PULSE", "CASTLE", "SPECTACULAR"],
        "grid": [
            {"word": "CUP", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "CAR", "row": 0, "col": 4, "direction": "horizontal"},
            {"word": "CUT", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "PULSE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "CASTLE", "row": 3, "col": 1, "direction": "horizontal"},
            {"word": "SPECTACULAR", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["STAR", "PART", "SEAL", "CAST", "LAST", "ULTRA", "SCALE", "CLEAR", "RUPTURE", "CAPTURE"]
    }
]

# ============== ADDITIONAL LEVELS (51-150) ==============
ADDITIONAL_LEVELS = [
    # More Easy Levels (51-65)
    {
        "id": 51,
        "wonder": "Iguazu Falls",
        "location": "Argentina/Brazil",
        "letters": ["C", "O", "L", "O", "R"],
        "targetWords": ["COO", "COR", "COLOR"],
        "grid": [
            {"word": "COO", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "COR", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "COLOR", "row": 2, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["COOL", "LOCO"]
    },
    {
        "id": 52,
        "wonder": "Table Mountain",
        "location": "South Africa",
        "letters": ["P", "E", "A", "K"],
        "targetWords": ["APE", "PEA", "PEAK"],
        "grid": [
            {"word": "APE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "PEA", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "PEAK", "row": 2, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["PECK", "CAKE"]
    },
    {
        "id": 53,
        "wonder": "Dead Sea",
        "location": "Israel/Jordan",
        "letters": ["S", "A", "L", "T", "Y"],
        "targetWords": ["SAT", "SAY", "LAY", "SALT", "SALTY"],
        "grid": [
            {"word": "SAT", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "SAY", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "LAY", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "SALT", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "SALTY", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["LAST", "STAY", "SLAT"]
    },
    {
        "id": 54,
        "wonder": "Yellowstone",
        "location": "Wyoming, USA",
        "letters": ["G", "E", "Y", "S", "E", "R"],
        "targetWords": ["SEE", "YES", "GREY", "GEYSER"],
        "grid": [
            {"word": "SEE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "YES", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "GREY", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "GEYSER", "row": 3, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["EYES", "SEER", "SEERS"]
    },
    {
        "id": 55,
        "wonder": "Lake Baikal",
        "location": "Russia",
        "letters": ["D", "E", "E", "P"],
        "targetWords": ["PEE", "DEEP"],
        "grid": [
            {"word": "PEE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "DEEP", "row": 1, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["PEED", "DEED"]
    },
    {
        "id": 56,
        "wonder": "Cliffs of Moher",
        "location": "Ireland",
        "letters": ["C", "L", "I", "F", "F"],
        "targetWords": ["ILL", "FILL", "CLIFF"],
        "grid": [
            {"word": "ILL", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "FILL", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "CLIFF", "row": 2, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["FLIC"]
    },
    {
        "id": 57,
        "wonder": "Komodo Island",
        "location": "Indonesia",
        "letters": ["W", "I", "L", "D"],
        "targetWords": ["LID", "WILD"],
        "grid": [
            {"word": "LID", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "WILD", "row": 1, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["WILT"]
    },
    {
        "id": 58,
        "wonder": "Plitvice Lakes",
        "location": "Croatia",
        "letters": ["L", "A", "K", "E", "S"],
        "targetWords": ["ALE", "SEA", "LAKE", "LAKES"],
        "grid": [
            {"word": "ALE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "SEA", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "LAKE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "LAKES", "row": 3, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["SAKE", "LEAK", "KALE"]
    },
    {
        "id": 59,
        "wonder": "Zhangjiajie",
        "location": "China",
        "letters": ["A", "V", "A", "T", "A", "R"],
        "targetWords": ["ART", "RAT", "AVATAR"],
        "grid": [
            {"word": "ART", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "RAT", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "AVATAR", "row": 2, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["RATA", "TARA"]
    },
    {
        "id": 60,
        "wonder": "Meteora",
        "location": "Greece",
        "letters": ["R", "O", "C", "K", "S"],
        "targetWords": ["COO", "ROCK", "ROCKS"],
        "grid": [
            {"word": "COO", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "ROCK", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "ROCKS", "row": 2, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["CORK", "SOCK", "CORKS"]
    },
    {
        "id": 61,
        "wonder": "Cappadocia",
        "location": "Turkey",
        "letters": ["C", "A", "V", "E", "S"],
        "targetWords": ["ACE", "AVE", "CAVE", "CAVES"],
        "grid": [
            {"word": "ACE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "AVE", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "CAVE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "CAVES", "row": 3, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["VASE", "SAVE", "ACES"]
    },
    {
        "id": 62,
        "wonder": "Phi Phi Islands",
        "location": "Thailand",
        "letters": ["I", "S", "L", "E"],
        "targetWords": ["LIE", "ISLE"],
        "grid": [
            {"word": "LIE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "ISLE", "row": 1, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["LIES", "SILL"]
    },
    {
        "id": 63,
        "wonder": "Banff National Park",
        "location": "Canada",
        "letters": ["P", "I", "N", "E", "S"],
        "targetWords": ["PEN", "PIN", "PIE", "PINE", "PINES"],
        "grid": [
            {"word": "PEN", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "PIN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "PIE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "PINE", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "PINES", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["SNIP", "SPIN", "PENS", "SPINE"]
    },
    {
        "id": 64,
        "wonder": "Torres del Paine",
        "location": "Chile",
        "letters": ["W", "I", "N", "D", "Y"],
        "targetWords": ["WIN", "DIN", "WIND", "WINDY"],
        "grid": [
            {"word": "WIN", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "DIN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "WIND", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "WINDY", "row": 3, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["WINY", "INDY"]
    },
    {
        "id": 65,
        "wonder": "Milford Sound",
        "location": "New Zealand",
        "letters": ["F", "J", "O", "R", "D"],
        "targetWords": ["FOR", "ROD", "FORD", "FJORD"],
        "grid": [
            {"word": "FOR", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "ROD", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "FORD", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "FJORD", "row": 3, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["DOFF"]
    },
    # Medium Levels (66-100)
    {
        "id": 66,
        "wonder": "Dubrovnik Walls",
        "location": "Croatia",
        "letters": ["S", "T", "O", "R", "M", "Y"],
        "targetWords": ["TRY", "TOY", "SORT", "STORM", "STORMY"],
        "grid": [
            {"word": "TRY", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "TOY", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "SORT", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "STORM", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "STORMY", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["ROTS", "MOST", "STORY"]
    },
    {
        "id": 67,
        "wonder": "Galapagos Islands",
        "location": "Ecuador",
        "letters": ["N", "A", "T", "I", "V", "E"],
        "targetWords": ["TAN", "VAN", "VINE", "NATIVE"],
        "grid": [
            {"word": "TAN", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "VAN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "VINE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "NATIVE", "row": 3, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["VEIN", "VENT", "NAIVE"]
    },
    {
        "id": 68,
        "wonder": "Antelope Canyon",
        "location": "Arizona, USA",
        "letters": ["C", "A", "N", "Y", "O", "N"],
        "targetWords": ["CAN", "CON", "ANY", "CANYON"],
        "grid": [
            {"word": "CAN", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "CON", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "ANY", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "CANYON", "row": 3, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["CANNY", "NANNY"]
    },
    {
        "id": 69,
        "wonder": "Salar de Uyuni",
        "location": "Bolivia",
        "letters": ["M", "I", "R", "R", "O", "R"],
        "targetWords": ["RIM", "MIR", "MIRROR"],
        "grid": [
            {"word": "RIM", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "MIR", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "MIRROR", "row": 2, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["MOOR"]
    },
    {
        "id": 70,
        "wonder": "Sistine Chapel",
        "location": "Vatican City",
        "letters": ["P", "A", "I", "N", "T", "S"],
        "targetWords": ["PAN", "TAN", "SIT", "PAINT", "PAINTS"],
        "grid": [
            {"word": "PAN", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "TAN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "SIT", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "PAINT", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "PAINTS", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["PANT", "SATIN", "SAINT", "PANTS"]
    },
    {
        "id": 71,
        "wonder": "Fairy Pools",
        "location": "Scotland",
        "letters": ["M", "A", "G", "I", "C"],
        "targetWords": ["AIM", "GAG", "MAGIC"],
        "grid": [
            {"word": "AIM", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "GAG", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "MAGIC", "row": 2, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["MICA"]
    },
    {
        "id": 72,
        "wonder": "Marble Caves",
        "location": "Chile",
        "letters": ["M", "A", "R", "B", "L", "E"],
        "targetWords": ["ARM", "BAR", "EAR", "ABLE", "MARBLE"],
        "grid": [
            {"word": "ARM", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "BAR", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "EAR", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "ABLE", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "MARBLE", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["BEAM", "LAMB", "MALE", "BARE", "BLAME"]
    },
    {
        "id": 73,
        "wonder": "Trolltunga",
        "location": "Norway",
        "letters": ["H", "I", "K", "I", "N", "G"],
        "targetWords": ["HIT", "KIN", "INK", "KING", "HIKING"],
        "grid": [
            {"word": "HIT", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "KIN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "INK", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "KING", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "HIKING", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["INKING"]
    },
    {
        "id": 74,
        "wonder": "Preikestolen",
        "location": "Norway",
        "letters": ["V", "I", "E", "W", "S"],
        "targetWords": ["VIE", "SEW", "VIEW", "VIEWS"],
        "grid": [
            {"word": "VIE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "SEW", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "VIEW", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "VIEWS", "row": 3, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["WISE", "WIVE", "VISE"]
    },
    {
        "id": 75,
        "wonder": "Mount Kilimanjaro",
        "location": "Tanzania",
        "letters": ["C", "L", "I", "M", "B"],
        "targetWords": ["LIB", "LIMB", "CLIMB"],
        "grid": [
            {"word": "LIB", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "LIMB", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "CLIMB", "row": 2, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["MILL"]
    },
    {
        "id": 76,
        "wonder": "Waitomo Caves",
        "location": "New Zealand",
        "letters": ["G", "L", "O", "W", "S"],
        "targetWords": ["LOG", "LOW", "SOW", "GLOW", "GLOWS"],
        "grid": [
            {"word": "LOG", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "LOW", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "SOW", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "GLOW", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "GLOWS", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["SLOW", "LOWS", "LOGS", "OWLS"]
    },
    {
        "id": 77,
        "wonder": "Pamukkale",
        "location": "Turkey",
        "letters": ["P", "O", "O", "L", "S"],
        "targetWords": ["SOL", "POL", "POOL", "POOLS"],
        "grid": [
            {"word": "SOL", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "POL", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "POOL", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "POOLS", "row": 3, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["LOOP", "SPOOL", "LOOPS"]
    },
    {
        "id": 78,
        "wonder": "Dolomites",
        "location": "Italy",
        "letters": ["S", "U", "M", "M", "I", "T"],
        "targetWords": ["SIT", "SUM", "MIST", "SUMMIT"],
        "grid": [
            {"word": "SIT", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "SUM", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "MIST", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "SUMMIT", "row": 3, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["MUST", "SMUT", "MITT"]
    },
    {
        "id": 79,
        "wonder": "Angel Falls",
        "location": "Venezuela",
        "letters": ["F", "A", "L", "L", "I", "N", "G"],
        "targetWords": ["ALL", "ILL", "FAN", "FALL", "FALLING"],
        "grid": [
            {"word": "ALL", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "ILL", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "FAN", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "FALL", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "FALLING", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["FILL", "NAIL", "FANG", "FINAL"]
    },
    {
        "id": 80,
        "wonder": "Blue Lagoon",
        "location": "Iceland",
        "letters": ["S", "T", "E", "A", "M", "Y"],
        "targetWords": ["SAT", "EAT", "MAT", "STEAM", "STEAMY"],
        "grid": [
            {"word": "SAT", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "EAT", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "MAT", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "STEAM", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "STEAMY", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["YEAST", "MEATY", "TEAMS", "MATES"]
    },
    {
        "id": 81,
        "wonder": "Lofoten Islands",
        "location": "Norway",
        "letters": ["A", "R", "C", "T", "I", "C"],
        "targetWords": ["ARC", "ART", "CAR", "RAT", "ARCTIC"],
        "grid": [
            {"word": "ARC", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "ART", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "CAR", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "RAT", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "ARCTIC", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["CART", "TACT", "TRACT"]
    },
    {
        "id": 82,
        "wonder": "Sossusvlei",
        "location": "Namibia",
        "letters": ["D", "E", "S", "E", "R", "T"],
        "targetWords": ["SET", "RED", "REST", "STEER", "DESERT"],
        "grid": [
            {"word": "SET", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "RED", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "REST", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "STEER", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "DESERT", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["SEED", "TREE", "RESET", "TREES", "RESTED"]
    },
    {
        "id": 83,
        "wonder": "Mount Everest",
        "location": "Nepal/Tibet",
        "letters": ["H", "E", "I", "G", "H", "T"],
        "targetWords": ["HIT", "GET", "THE", "HIGH", "HEIGHT"],
        "grid": [
            {"word": "HIT", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "GET", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "THE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "HIGH", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "HEIGHT", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["EIGHT", "THIGH"]
    },
    {
        "id": 84,
        "wonder": "Fiordland",
        "location": "New Zealand",
        "letters": ["S", "C", "E", "N", "I", "C"],
        "targetWords": ["ICE", "SIN", "NICE", "SCENE", "SCENIC"],
        "grid": [
            {"word": "ICE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "SIN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "NICE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "SCENE", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "SCENIC", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["SINCE", "ICES"]
    },
    {
        "id": 85,
        "wonder": "K2 Mountain",
        "location": "Pakistan/China",
        "letters": ["E", "X", "T", "R", "E", "M", "E"],
        "targetWords": ["MET", "TEE", "TREE", "METER", "EXTREME"],
        "grid": [
            {"word": "MET", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "TEE", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "TREE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "METER", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "EXTREME", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["MEET", "TERM", "REMEET"]
    },
    {
        "id": 86,
        "wonder": "Sequoia Forest",
        "location": "California, USA",
        "letters": ["G", "I", "A", "N", "T", "S"],
        "targetWords": ["TAN", "ANT", "SIT", "GAIN", "GIANT", "GIANTS"],
        "grid": [
            {"word": "TAN", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "ANT", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "SIT", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "GAIN", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "GIANT", "row": 4, "col": 0, "direction": "horizontal"},
            {"word": "GIANTS", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["SATIN", "SAINT", "STAIN", "GAINS"]
    },
    {
        "id": 87,
        "wonder": "Venetian Canals",
        "location": "Italy",
        "letters": ["G", "O", "N", "D", "O", "L", "A"],
        "targetWords": ["GOD", "OLD", "NOD", "ALONG", "GONDOLA"],
        "grid": [
            {"word": "GOD", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "OLD", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "NOD", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "ALONG", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "GONDOLA", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["LOAD", "GOAL", "DRAGON"]
    },
    {
        "id": 88,
        "wonder": "Sahara Desert",
        "location": "Africa",
        "letters": ["S", "A", "H", "A", "R", "A"],
        "targetWords": ["HAS", "ASH", "SAH", "SAHARA"],
        "grid": [
            {"word": "HAS", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "ASH", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "SAH", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "SAHARA", "row": 3, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["RASH"]
    },
    {
        "id": 89,
        "wonder": "Petra Treasury",
        "location": "Jordan",
        "letters": ["A", "N", "C", "I", "E", "N", "T"],
        "targetWords": ["ACE", "ANT", "CAN", "NEAT", "ANCIENT"],
        "grid": [
            {"word": "ACE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "ANT", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "CAN", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "NEAT", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "ANCIENT", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["CANE", "CENT", "NICE", "ACNE", "ANTIC"]
    },
    {
        "id": 90,
        "wonder": "Redwood Forest",
        "location": "California, USA",
        "letters": ["F", "O", "R", "E", "S", "T"],
        "targetWords": ["FOR", "SET", "ROT", "FORE", "REST", "FOREST"],
        "grid": [
            {"word": "FOR", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "SET", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "ROT", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "FORE", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "REST", "row": 4, "col": 0, "direction": "horizontal"},
            {"word": "FOREST", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["SORT", "STORE", "FROST", "FORTE"]
    },
    # Hard Levels (91-150)
    {
        "id": 91,
        "wonder": "Machu Picchu Sunrise",
        "location": "Peru",
        "letters": ["S", "U", "N", "R", "I", "S", "E"],
        "targetWords": ["SUN", "RUN", "USE", "RUIN", "RISEN", "SUNRISE"],
        "grid": [
            {"word": "SUN", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "RUN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "USE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "RUIN", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "RISEN", "row": 4, "col": 0, "direction": "horizontal"},
            {"word": "SUNRISE", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["RISE", "SURE", "NURSE", "RUINS", "RINSE"]
    },
    {
        "id": 92,
        "wonder": "Northern Lights Display",
        "location": "Norway",
        "letters": ["A", "U", "R", "O", "R", "A"],
        "targetWords": ["OAR", "OUR", "AURA", "AURORA"],
        "grid": [
            {"word": "OAR", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "OUR", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "AURA", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "AURORA", "row": 3, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["ROAR"]
    },
    {
        "id": 93,
        "wonder": "Egyptian Sphinx",
        "location": "Egypt",
        "letters": ["P", "H", "A", "R", "A", "O", "H"],
        "targetWords": ["HAP", "RAP", "PARA", "PHARAOH"],
        "grid": [
            {"word": "HAP", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "RAP", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "PARA", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "PHARAOH", "row": 3, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["HARP"]
    },
    {
        "id": 94,
        "wonder": "Mount Rushmore",
        "location": "South Dakota, USA",
        "letters": ["C", "A", "R", "V", "I", "N", "G"],
        "targetWords": ["CAR", "VAN", "ARC", "GRAIN", "CARVING"],
        "grid": [
            {"word": "CAR", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "VAN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "ARC", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "GRAIN", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "CARVING", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["RACING", "ARCING", "RAVING"]
    },
    {
        "id": 95,
        "wonder": "Roman Forum",
        "location": "Rome, Italy",
        "letters": ["E", "M", "P", "I", "R", "E"],
        "targetWords": ["PIE", "RIP", "PIER", "PRIME", "EMPIRE"],
        "grid": [
            {"word": "PIE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "RIP", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "PIER", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "PRIME", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "EMPIRE", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["MERE", "PEER", "MIRE", "RIPER", "PREMIER"]
    },
    {
        "id": 96,
        "wonder": "Eiffel at Night",
        "location": "Paris, France",
        "letters": ["S", "P", "A", "R", "K", "L", "E"],
        "targetWords": ["PAL", "EAR", "LAKE", "PEARL", "SPARKLE"],
        "grid": [
            {"word": "PAL", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "EAR", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "LAKE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "PEARL", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "SPARKLE", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["SPEAK", "SPARE", "PARKS", "SPEAR", "LEAPS"]
    },
    {
        "id": 97,
        "wonder": "Statue of Liberty Torch",
        "location": "New York, USA",
        "letters": ["L", "I", "B", "E", "R", "T", "Y"],
        "targetWords": ["LET", "BIT", "RIB", "TRIBE", "LIBERTY"],
        "grid": [
            {"word": "LET", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "BIT", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "RIB", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "TRIBE", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "LIBERTY", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["BITE", "RELY", "BELT", "BITER", "ERLY"]
    },
    {
        "id": 98,
        "wonder": "Great Barrier Reef Diving",
        "location": "Australia",
        "letters": ["D", "I", "V", "I", "N", "G"],
        "targetWords": ["DIG", "DIN", "VID", "DIVING"],
        "grid": [
            {"word": "DIG", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "DIN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "VID", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "DIVING", "row": 3, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["GIVING", "VINING"]
    },
    {
        "id": 99,
        "wonder": "Amazon River",
        "location": "South America",
        "letters": ["J", "U", "N", "G", "L", "E"],
        "targetWords": ["GUN", "LEG", "LUG", "LUNGE", "JUNGLE"],
        "grid": [
            {"word": "GUN", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "LEG", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "LUG", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "LUNGE", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "JUNGLE", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["GLUE", "LUNG"]
    },
    {
        "id": 100,
        "wonder": "Himalayan Peak",
        "location": "Asia",
        "letters": ["E", "T", "E", "R", "N", "A", "L"],
        "targetWords": ["EAR", "TAN", "ATE", "LEARN", "ETERNAL"],
        "grid": [
            {"word": "EAR", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "TAN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "ATE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "LEARN", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "ETERNAL", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["RATE", "LATER", "ALTER", "RENAL", "RENTAL"]
    },
    {
        "id": 101,
        "wonder": "Grand Palace",
        "location": "Bangkok, Thailand",
        "letters": ["G", "O", "L", "D", "E", "N"],
        "targetWords": ["GOD", "OLD", "DOE", "GONE", "GOLDEN"],
        "grid": [
            {"word": "GOD", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "OLD", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "DOE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "GONE", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "GOLDEN", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["DONE", "NODE", "LODE", "LODGE", "OGLED"]
    },
    {
        "id": 102,
        "wonder": "Forbidden Palace Gardens",
        "location": "Beijing, China",
        "letters": ["S", "E", "R", "E", "N", "E"],
        "targetWords": ["SEE", "ERE", "SEEN", "SERENE"],
        "grid": [
            {"word": "SEE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "ERE", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "SEEN", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "SERENE", "row": 3, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["SNEER", "SEER"]
    },
    {
        "id": 103,
        "wonder": "Versailles Mirror Hall",
        "location": "France",
        "letters": ["R", "E", "F", "L", "E", "C", "T"],
        "targetWords": ["LET", "REF", "FEEL", "FLEET", "REFLECT"],
        "grid": [
            {"word": "LET", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "REF", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "FEEL", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "FLEET", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "REFLECT", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["FREE", "TREE", "LEFT", "ELECT", "ERECT"]
    },
    {
        "id": 104,
        "wonder": "Taj Mahal Gardens",
        "location": "India",
        "letters": ["P", "E", "A", "C", "E", "F", "U", "L"],
        "targetWords": ["CUP", "EEL", "LEAP", "PEACE", "PEACEFUL"],
        "grid": [
            {"word": "CUP", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "EEL", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "LEAP", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "PEACE", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "PEACEFUL", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["CAPE", "FACE", "PLACE", "USEFUL"]
    },
    {
        "id": 105,
        "wonder": "Angkor Sunrise",
        "location": "Cambodia",
        "letters": ["T", "E", "M", "P", "L", "E", "S"],
        "targetWords": ["SET", "PET", "MEET", "STEEP", "TEMPLES"],
        "grid": [
            {"word": "SET", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "PET", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "MEET", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "STEEP", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "TEMPLES", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["STEP", "SLEET", "MELTS", "PELTS"]
    },
    {
        "id": 106,
        "wonder": "Stonehenge Solstice",
        "location": "England, UK",
        "letters": ["M", "Y", "S", "T", "I", "C"],
        "targetWords": ["SIT", "ITS", "CITY", "MIST", "MYSTIC"],
        "grid": [
            {"word": "SIT", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "ITS", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "CITY", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "MIST", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "MYSTIC", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["STIC", "CYST", "MISTY"]
    },
    {
        "id": 107,
        "wonder": "Alhambra Palace",
        "location": "Granada, Spain",
        "letters": ["C", "A", "R", "V", "I", "N", "G", "S"],
        "targetWords": ["CAR", "VAN", "SIN", "GRAINS", "CARVINGS"],
        "grid": [
            {"word": "CAR", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "VAN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "SIN", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "GRAINS", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "CARVINGS", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["RACING", "CARING", "SAVING", "RAVING"]
    },
    {
        "id": 108,
        "wonder": "Uluru Sunset",
        "location": "Australia",
        "letters": ["S", "U", "N", "S", "E", "T", "S"],
        "targetWords": ["SUN", "SET", "NUT", "SUNSET", "SUNSETS"],
        "grid": [
            {"word": "SUN", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "SET", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "NUT", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "SUNSET", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "SUNSETS", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["NEST", "NUTS", "TENS", "SETS", "TUNES"]
    },
    {
        "id": 109,
        "wonder": "Vatican Dome",
        "location": "Vatican City",
        "letters": ["H", "E", "A", "V", "E", "N", "S"],
        "targetWords": ["HAS", "VAN", "SEA", "HAVEN", "HEAVENS"],
        "grid": [
            {"word": "HAS", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "VAN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "SEA", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "HAVEN", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "HEAVENS", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["HAVE", "SAVE", "SHAVE", "HEAVE"]
    },
    {
        "id": 110,
        "wonder": "Burj Al Arab",
        "location": "Dubai, UAE",
        "letters": ["L", "U", "X", "U", "R", "Y"],
        "targetWords": ["RYE", "LUXURY"],
        "grid": [
            {"word": "RYE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "LUXURY", "row": 1, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["TRULY"]
    },
    {
        "id": 111,
        "wonder": "Kremlin Towers",
        "location": "Moscow, Russia",
        "letters": ["P", "O", "W", "E", "R", "F", "U", "L"],
        "targetWords": ["ROW", "OWE", "FLOW", "POWER", "POWERFUL"],
        "grid": [
            {"word": "ROW", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "OWE", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "FLOW", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "POWER", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "POWERFUL", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["WOLF", "FOWL", "LOWER", "PROWL", "FLOWER"]
    },
    {
        "id": 112,
        "wonder": "Sydney Harbour",
        "location": "Australia",
        "letters": ["H", "A", "R", "B", "O", "R"],
        "targetWords": ["BAR", "OAR", "ROB", "ROAR", "HARBOR"],
        "grid": [
            {"word": "BAR", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "OAR", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "ROB", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "ROAR", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "HARBOR", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["BOAR"]
    },
    {
        "id": 113,
        "wonder": "Santorini Sunset",
        "location": "Greece",
        "letters": ["R", "O", "M", "A", "N", "T", "I", "C"],
        "targetWords": ["TAN", "CAN", "MAN", "MINT", "ROMANTIC"],
        "grid": [
            {"word": "TAN", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "CAN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "MAN", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "MINT", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "ROMANTIC", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["MAIN", "TRAIN", "RATION", "MANIAC"]
    },
    {
        "id": 114,
        "wonder": "Maldives Paradise",
        "location": "Indian Ocean",
        "letters": ["P", "A", "R", "A", "D", "I", "S", "E"],
        "targetWords": ["SAD", "AIR", "RED", "RAISE", "PARADISE"],
        "grid": [
            {"word": "SAD", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "AIR", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "RED", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "RAISE", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "PARADISE", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["PAIR", "RIDE", "PRIDE", "SPIDER"]
    },
    {
        "id": 115,
        "wonder": "Bora Bora Lagoon",
        "location": "French Polynesia",
        "letters": ["L", "A", "G", "O", "O", "N"],
        "targetWords": ["LOG", "GAL", "ALONG", "LAGOON"],
        "grid": [
            {"word": "LOG", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "GAL", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "ALONG", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "LAGOON", "row": 3, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["GOAL", "GOON"]
    },
    {
        "id": 116,
        "wonder": "Maui Beaches",
        "location": "Hawaii, USA",
        "letters": ["T", "R", "O", "P", "I", "C", "S"],
        "targetWords": ["TOP", "SIT", "COP", "TRIP", "TOPIC", "TROPICS"],
        "grid": [
            {"word": "TOP", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "SIT", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "COP", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "TRIP", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "TOPIC", "row": 4, "col": 0, "direction": "horizontal"},
            {"word": "TROPICS", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["PORT", "SPORT", "STRIP", "OPTIC"]
    },
    {
        "id": 117,
        "wonder": "Fiji Islands",
        "location": "South Pacific",
        "letters": ["I", "S", "L", "A", "N", "D", "S"],
        "targetWords": ["AID", "LID", "SAIL", "LANDS", "ISLANDS"],
        "grid": [
            {"word": "AID", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "LID", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "SAIL", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "LANDS", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "ISLANDS", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["SLAIN", "SNAIL", "NAILS"]
    },
    {
        "id": 118,
        "wonder": "Seychelles Beach",
        "location": "Indian Ocean",
        "letters": ["C", "R", "Y", "S", "T", "A", "L"],
        "targetWords": ["CAR", "SAT", "CRY", "SALTY", "CRYSTAL"],
        "grid": [
            {"word": "CAR", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "SAT", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "CRY", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "SALTY", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "CRYSTAL", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["CAST", "LAST", "ARTSY", "SCARY"]
    },
    {
        "id": 119,
        "wonder": "Palau Rock Islands",
        "location": "Pacific Ocean",
        "letters": ["P", "A", "R", "A", "D", "I", "S", "E"],
        "targetWords": ["AIR", "RAP", "PAID", "RAPID", "PARADISE"],
        "grid": [
            {"word": "AIR", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "RAP", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "PAID", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "RAPID", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "PARADISE", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["PAIR", "DEAR", "IDEA", "RAISED", "PRAISE"]
    },
    {
        "id": 120,
        "wonder": "Bali Temples",
        "location": "Indonesia",
        "letters": ["S", "P", "I", "R", "I", "T", "U", "A", "L"],
        "targetWords": ["SIT", "PIT", "SPUR", "SPIRIT", "SPIRITUAL"],
        "grid": [
            {"word": "SIT", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "PIT", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "SPUR", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "SPIRIT", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "SPIRITUAL", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["TRIP", "TULIP", "SPIRAL", "TRAILS"]
    },
    {
        "id": 121,
        "wonder": "Dubai Marina",
        "location": "UAE",
        "letters": ["S", "K", "Y", "L", "I", "N", "E"],
        "targetWords": ["SKY", "SLY", "LINE", "SILKY", "SKYLINE"],
        "grid": [
            {"word": "SKY", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "SLY", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "LINE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "SILKY", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "SKYLINE", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["LIKE", "SILK", "LINES", "INKY"]
    },
    {
        "id": 122,
        "wonder": "Hong Kong Peak",
        "location": "China",
        "letters": ["G", "L", "I", "T", "T", "E", "R"],
        "targetWords": ["LET", "LIT", "TILE", "LITTER", "GLITTER"],
        "grid": [
            {"word": "LET", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "LIT", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "TILE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "LITTER", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "GLITTER", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["GRIT", "TILT", "TITLE", "LITRE"]
    },
    {
        "id": 123,
        "wonder": "Singapore Gardens",
        "location": "Singapore",
        "letters": ["F", "U", "T", "U", "R", "E"],
        "targetWords": ["FUR", "RUT", "TRUE", "TURF", "FUTURE"],
        "grid": [
            {"word": "FUR", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "RUT", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "TRUE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "TURF", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "FUTURE", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["FRET", "ERUPT", "TRUER"]
    },
    {
        "id": 124,
        "wonder": "Tokyo Tower",
        "location": "Japan",
        "letters": ["M", "O", "D", "E", "R", "N"],
        "targetWords": ["DEN", "MOD", "MORE", "DRONE", "MODERN"],
        "grid": [
            {"word": "DEN", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "MOD", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "MORE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "DRONE", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "MODERN", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["NORM", "RODE", "DOME", "DEMON", "RODEO"]
    },
    {
        "id": 125,
        "wonder": "Osaka Castle",
        "location": "Japan",
        "letters": ["H", "E", "R", "I", "T", "A", "G", "E"],
        "targetWords": ["AGE", "EAT", "GEAR", "GREAT", "HERITAGE"],
        "grid": [
            {"word": "AGE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "EAT", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "GEAR", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "GREAT", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "HERITAGE", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["HATE", "HEAR", "HEART", "EITHER", "GATHER"]
    },
    {
        "id": 126,
        "wonder": "Kyoto Temples",
        "location": "Japan",
        "letters": ["T", "R", "A", "N", "Q", "U", "I", "L"],
        "targetWords": ["RAN", "TAN", "QUILT", "TRAIL", "TRANQUIL"],
        "grid": [
            {"word": "RAN", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "TAN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "QUILT", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "TRAIL", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "TRANQUIL", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["QUIT", "UNIT", "UNTIL", "TRAIN"]
    },
    {
        "id": 127,
        "wonder": "Seoul Palace",
        "location": "South Korea",
        "letters": ["H", "I", "S", "T", "O", "R", "I", "C"],
        "targetWords": ["HIS", "SIT", "CHOIR", "HISTORIC"],
        "grid": [
            {"word": "HIS", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "SIT", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "CHOIR", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "HISTORIC", "row": 3, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["RICH", "SHIRT", "STIR", "RIOTS"]
    },
    {
        "id": 128,
        "wonder": "Mount Fuji View",
        "location": "Japan",
        "letters": ["P", "I", "C", "T", "U", "R", "E"],
        "targetWords": ["CUT", "RIP", "TIP", "TRIP", "PICTURE"],
        "grid": [
            {"word": "CUT", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "RIP", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "TIP", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "TRIP", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "PICTURE", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["RICE", "CURE", "PURE", "RIPE", "ERUPT", "TRIPE"]
    },
    {
        "id": 129,
        "wonder": "Great Ocean Road",
        "location": "Australia",
        "letters": ["S", "E", "A", "S", "I", "D", "E"],
        "targetWords": ["SEA", "AID", "SIDE", "IDEAS", "SEASIDE"],
        "grid": [
            {"word": "SEA", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "AID", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "SIDE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "IDEAS", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "SEASIDE", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["SAID", "EASE", "SEED", "EASED"]
    },
    {
        "id": 130,
        "wonder": "Whitsunday Islands",
        "location": "Australia",
        "letters": ["B", "E", "A", "C", "H", "E", "S"],
        "targetWords": ["BEE", "ACE", "HAS", "BEACH", "BEACHES"],
        "grid": [
            {"word": "BEE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "ACE", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "HAS", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "BEACH", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "BEACHES", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["EACH", "ACHE", "CHASE", "CACHE"]
    },
    {
        "id": 131,
        "wonder": "Twelve Apostles",
        "location": "Australia",
        "letters": ["C", "O", "A", "S", "T", "A", "L"],
        "targetWords": ["CAT", "SAT", "COAT", "COAST", "COASTAL"],
        "grid": [
            {"word": "CAT", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "SAT", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "COAT", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "COAST", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "COASTAL", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["CAST", "LAST", "COAL", "COATS", "ATLAS"]
    },
    {
        "id": 132,
        "wonder": "Kakadu Park",
        "location": "Australia",
        "letters": ["N", "A", "T", "U", "R", "A", "L"],
        "targetWords": ["TAN", "RAN", "ULTRA", "NATURAL"],
        "grid": [
            {"word": "TAN", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "RAN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "ULTRA", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "NATURAL", "row": 3, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["LUNAR", "RURAL", "AUNT", "NATAL"]
    },
    {
        "id": 133,
        "wonder": "Fraser Island",
        "location": "Australia",
        "letters": ["W", "I", "L", "D", "E", "R", "N", "E", "S", "S"],
        "targetWords": ["RED", "LED", "WIN", "WISER", "WILDERNESS"],
        "grid": [
            {"word": "RED", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "LED", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "WIN", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "WISER", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "WILDERNESS", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["WIRE", "DRESS", "WEIRD", "SIREN"]
    },
    {
        "id": 134,
        "wonder": "Blue Mountains",
        "location": "Australia",
        "letters": ["E", "S", "C", "A", "R", "P", "E", "D"],
        "targetWords": ["CAR", "EAR", "CAPE", "SPACE", "ESCAPED"],
        "grid": [
            {"word": "CAR", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "EAR", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "CAPE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "SPACE", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "ESCAPED", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["PACE", "SCARE", "PACED", "SCRAPED"]
    },
    {
        "id": 135,
        "wonder": "Rotorua Geysers",
        "location": "New Zealand",
        "letters": ["G", "E", "O", "T", "H", "E", "R", "M", "A", "L"],
        "targetWords": ["THE", "HER", "EAT", "GREAT", "THERMAL", "GEOTHERMAL"],
        "grid": [
            {"word": "THE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "HER", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "EAT", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "GREAT", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "THERMAL", "row": 4, "col": 0, "direction": "horizontal"},
            {"word": "GEOTHERMAL", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["HEART", "EARTH", "METAL", "GATHER"]
    },
    {
        "id": 136,
        "wonder": "Hobbiton",
        "location": "New Zealand",
        "letters": ["F", "A", "N", "T", "A", "S", "Y"],
        "targetWords": ["FAN", "SAT", "TAN", "FAST", "FANTASY"],
        "grid": [
            {"word": "FAN", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "SAT", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "TAN", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "FAST", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "FANTASY", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["NASTY", "FANS", "STAY", "ANTS"]
    },
    {
        "id": 137,
        "wonder": "Queenstown",
        "location": "New Zealand",
        "letters": ["A", "D", "V", "E", "N", "T", "U", "R", "E"],
        "targetWords": ["RAN", "VET", "EAT", "VENT", "ADVENTURE"],
        "grid": [
            {"word": "RAN", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "VET", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "EAT", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "VENT", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "ADVENTURE", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["RAVE", "DARE", "TREND", "NATURE", "ADVENT"]
    },
    {
        "id": 138,
        "wonder": "Tekapo Lake",
        "location": "New Zealand",
        "letters": ["S", "T", "A", "R", "R", "Y"],
        "targetWords": ["SAT", "RAT", "ART", "STAR", "STARRY"],
        "grid": [
            {"word": "SAT", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "RAT", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "ART", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "STAR", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "STARRY", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["TRAY", "ARTY", "RATS", "ARTS"]
    },
    {
        "id": 139,
        "wonder": "Abel Tasman",
        "location": "New Zealand",
        "letters": ["P", "R", "I", "S", "T", "I", "N", "E"],
        "targetWords": ["TIP", "SIT", "RIP", "TRIP", "PRISTINE"],
        "grid": [
            {"word": "TIP", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "SIT", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "RIP", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "TRIP", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "PRISTINE", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["SPIN", "PRINT", "STRIPE", "SIREN"]
    },
    {
        "id": 140,
        "wonder": "Franz Josef Glacier",
        "location": "New Zealand",
        "letters": ["G", "L", "A", "C", "I", "E", "R"],
        "targetWords": ["ICE", "AGE", "LACE", "GRACE", "GLACIER"],
        "grid": [
            {"word": "ICE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "AGE", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "LACE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "GRACE", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "GLACIER", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["RACE", "CAGE", "CLEAR", "REGAL", "GARLIC"]
    },
    {
        "id": 141,
        "wonder": "Cradle Mountain",
        "location": "Tasmania",
        "letters": ["W", "I", "L", "D", "E", "R", "N", "E", "S", "S"],
        "targetWords": ["RED", "WIN", "LED", "SIREN", "WILDERNESS"],
        "grid": [
            {"word": "RED", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "WIN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "LED", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "SIREN", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "WILDERNESS", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["WISE", "WIRE", "DRESS", "WISER"]
    },
    {
        "id": 142,
        "wonder": "Ha Long Karsts",
        "location": "Vietnam",
        "letters": ["L", "I", "M", "E", "S", "T", "O", "N", "E"],
        "targetWords": ["LET", "MET", "SET", "TONE", "STONE", "LIMESTONE"],
        "grid": [
            {"word": "LET", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "MET", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "SET", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "TONE", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "STONE", "row": 4, "col": 0, "direction": "horizontal"},
            {"word": "LIMESTONE", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["NEST", "MELT", "LINES", "MILES", "MELONS"]
    },
    {
        "id": 143,
        "wonder": "Angkor Wat Ruins",
        "location": "Cambodia",
        "letters": ["M", "A", "G", "N", "I", "F", "I", "C", "E", "N", "T"],
        "targetWords": ["MAN", "CAN", "FIT", "MAGIC", "MAGNIFICENT"],
        "grid": [
            {"word": "MAN", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "CAN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "FIT", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "MAGIC", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "MAGNIFICENT", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["GAIN", "MINT", "FACT", "GIANT"]
    },
    {
        "id": 144,
        "wonder": "Borobudur Temple",
        "location": "Indonesia",
        "letters": ["M", "O", "N", "U", "M", "E", "N", "T"],
        "targetWords": ["MEN", "TEN", "NET", "MOUNT", "MONUMENT"],
        "grid": [
            {"word": "MEN", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "TEN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "NET", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "MOUNT", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "MONUMENT", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["TONE", "MENU", "MUTT", "MOMENT"]
    },
    {
        "id": 145,
        "wonder": "Prambanan Temple",
        "location": "Indonesia",
        "letters": ["S", "A", "C", "R", "E", "D"],
        "targetWords": ["CAR", "RED", "SAD", "SCARE", "SACRED"],
        "grid": [
            {"word": "CAR", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "RED", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "SAD", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "SCARE", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "SACRED", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["RACE", "CARD", "CEDAR", "SCARED"]
    },
    {
        "id": 146,
        "wonder": "Luang Prabang",
        "location": "Laos",
        "letters": ["T", "E", "M", "P", "L", "E"],
        "targetWords": ["MET", "PET", "LET", "MEET", "TEMPLE"],
        "grid": [
            {"word": "MET", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "PET", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "LET", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "MEET", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "TEMPLE", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["PEEL", "MELT", "PELT", "STEEP"]
    },
    {
        "id": 147,
        "wonder": "Bagan Sunset",
        "location": "Myanmar",
        "letters": ["M", "Y", "S", "T", "I", "C", "A", "L"],
        "targetWords": ["SIT", "ACT", "ITS", "MIST", "MYSTIC", "MYSTICAL"],
        "grid": [
            {"word": "SIT", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "ACT", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "ITS", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "MIST", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "MYSTIC", "row": 4, "col": 0, "direction": "horizontal"},
            {"word": "MYSTICAL", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["CAST", "LAST", "MISTY", "SILTY"]
    },
    {
        "id": 148,
        "wonder": "Shwedagon Pagoda",
        "location": "Myanmar",
        "letters": ["G", "O", "L", "D", "E", "N"],
        "targetWords": ["GOD", "OLD", "DOE", "NODE", "GOLDEN"],
        "grid": [
            {"word": "GOD", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "OLD", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "DOE", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "NODE", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "GOLDEN", "row": 4, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["DONE", "LODE", "LODGE", "OGLED"]
    },
    {
        "id": 149,
        "wonder": "Inle Lake",
        "location": "Myanmar",
        "letters": ["S", "E", "R", "E", "N", "E"],
        "targetWords": ["SEE", "ERE", "SEEN", "SERENE"],
        "grid": [
            {"word": "SEE", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "ERE", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "SEEN", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "SERENE", "row": 3, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["SEER", "SNEER"]
    },
    {
        "id": 150,
        "wonder": "Final Wonder",
        "location": "World Champion",
        "letters": ["C", "H", "A", "M", "P", "I", "O", "N"],
        "targetWords": ["COP", "MAN", "CAN", "MAIN", "CHAMP", "CHAMPION"],
        "grid": [
            {"word": "COP", "row": 0, "col": 0, "direction": "horizontal"},
            {"word": "MAN", "row": 1, "col": 0, "direction": "horizontal"},
            {"word": "CAN", "row": 2, "col": 0, "direction": "horizontal"},
            {"word": "MAIN", "row": 3, "col": 0, "direction": "horizontal"},
            {"word": "CHAMP", "row": 4, "col": 0, "direction": "horizontal"},
            {"word": "CHAMPION", "row": 5, "col": 0, "direction": "horizontal"}
        ],
        "bonusWords": ["CHIN", "COIN", "CAMP", "CHOMP", "PANIC"]
    }
]

# Merge all levels
LEVEL_DATA = LEVEL_DATA + ADDITIONAL_LEVELS
