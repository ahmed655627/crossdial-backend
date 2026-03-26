import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
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
  const maxGridWidth = width - 40;
  const cellSize = Math.min(Math.floor(maxGridWidth / numCols), 40);
  
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
      <View style={[styles.grid, { width: cellSize * numCols, height: cellSize * numRows }]}>
        {cells.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => {
              if (cell === null) {
                return <View key={colIndex} style={[styles.emptyCell, { width: cellSize, height: cellSize }]} />;
              }
              
              const isFound = cellFound[rowIndex][colIndex];
              const isHinted = cellHinted[rowIndex][colIndex];
              const hintedLetter = hintedLetters[rowIndex][colIndex];
              
              return (
                <View 
                  key={colIndex} 
                  style={[
                    styles.cell, 
                    { width: cellSize, height: cellSize },
                    isFound && styles.cellFound,
                    isHinted && styles.cellHinted
                  ]}
                >
                  <Text style={[
                    styles.cellText,
                    { fontSize: cellSize * 0.55 },
                    isFound && styles.cellTextFound,
                    isHinted && styles.cellTextHinted
                  ]}>
                    {isFound ? cell : (isHinted ? hintedLetter : '')}
                  </Text>
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
    paddingVertical: 10,
  },
  grid: {
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
  },
  emptyCell: {
    backgroundColor: 'transparent',
  },
  cell: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor: '#34495e',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
    borderRadius: 4,
  },
  cellFound: {
    backgroundColor: '#FFD700',
    borderColor: '#f39c12',
  },
  cellHinted: {
    backgroundColor: '#74b9ff',
    borderColor: '#0984e3',
  },
  cellText: {
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  cellTextFound: {
    color: '#1a1a2e',
  },
  cellTextHinted: {
    color: '#0984e3',
  },
});
