import Board from "../../src/Board";
import {
    isBoardSizeValid,
    isCommandsNonEmpty,
    isCommandValid,
    isInitialPositionInBorderValid,
    isInitialPositionValid,
} from "../../src/inputValidations";

describe("Testing the validations functions", () => {
    it("It should receive the board size invalid input and return FALSE.", () => {
        const isValid = isBoardSizeValid([4, 3, 2]);
        expect(isValid).toBe(false);
    });
    it("It should receive the board size valid input and return TRUE.", () => {
        const isValid = isBoardSizeValid([4, 3]);
        expect(isValid).toBe(true);
    });
    it("It should receive the board size invalid input and return FALSE.", () => {
        const isValid = isBoardSizeValid([]);
        expect(isValid).toBe(false);
    });
    it("Should receive initial position invalid input and return FALSE.", () => {
        const isValid = isInitialPositionValid([1, 2]);
        expect(isValid).toBe(false);
    });
    it("Should receive initial position valid input and return TRUE.", () => {
        const isValid = isInitialPositionValid([1, 2, "N"]);
        expect(isValid).toBe(true);
    });
    it("Should receive initial position invalid input and return FALSE.", () => {
        const isValid = isInitialPositionValid([]);
        expect(isValid).toBe(false);
    });
    it("Should the initial position is bigger than the board size and return FALSE.", () => {
        const board = new Board(4, 5);
        const isValid = isInitialPositionInBorderValid([5, 5, "N"], board);
        expect(isValid).toBe(false);
    });
    it("Should the initial position is bigger than the board size and return FALSE.", () => {
        const board = new Board(5, 4);
        const isValid = isInitialPositionInBorderValid([5, 5, "N"], board);
        expect(isValid).toBe(false);
    });
    it("Should the initial position is bigger than the board size and return FALSE.", () => {
        const board = new Board(4, 4);
        const isValid = isInitialPositionInBorderValid([5, 5, "N"], board);
        expect(isValid).toBe(false);
    });
    it("Should the initial position is smaller than the board size and return TRUE.", () => {
        const board = new Board(4, 4);
        const isValid = isInitialPositionInBorderValid([3, 1, "N"], board);
        expect(isValid).toBe(true);
    });
    it("Should the initial position is smaller than the board size and return TRUE.", () => {
        const board = new Board(4, 4);
        const isValid = isInitialPositionInBorderValid([3, 4, "N"], board);
        expect(isValid).toBe(true);
    });
    it("Should receive invalid command input and return FALSE.", () => {
        const command = "D";
        const isValid = isCommandValid(command);
        expect(isValid).toBe(false);
    });
    it("Should receive valid command input and return TRUE.", () => {
        const command = "F";
        const isValid = isCommandValid(command);
        expect(isValid).toBe(true);
    });
    it("Should receive an array of commands and return TRUE.", () => {
        const commands = ['F', 'F', 'L'];
        const isValid = isCommandsNonEmpty(commands);
        expect(isValid).toBe(true);
    });
});
