import readline from "readline";
import Board from "./Board";
import Position from "./Position";
import Robot from "./Robot";
import {
    isBoardSizeValid,
    isCommandsNonEmpty,
    isCommandValid,
    isInitialPositionInBorderValid,
    isInitialPositionValid,
} from "./inputValidations";

const readBoardInput = async () => {
    const _readline = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise<Board>((resolve, reject) => {
        _readline.question("Please, enter the board size: ", (size: string) => {
            const values = size
                .split(" ")
                .filter((entry: string) => /\S/.test(entry))
                .map((n) => Number(n));

            if (!isBoardSizeValid(values)) {
                _readline.close();
                reject("Error: Two numbers are required.");
                return;
            }

            _readline.close();
            resolve(new Board(values[0], values[1]));
        });
    });
};

const readRobotInput = async (board: Board) => {
    const _readline = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise<Robot>((resolve, reject) => {
        _readline.question(
            "Please, enter the initial position: ",
            (position: string) => {
                const values = position
                    .split(" ")
                    .filter((entry: string) => /\S/.test(entry));

                if (!isInitialPositionValid(values)) {
                    _readline.close();
                    reject(
                        "Error: Three inputs are required (Two numbers and one string)."
                    );
                    return;
                } else if (!isInitialPositionInBorderValid(values, board)) {
                    _readline.close();
                    reject(
                        "The starting position cannot be bigger than the size of the border. Please, try again!"
                    );
                    return;
                }

                _readline.close();
                resolve(
                    new Robot(
                        new Position(Number(values[0]), Number(values[1])),
                        values[2],
                        board
                    )
                );
            }
        );
    });
};

const readCommandsInput = async () => {
    const _readline = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise<string[]>((resolve, reject) => {
        _readline.question(
            "Please, enter the commands to guide the robot: ",
            (command: string) => {
                const commands = command
                    .split("")
                    .filter((entry) => /\S/.test(entry))
                    .map((entry) => entry.toUpperCase())
                    .filter((entry) => {
                        if (!isCommandValid(entry)) {
                            _readline.close();
                            reject("Value is wrong. Please try again!");
                            return;
                        }
                        return entry;
                    });

                if (!isCommandsNonEmpty(commands)) {
                    _readline.close();
                    reject(
                        "Commands are required. Please, add the commands to guide the robot."
                    );
                    return;
                }

                _readline.close();
                resolve(commands);
            }
        );
    });
};

const createBoard = async () => {
    let board;
    do {
        board = await readBoardInput()
            .then((board) => board)
            .catch((err) => console.log(err));
    } while (board == null);
    return board;
};

const createRobot = async (board: Board) => {
    let robot;
    do {
        robot = await readRobotInput(board)
            .then((robot) => robot)
            .catch((err) => console.log(err));
    } while (robot == null);
    return robot;
};

const getCommands = async () => {
    let commands;
    do {
        commands = await readCommandsInput()
            .then((commands) => commands)
            .catch((err) => console.log(err));
    } while (commands == null);
    return commands;
};

const main = async () => {
    try {
        const board = await createBoard();
        const robot = await createRobot(board);
        const commands = await getCommands();

        robot.executeAll(commands);
        console.log("Robot final position: ", robot.position, robot.face);
    } catch (err) {
        console.log(err);
    }
};

main();
