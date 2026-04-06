import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useGameStore, GridPosition } from '../../store/gameStore';
import { LevelTheme } from '../../data/levelThemes';

const { width } = Dimensions.get('window');

interface EnhancedCrosswordGridProps {
  theme?: LevelTheme;
}

export const EnhancedCrosswordGrid: React.FC<EnhancedCrosswordGridProps> = ({ theme }) => {
  const { currentLevel, foundWords, hintLetter } = useGameStore();
  
  if (!currentLevel) return null;
  
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
  
  const maxGridWidth = width - 40;
  const cellSize = Math.min(Math.floor(maxGridWidth / numCols), 44);
  
  // Build cells
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
      
      if (hintLetter && 
          hintLetter.position.word.toUpperCase() === word && 
          hintLetter.letterIndex === i) {
        cellHinted[row][col] = true;
        hintedLetters[row][col] = hintLetter.letter;
      }
    }
  });

  const themeColors = theme?.tileColors || ['#4fc3f7', '#29b6f6', '#03a9f4'];
  const primaryColor = theme?.primaryColor || '#4fc3f7';
  
  return (
    <View style={styles.container}>
      {/* Ambient glow */}
      <View style={[styles.ambientGlow, { backgroundColor: primaryColor + '20' }]} />
      
      <View style={[styles.gridContainer, { width: cellSize * numCols + 16, padding: 8 }]}>
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
                      colors={[themeColors[0], themeColors[1], themeColors[2]]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.foundCell}
                    >
                      {/* 3D highlight */}
                      <View style={styles.cellHighlight} />
                      <Text style={[styles.cellText, styles.foundText, { fontSize: cellSize * 0.5 }]}>
                        {cell}
                      </Text>
                      {/* Bottom shadow for 3D effect */}
                      <View style={styles.cellShadow} />
                    </LinearGradient>
                  </View>
                );
              }
              
              // Hinted cell
              if (isHinted) {
                return (
                  <View key={colIndex} style={[styles.cellWrapper, { width: cellSize, height: cellSize }]}>
                    <LinearGradient
                      colors={['#74b9ff', '#0984e3', '#0652DD']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.hintedCell}
                    >
                      <View style={styles.cellHighlight} />
                      <Text style={[styles.cellText, styles.hintedText, { fontSize: cellSize * 0.5 }]}>
                        {hintedLetter}
                      </Text>
                    </LinearGradient>
                  </View>
                );
              }
              
              // Empty cell - frosted glass effect
              return (
                <View key={colIndex} style={[styles.cellWrapper, { width: cellSize, height: cellSize }]}>
                  <View style={styles.frostedCell}>
                    <View style={styles.frostedInner}>
                      <Text style={[styles.cellText, styles.emptyText, { fontSize: cellSize * 0.5 }]}>
                        {''}
                      </Text>
                    </View>
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
  ambientGlow: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    top: '50%',
    left: '50%',
    transform: [{ translateX: -125 }, { translateY: -125 }],
  },
  gridContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  row: {
    flexDirection: 'row',
  },
  emptySpace: {
    margin: 2,
    backgroundColor: 'transparent',
  },
  cellWrapper: {
    margin: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  foundCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  cellHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cellShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '20%',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  hintedCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    shadowColor: '#0984e3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  frostedCell: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  frostedInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  cellText: {
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  foundText: {
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
  },
  hintedText: {
    color: '#fff',
  },
  emptyText: {
    color: 'transparent',
  },
});
