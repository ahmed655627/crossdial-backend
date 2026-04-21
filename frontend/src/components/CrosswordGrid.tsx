import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useGameStore, GridPosition } from '../store/gameStore';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height < 750;

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
  
  // Calculate optimal cell size based on screen width - more compact for floating look
  const maxGridWidth = width * 0.85;
  const baseSize = compact ? 38 : (isSmallScreen ? 40 : 44);
  const cellSize = Math.min(Math.floor(maxGridWidth / numCols), baseSize);
  const cellGap = 3;
  
  // Build cells
  const cells: (string | null)[][] = Array(numRows).fill(null).map(() => Array(numCols).fill(null));
  const cellFound: boolean[][] = Array(numRows).fill(null).map(() => Array(numCols).fill(false));
  const cellHinted: boolean[][] = Array(numRows).fill(null).map(() => Array(numCols).fill(false));
  const hintedLetters: (string | null)[][] = Array(numRows).fill(null).map(() => Array(numCols).fill(null));
  
  grid.forEach((wordPos: GridPosition) => {
    const word = wordPos.word.toUpperCase();
    const isFound = foundWords.includes(word);
    
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
      {/* Grid - Floating style like Wordscapes */}
      <View style={styles.gridWrapper}>
        {cells.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => {
              if (cell === null) {
                // Empty space - completely transparent
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
              
              // Found cell - Bright Orange gradient like Wordscapes
              if (isFound) {
                return (
                  <View key={colIndex} style={[styles.cellWrapper, { width: cellSize, height: cellSize, margin: cellGap / 2 }]}>
                    <LinearGradient
                      colors={['#FF8C42', '#FF6B35', '#F45D22']}
                      style={styles.foundCell}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                    >
                      {/* Top shine effect for 3D look */}
                      <View style={styles.cellShineTop} />
                      {/* Bottom shadow for depth */}
                      <View style={styles.cellShadowBottom} />
                      <Text style={[styles.cellText, styles.foundText, { fontSize: cellSize * 0.52 }]}>
                        {cell}
                      </Text>
                    </LinearGradient>
                  </View>
                );
              }
              
              // Hinted cell - Purple/violet
              if (isHinted) {
                return (
                  <View key={colIndex} style={[styles.cellWrapper, { width: cellSize, height: cellSize, margin: cellGap / 2 }]}>
                    <LinearGradient
                      colors={['#A78BFA', '#8B5CF6', '#7C3AED']}
                      style={styles.hintedCell}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                    >
                      <View style={styles.cellShineTop} />
                      <Text style={[styles.cellText, styles.hintedText, { fontSize: cellSize * 0.52 }]}>
                        {hintedLetter}
                      </Text>
                    </LinearGradient>
                  </View>
                );
              }
              
              // Empty cell - White/Light blue like Wordscapes
              return (
                <View key={colIndex} style={[styles.cellWrapper, { width: cellSize, height: cellSize, margin: cellGap / 2 }]}>
                  <View style={styles.emptyCell}>
                    {/* Subtle gradient for depth */}
                    <LinearGradient
                      colors={['#FFFFFF', '#F0F4F8', '#E8EDF2']}
                      style={styles.emptyCellGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                    />
                  </View>
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
    // No background - grid floats over scenic background
  },
  gridWrapper: {
    // Transparent - lets background show through
    padding: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  emptySpace: {
    // Completely invisible - background shows through
    backgroundColor: 'transparent',
  },
  cellWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    // Subtle shadow for floating effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  foundCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 140, 66, 0.3)',
  },
  cellShineTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  cellShadowBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '20%',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  hintedCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.3)',
  },
  emptyCell: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(200, 210, 220, 0.8)',
  },
  emptyCellGradient: {
    flex: 1,
    borderRadius: 7,
  },
  cellText: {
    fontWeight: '900',
    color: '#FFFFFF',
    zIndex: 1,
  },
  foundText: {
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
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
