import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { useState } from "react";

export default function App() {
  const [number, onChangeNumber] = useState("");
  const [result, setResult] = useState("");
  const [totalGuesses, setTotalGuesses] = useState(0);
  const [correctNum, setCorrectNum] = useState(generateRandomNumber());

  function generateRandomNumber() {
    return Math.floor(Math.random() * 99) + 1;
  }

  function handleGuess() {
    let num = parseInt(number);
    let result = "";

    if (isNaN(num)) {
      result = "Ange ett heltal mellan 1-99 och tryck på SKICKA-knappen";
    } else if (num < correctNum) {
      result = "För lågt, gissa igen";
    } else if (num > correctNum) {
      result = "För högt, gissa igen";
    } else {
      result = "Korrekt! Bra gjort!";
      // setTimeout(resetGame, 8000); // Automatisk reset efter man vunnit
    }

    setResult(result);
    setTotalGuesses(totalGuesses + 1);
  }

  function resetGame() {
    setCorrectNum(generateRandomNumber());
    setResult("");
    setTotalGuesses(0);
    onChangeNumber("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.largeText}>Gissa numret!</Text>
      <TextInput
        style={styles.input}
        placeholder="Ange ett heltal mellan 1-99"
        onChangeText={(text) => onChangeNumber(text)}
        value={number}
        keyboardType="numeric"
        maxLength={2}
      />
      <Button color="#339933" title="Skicka" onPress={handleGuess} />
      <Text style={styles.mediumText}>Gissningar: {totalGuesses}</Text>
      <Text style={styles.mediumText}>{result}</Text>
      <StatusBar style="auto" />
      <Button color="#993333" title="Nollställ" onPress={resetGame} />
    </View>
  );
}

// notera att det är camelCase
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f1",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  largeText: {
    marginBottom: 20,
    marginTop: 20,
    fontSize: 18,
  },
  mediumText: {
    marginBottom: 20,
    marginTop: 20,
    fontSize: 14,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    padding: 10,
    marginBottom: 20,
    textAlign: "center",
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: "#993333",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 2,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

// Exempel på inputfält som hanterar text respektive nummer
// const TextInputExample = () => {
//   const [text, onChangeText] = React.useState('Useless Text');
//   const [number, onChangeNumber] = React.useState('');

//   return (
//     <SafeAreaView>
//       <TextInput
//         style={styles.input}
//         onChangeText={onChangeText}
//         value={text}
//       />
//       <TextInput
//         style={styles.input}
//         onChangeText={onChangeNumber}
//         value={number}
//         placeholder="useless placeholder"
//         keyboardType="numeric"
//       />
//     </SafeAreaView>

// Annat sätt att göra knappar som man kan style:a som man vill
/* <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity> */
