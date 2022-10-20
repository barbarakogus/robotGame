import readline from "readline";
import Board from "./Board";
import Position from "./Position";
import Robot from "./Robot";

const createBoard = async () => {
    const _readline = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise<Board>((resolve, reject) => {
        _readline.question(
            "Please, enter the board size: ",
            (size: string) => {
                const values = size
                    .split(" ")
                    .filter((entry: string) => /\S/.test(entry))
                    .map((n) => Number(n));

                if (values.length != 2) {
                    reject("Error: Two numbers are required.");
                }

                _readline.close();
                resolve(new Board(values[0], values[1]));
            }
        );
    });
};

const createRobot = async (board: Board) => {
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

                if (values.length != 3) {
                    reject("Error: Three inputs are required.");
                }

                _readline.close();
                resolve(
                    new Robot(
                        new Position(Number(values[0]), Number(values[1])),
                        values[2],
                        board,
                    )
                );
            }
        );
    });
};

const readCommands = async () => {
    const _readline = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise<string[]>((resolve, reject) => {
        _readline.question(
            "Please, enter the commands to guide the robot: ",
            (position: string) => {
                const commands = position
                    .split("")
                    .filter((entry: string) => /\S/.test(entry));

                _readline.close();
                resolve(
                    commands
                );
            }
        );
    });
}

const main = async () => {
    try {
        const board = await createBoard();
        const robot = await createRobot(board);
        const commands = await readCommands();
        robot.executeAll(commands)
        console.log('Robot final position: ', robot.position, robot.face)


    } catch (error) {
        console.log(error);
    }
};

main();
