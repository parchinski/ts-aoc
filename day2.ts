import * as fs from "fs";

// Opponent Shape is now the first character and the round outcome is the second character

// Variables
let PlayerScore: number = 0;

// Functions

// Calculate what symbol player should use based on second character
const assignEndConditionValue = (condition: string): any => {
  if (condition === "Y") {
    return 3;
  } else if (condition === "X") {
    return 0;
  } else if (condition === "Z") {
    return 6;
  } else {
    return "error";
  }
};

// Calculate the true value of the shape
const assignShape = (shape: string): number => {
  if (shape === "A") {
    return 1;
  } else if (shape === "B") {
    return 2;
  } else if (shape === "C") {
    return 3;
  } else {
    return 0;
  }
};

// Calculate the value of the end condition
const endConditionValue = (line: string): number => {
  let assignedEndCondition: number = assignEndConditionValue(line[2]);
  return assignedEndCondition;
};

// Figure out what symbol the player should use based on what the opponent will pick in line[0] and what the outcome should be in line[2]
const playerSuggestedSymbolValue = (line: string): number => {
  // Get the opponent shape true value
  let opponentShape: number = assignShape(line[0]);
  // Get the end condition true value
  let endCondition: number = assignEndConditionValue(line[2]);
  // Calculate what player shape must be for the desired end condition
  if (endCondition === 3) {
    return opponentShape;
  } else if (endCondition === 6) {
    switch (opponentShape) {
      case 1:
        return 2;
      case 2:
        return 3;
      case 3:
        return 1;
      default:
        return 0;
    }
  } else {
    switch (opponentShape) {
      case 1:
        return 3;
      case 2:
        return 1;
      case 3:
        return 2;
      default:
        return 0;
    }
  }
};

// Calulate the Score from an individual line
const updateScoreForPlayerEachRound = (line: string): void => {
  // calculate what player shape must be for the desired end condition at line[2]
  PlayerScore =
    PlayerScore + endConditionValue(line) + playerSuggestedSymbolValue(line);
};

// Read the file
let data: string = fs.readFileSync("day2data.txt", "utf8");

data.split(/\r?\n/).forEach((line) => {
  if (line.trim() !== "") {
    // To handle empty lines
    updateScoreForPlayerEachRound(line);
  }
});

console.log(PlayerScore);
