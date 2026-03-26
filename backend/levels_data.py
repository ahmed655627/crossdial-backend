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
