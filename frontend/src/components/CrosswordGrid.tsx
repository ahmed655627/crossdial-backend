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
  
  const maxGridWidth = width - 40;
  const cellSize = Math.min(Math.floor(maxGridWidth / numCols), 42);
  
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
      {/* Ambient glow effect */}
      <View style={styles.glowEffect} />
      
      {/* Grid container with frosted glass effect */}
      <View style={[styles.gridWrapper, { padding: 10 }]}>
        <View style={styles.grid}>
          {cells.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, colIndex) => {
                if (cell === null) {
                  return (
                    <View 
                      key={colIndex} 
                      style={[styles.emptyCell, { width: cellSize, height: cellSize }]} 
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
                        colors={['#00d4aa', '#00b894', '#009d80']}
                        style={[styles.cell, styles.cellFound]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        {/* 3D shine effect */}
                        <View style={styles.cellShine} />
                        <Text style={[styles.cellText, styles.cellTextFound, { fontSize: cellSize * 0.52 }]}>
                          {cell}
                        </Text>
                        {/* Bottom shadow for 3D effect */}
                        <View style={styles.cellBottomShadow} />
                      </LinearGradient>
                    </View>
                  );
                }
                
                // Hinted cell
                if (isHinted) {
                  return (
                    <View key={colIndex} style={[styles.cellWrapper, { width: cellSize, height: cellSize }]}>
                      <LinearGradient
                        colors={['#667eea', '#764ba2', '#6c63ff']}
                        style={[styles.cell, styles.cellHinted]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        <View style={styles.cellShine} />
                        <Text style={[styles.cellText, styles.cellTextHinted, { fontSize: cellSize * 0.52 }]}>
                          {hintedLetter}
                        </Text>
                      </LinearGradient>
                    </View>
                  );
                }
                
                // Empty cell - frosted glass effect
                return (
                  <View key={colIndex} style={[styles.cellWrapper, { width: cellSize, height: cellSize }]}>
                    <View style={[styles.cell, styles.cellEmpty]}>
                      <View style={styles.cellEmptyInner} />
                    </View>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  glowEffect: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(0, 212, 170, 0.12)',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -90 }, { translateY: -90 }],
  },
  gridWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  grid: {
    backgroundColor: 'transparent',
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
    overflow: 'hidden',
  },
  cellEmpty: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  cellEmptyInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cellFound: {
    shadowColor: '#00b894',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  cellShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cellBottomShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '20%',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  cellHinted: {
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  cellText: {
    fontWeight: '800',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  cellTextFound: {
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
  },
  cellTextHinted: {
    color: '#fff',
  },
});

export default CrosswordGrid;
