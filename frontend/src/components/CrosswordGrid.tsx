import React from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useGameStore, GridPosition } from '../store/gameStore';

const { width } = Dimensions.get('window');

export const CrosswordGrid: React.FC = () => {
  const { currentLevel, foundWords, hintLetter } = useGameStore();
  
  if (!currentLevel) return null;
  
  // Calculate grid dimensions
  const grid = currentLevel.grid;
  let maxRow = 0;
  let maxCol = 0;
  
  grid.forEach(wordPos => {
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
  
  // Cell size calculation
  const maxGridWidth = width - 50;
  const cellSize = Math.min(Math.floor(maxGridWidth / numCols), 42);
  
  // Build grid cells
  const cells: (string | null)[][] = Array(numRows).fill(null).map(() => Array(numCols).fill(null));
  const cellFound: boolean[][] = Array(numRows).fill(null).map(() => Array(numCols).fill(false));
  const cellHinted: boolean[][] = Array(numRows).fill(null).map(() => Array(numCols).fill(false));
  const hintedLetters: (string | null)[][] = Array(numRows).fill(null).map(() => Array(numCols).fill(null));
  
  grid.forEach(wordPos => {
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
      
      // Check if this cell should show hint
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
      {/* Decorative glow behind grid */}
      <View style={styles.glowEffect} />
      
      <View style={[styles.grid, { width: cellSize * numCols + 10, height: cellSize * numRows + 10 }]}>
        {cells.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => {
              if (cell === null) {
                return <View key={colIndex} style={[styles.emptyCell, { width: cellSize, height: cellSize }]} />;
              }
              
              const isFound = cellFound[rowIndex][colIndex];
              const isHinted = cellHinted[rowIndex][colIndex];
              const hintedLetter = hintedLetters[rowIndex][colIndex];
              
              if (isFound) {
                return (
                  <View key={colIndex} style={[styles.cellWrapper, { width: cellSize, height: cellSize }]}>
                    <LinearGradient
                      colors={['#FFD700', '#FFA500', '#FF8C00']}
                      style={[styles.cell, styles.cellFound]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Text style={[styles.cellText, styles.cellTextFound, { fontSize: cellSize * 0.55 }]}>
                        {cell}
                      </Text>
                    </LinearGradient>
                  </View>
                );
              }
              
              if (isHinted) {
                return (
                  <View key={colIndex} style={[styles.cellWrapper, { width: cellSize, height: cellSize }]}>
                    <LinearGradient
                      colors={['#74b9ff', '#0984e3']}
                      style={[styles.cell, styles.cellHinted]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Text style={[styles.cellText, styles.cellTextHinted, { fontSize: cellSize * 0.55 }]}>
                        {hintedLetter}
                      </Text>
                    </LinearGradient>
                  </View>
                );
              }
              
              return (
                <View key={colIndex} style={[styles.cellWrapper, { width: cellSize, height: cellSize }]}>
                  <View style={[styles.cell, styles.cellEmpty]}>
                    <Text style={[styles.cellText, { fontSize: cellSize * 0.55 }]}>
                      {''}
                    </Text>
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
    paddingVertical: 15,
    position: 'relative',
  },
  glowEffect: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(102, 126, 234, 0.15)',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: -100 }],
  },
  grid: {
    backgroundColor: 'transparent',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
  },
  emptyCell: {
    backgroundColor: 'transparent',
    margin: 2,
  },
  cellWrapper: {
    margin: 2,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  cellEmpty: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cellFound: {
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  cellHinted: {
    shadowColor: '#0984e3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  cellText: {
    fontWeight: '800',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  cellTextFound: {
    color: '#1a1a2e',
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
  },
  cellTextHinted: {
    color: '#fff',
  },
});
