import Board from "./Board";

export const isBoardSizeValid = (values: number[]) => {
    return values.length === 2 &&
        !isNaN(values[0]) &&
        !isNaN(values[1]);
};

export const isInitialPositionValid = (values: any[]) => {
    return values.length === 3;
};

export const isInitialPositionInBorderValid = (values: any[], board: Board) => {
    return board.columns >= Number(values[0]) && board.rows >= Number(values[1]);
};

export const isCommandValid = (value: string) => {
    return value === "F" || value === "L" || value === "R";
};

export const isCommandsNonEmpty = (values: string[]) => {
    return values.length > 0;
};
