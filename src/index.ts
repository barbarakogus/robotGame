import readline from "readline";
import Board from "./Board";
import Position from "./Position";
import Robot from "./Robot";

const readBoardInformation = async () => {
    const boardDimension = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise<Board>((resolve, reject) => {
        boardDimension.question(
            "Please, enter the board size: ",
            (size: string) => {
                const values = size
                    .split("")
                    .filter((entry: string) => {
                        return /\S/.test(entry);
                    })
                    .map((n) => Number(n));

                if (values.length === 0 || values.length > 2) {
                    reject("Error: Two numbers are required.");
                }

                boardDimension.close();
                resolve(new Board(values[0], values[1]));
            }
        );
    });
};

const readInitialPositionRobot = async () => {
    const initialPosition = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise<Robot>((resolve, reject) => {
        initialPosition.question(
            "Please, enter the initial position: ",
            (position: string) => {
                const values = position.split("").filter((entry: string) => {
                    return /\S/.test(entry);
                });

                if (values.length === 0 || values.length > 3) {
                    reject("Error: Three inputs are required.");
                }

                initialPosition.close();
                resolve(
                    new Robot(
                        new Position(Number(values[0]), Number(values[1])),
                        values[2]
                    )
                );
            }
        );
    });
};

const main = async () => {
    try {
        const board = await readBoardInformation();
        const initialLocation = await readInitialPositionRobot();
        console.log(`Boardgame size is ${board.rows} X ${board.columns}`);
        console.log(
            `Initial location is (${initialLocation.position.xAxis},${initialLocation.position.yAxis}) ${initialLocation.face}`
        );
    } catch (error) {
        console.log(error);
    }
};

main();
