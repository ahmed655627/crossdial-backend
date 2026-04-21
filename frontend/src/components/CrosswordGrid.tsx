import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useGameStore, GridPosition } from '../store/gameStore';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 750;

// Vibrant color palette for found words - each word gets a different color
const WORD_COLORS = [
  ['#FF6B6B', '#EE5A5A', '#DD4949'], // Coral Red
  ['#4ECDC4', '#3DBDB5', '#2CADA6'], // Teal
  ['#45B7D1', '#34A7C1', '#2397B1'], // Sky Blue
  ['#96CEB4', '#86BEA4', '#76AE94'], // Sage Green
  ['#FFEAA7', '#FFE066', '#FFD633'], // Golden Yellow
  ['#DDA0DD', '#CD8FCD', '#BD7EBD'], // Plum
  ['#98D8C8', '#88C8B8', '#78B8A8'], // Mint
  ['#F7DC6F', '#F5D03B', '#F3C407'], // Sunflower
  ['#BB8FCE', '#AB7FBE', '#9B6FAE'], // Lavender
  ['#85C1E9', '#75B1D9', '#65A1C9'], // Light Blue
];

export const CrosswordGrid: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { currentLevel, foundWords, hintLetter } = useGameStore();
  
  if (!currentLevel) return null;
  
  const grid = currentLevel.grid;
  let maxRow = 0;
  let maxCol = 0;
  
  grid.forEach((wordPos: GridPosition) => {
    const wordLength = wordPos.word.length;
    if (wordPos.direction === 'horizontal') {
      maxRow = Math.max(maxRow, wordPos.row);
      maxCol = Math.max(maxCol, wordPos.col + wordLength - 1);
    } else {
      maxRow = Math.max(maxRow, wordPos.row + wordLength - 1);
      maxCol = Math.max(maxCol, wordPos.col);
    }
  });
  
  const numRows = maxRow + 1;
  const numCols = maxCol + 1;
  
  // Calculate optimal cell size
  const maxGridWidth = width * 0.88;
  const baseSize = compact ? 36 : (isSmallScreen ? 38 : 42);
  const cellSize = Math.min(Math.floor(maxGridWidth / numCols), baseSize);
  const cellGap = 3;
  
  // Build cells with word color info
  const cells: (string | null)[][] = Array(numRows).fill(null).map(() => Array(numCols).fill(null));
  const cellFound: boolean[][] = Array(numRows).fill(null).map(() => Array(numCols).fill(false));
  const cellWordIndex: number[][] = Array(numRows).fill(null).map(() => Array(numCols).fill(-1));
  const cellHinted: boolean[][] = Array(numRows).fill(null).map(() => Array(numCols).fill(false));
  const hintedLetters: (string | null)[][] = Array(numRows).fill(null).map(() => Array(numCols).fill(null));
  
  // Track which word index for color assignment
  let wordColorIndex = 0;
  const wordColorMap: { [key: string]: number } = {};
  
  grid.forEach((wordPos: GridPosition) => {
    const word = wordPos.word.toUpperCase();
    const isFound = foundWords.includes(word);
    
    // Assign color index to each word
    if (!(word in wordColorMap)) {
      wordColorMap[word] = wordColorIndex;
      wordColorIndex++;
    }
    
    for (let i = 0; i < word.length; i++) {
      let row = wordPos.row;
      let col = wordPos.col;
      
      if (wordPos.direction === 'horizontal') {
        col += i;
      } else {
        row += i;
      }
      
      cells[row][col] = word[i];
      if (isFound) {
        cellFound[row][col] = true;
        cellWordIndex[row][col] = wordColorMap[word];
      }
      
      if (hintLetter && 
          hintLetter.position.word.toUpperCase() === word && 
          hintLetter.letterIndex === i) {
        cellHinted[row][col] = true;
        hintedLetters[row][col] = hintLetter.letter;
      }
    }
  });
  
  return (
    <View style={styles.container}>
      <View style={styles.gridWrapper}>
        {cells.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => {
              if (cell === null) {
                return (
                  <View 
                    key={colIndex} 
                    style={[styles.emptySpace, { width: cellSize, height: cellSize, margin: cellGap / 2 }]} 
                  />
                );
              }
              
              const isFound = cellFound[rowIndex][colIndex];
              const isHinted = cellHinted[rowIndex][colIndex];
              const hintedLetter = hintedLetters[rowIndex][colIndex];
              const wordIdx = cellWordIndex[rowIndex][colIndex];
              
              // Found cell - Vibrant color based on word
              if (isFound) {
                const colors = WORD_COLORS[wordIdx % WORD_COLORS.length];
                return (
                  <View key={colIndex} style={[styles.cellWrapper, { width: cellSize, height: cellSize, margin: cellGap / 2 }]}>
                    <LinearGradient
                      colors={colors}
                      style={styles.foundCell}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      {/* Top shine effect */}
                      <View style={styles.cellShineTop} />
                      {/* Bottom shadow */}
                      <View style={styles.cellShadowBottom} />
                      <Text style={[styles.cellText, styles.foundText, { fontSize: cellSize * 0.52 }]}>
                        {cell}
                      </Text>
                    </LinearGradient>
                  </View>
                );
              }
              
              // Hinted cell - Glowing purple
              if (isHinted) {
                return (
                  <View key={colIndex} style={[styles.cellWrapper, { width: cellSize, height: cellSize, margin: cellGap / 2 }]}>
                    <LinearGradient
                      colors={['#A78BFA', '#8B5CF6', '#7C3AED']}
                      style={styles.hintedCell}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <View style={styles.cellShineTop} />
                      <Text style={[styles.cellText, styles.hintedText, { fontSize: cellSize * 0.52 }]}>
                        {hintedLetter}
                      </Text>
                    </LinearGradient>
                  </View>
                );
              }
              
              // Empty cell - Clean white/cream
              return (
                <View key={colIndex} style={[styles.cellWrapper, { width: cellSize, height: cellSize, margin: cellGap / 2 }]}>
                  <LinearGradient
                    colors={['#FFFFFF', '#FAFBFC', '#F5F6F7']}
                    style={styles.emptyCell}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                  >
                    <View style={styles.emptyCellInner} />
                  </LinearGradient>
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridWrapper: {
    padding: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  emptySpace: {
    backgroundColor: 'transparent',
  },
  cellWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
  foundCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  cellShineTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  cellShadowBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '18%',
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  hintedCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(167, 139, 250, 0.5)',
  },
  emptyCell: {
    flex: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(200, 205, 215, 0.6)',
  },
  emptyCellInner: {
    width: '100%',
    height: '100%',
    borderRadius: 7,
  },
  cellText: {
    fontWeight: '900',
    color: '#FFFFFF',
    zIndex: 1,
  },
  foundText: {
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  hintedText: {
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default CrosswordGrid;
