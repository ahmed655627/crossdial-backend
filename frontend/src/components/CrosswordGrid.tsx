import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useGameStore, GridPosition } from '../store/gameStore';

const { width } = Dimensions.get('window');

export const CrosswordGrid: React.FC = () => {
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
  
  // Calculate optimal cell size based on screen width
  const maxGridWidth = width - 32;
  const cellSize = Math.min(Math.floor(maxGridWidth / numCols), 46);
  const gridWidth = cellSize * numCols + (numCols - 1) * 4 + 16;
  
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
      {/* Grid container */}
      <View style={[styles.gridWrapper, { width: gridWidth }]}>
        {cells.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => {
              if (cell === null) {
                return (
                  <View 
                    key={colIndex} 
                    style={[styles.emptySpace, { width: cellSize, height: cellSize }]} 
                  />
                );
              }
              
              const isFound = cellFound[rowIndex][colIndex];
              const isHinted = cellHinted[rowIndex][colIndex];
              const hintedLetter = hintedLetters[rowIndex][colIndex];
              
              // Found cell - 3D glossy tile
              if (isFound) {
                return (
                  <View key={colIndex} style={[styles.cellWrapper, { width: cellSize, height: cellSize }]}>
                    <LinearGradient
                      colors={['#2dd4bf', '#14b8a6', '#0d9488']}
                      style={styles.foundCell}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      {/* Shine effect */}
                      <View style={styles.cellShine} />
                      <Text style={[styles.cellText, styles.foundText, { fontSize: cellSize * 0.5 }]}>
                        {cell}
                      </Text>
                    </LinearGradient>
                  </View>
                );
              }
              
              // Hinted cell
              if (isHinted) {
                return (
                  <View key={colIndex} style={[styles.cellWrapper, { width: cellSize, height: cellSize }]}>
                    <LinearGradient
                      colors={['#a78bfa', '#8b5cf6', '#7c3aed']}
                      style={styles.hintedCell}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <View style={styles.cellShine} />
                      <Text style={[styles.cellText, styles.hintedText, { fontSize: cellSize * 0.5 }]}>
                        {hintedLetter}
                      </Text>
                    </LinearGradient>
                  </View>
                );
              }
              
              // Empty cell - frosted glass
              return (
                <View key={colIndex} style={[styles.cellWrapper, { width: cellSize, height: cellSize }]}>
                  <View style={styles.emptyCell}>
                    <View style={styles.emptyCellInner} />
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
    paddingVertical: 0, // Remove extra padding since parent handles it
  },
  gridWrapper: {
    // No background here - parent gridContainer has the background
    // This prevents the "double grid" visual artifact
    borderRadius: 12,
    padding: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  emptySpace: {
    margin: 2,
    backgroundColor: 'transparent',
  },
  cellWrapper: {
    margin: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  foundCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#14b8a6',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  cellShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '42%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  hintedCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
  },
  emptyCell: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    overflow: 'hidden',
  },
  emptyCellInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '35%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cellText: {
    fontWeight: '800',
    color: '#fff',
  },
  foundText: {
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  hintedText: {
    color: '#fff',
  },
});

export default CrosswordGrid;
