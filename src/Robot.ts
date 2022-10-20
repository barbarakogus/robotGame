import Board from "./Board";
import Position from "./Position";

export default class Robot {
    position: Position;
    face: string;
    board: Board;

    constructor(position: Position, face: string, board: Board) {
        this.position = position;
        this.face = face.toUpperCase();
        this.board = board;
    }

    executeAll(commands: string[]) {
        commands
            .map((command) => command.toUpperCase())
            .forEach((command) => {
                this.execute(command);
            })
    }

    execute(command: string) {
        switch (this.face) {
            case 'N':
                if (command === 'L') {
                    this.face = 'O'
                } else if (command === 'R') {
                    this.face = 'E'
                } else {
                    this.position = new Position(this.position.xAxis, this.position.yAxis - 1)
                }
                break
            case 'S':
                if (command === 'L') {
                    this.face = 'E'
                } else if (command === 'R') {
                    this.face = 'O'
                } else {
                    this.position = new Position(this.position.xAxis, this.position.yAxis + 1)
                }
                break;
            case 'E':
                if (command === 'L') {
                    this.face = 'N'
                } else if (command === 'R') {
                    this.face = 'S'
                } else {
                    this.position = new Position(this.position.xAxis + 1, this.position.yAxis)
                }
                break;
            case 'O':
                if (command === 'L') {
                    this.face = 'S'
                } else if (command === 'R') {
                    this.face = 'N'
                } else {
                    this.position = new Position(this.position.xAxis - 1, this.position.yAxis)
                }
                break;
        }
    }
}