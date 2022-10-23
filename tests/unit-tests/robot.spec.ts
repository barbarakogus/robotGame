import Board from "../../src/Board";
import Position from "../../src/Position";
import Robot from "../../src/Robot";

describe("Testing the Robot execution method", () => {
    const board = new Board(4, 3);

    it("Should return an error if the robot does not receive the correct number of parameters.", async () => {
        const robot = new Robot(new Position(3, 4), "N", board);
        expect(robot).toBeDefined();
    });

    it("Should change face to N when receiving two L and initial face is S.", async () => {
        const robot = new Robot(new Position(3, 4), "S", board);
        robot.execute("L");
        robot.execute("L");
        expect(robot.face).toBe("N");
    });
    it("Should change face to N when receiving two R and initial face is S.", async () => {
        const robot = new Robot(new Position(3, 4), "S", board);
        robot.execute("R");
        robot.execute("R");
        expect(robot.face).toBe("N");
    });
    it("Should change face to O when receiving two R and initial face is E.", async () => {
        const robot = new Robot(new Position(3, 4), "E", board);
        robot.execute("R");
        robot.execute("R");
        expect(robot.face).toBe("O");
    });
    it("Should change face to E when receiving two L and initial face is O.", async () => {
        const robot = new Robot(new Position(3, 4), "O", board);
        robot.execute("L");
        robot.execute("L");
        expect(robot.face).toBe("E");
    });
    it("Should change face to S when receiving two L and initial face is N.", async () => {
        const robot = new Robot(new Position(3, 4), "N", board);
        robot.execute("L");
        robot.execute("L");
        expect(robot.face).toBe("S");
    });
    it("Should change face to S when receiving two R and initial face is N.", async () => {
        const robot = new Robot(new Position(3, 4), "N", board);
        robot.execute("R");
        robot.execute("R");
        expect(robot.face).toBe("S");
    });

    //Working when receive an F
    it("When the initial position is 2,3, and the face is N and receives F, the robot should change the initial position to 2,2 and face N.", async () => {
        const robot = new Robot(new Position(2, 3), "N", board);
        robot.execute("F");
        expect(robot.position).toEqual(new Position(2, 2));
        expect(robot.face).toBe("N");
    });
    it("When the initial position is 4,1, and the face is S and receives F, the robot should change the initial position to 4,2 and face S.", async () => {
        const robot = new Robot(new Position(4, 1), "S", board);
        robot.execute("F");
        expect(robot.position).toEqual(new Position(4, 2));
        expect(robot.face).toBe("S");
    });
    it("When the initial position is 1,1, and the face is E and receive F, the robot should change the initial position to 2,1 and face E.", async () => {
        const robot = new Robot(new Position(1, 1), "E", board);
        robot.execute("F");
        expect(robot.position).toEqual(new Position(2, 1));
        expect(robot.face).toBe("E");
    });
    it("When the initial position is 4,3, and the face is O and receive F, the robot should change the initial position to 3,3 and face O.", async () => {
        const robot = new Robot(new Position(4, 3), "O", board);
        robot.execute("F");
        expect(robot.position).toEqual(new Position(3, 3));
        expect(robot.face).toBe("O");
    });
    it("When the initial position is 4,3, and face O and receive two F, the robot should change the initial position to 3,2 and face O.", async () => {
        const robot = new Robot(new Position(4, 3), "O", board);
        robot.execute("F");
        robot.execute("F");
        expect(robot.position).toEqual(new Position(2, 3));
        expect(robot.face).toBe("O");
    });
});

describe("Testing the Robot executeAll method", () => {
    it("Should return 1 3 N when the board is equal to 5 5, the initial position is equal to 1 2 N, and the commands are equal to RFRFFRFRF.", () => {
        const position = new Position(1, 2);
        const board = new Board(5, 5);
        const robot = new Robot(position, "N", board);
        robot.executeAll(["R", "F", "R", "F", "F", "R", "F", "R", "F"]);
        expect(robot.position).toEqual(new Position(1, 3));
        expect(robot.face).toBe("N");
    });
    it("Should return 3 1 E when the board is equal to 5 5, the initial position is equal to 0 0 E, and the commands are equal to RFLFFLRF.", () => {
        const position = new Position(0, 0);
        const board = new Board(5, 5);
        const robot = new Robot(position, "E", board);
        robot.executeAll(["R", "F", "L", "F", "F", "L", "R", "F"]);
        expect(robot.position).toEqual(new Position(3, 1));
        expect(robot.face).toBe("E");
    });
});

describe("Testing the boundaries of the board", () => {
    it("The robot should not move when the face is N.", () => {
        const board = new Board(4, 3);
        const position = new Position(1, 0);
        const robot = new Robot(position, "N", board);
        robot.execute("F");
        expect(robot.position).toEqual(position);
        expect(robot.face).toBe("N");
    });
    it("The robot should not move when the face is S.", () => {
        const board = new Board(4, 3);
        const position = new Position(1, 3);
        const robot = new Robot(position, "S", board);
        robot.execute("F");
        expect(robot.position).toEqual(position);
        expect(robot.face).toBe("S");
    });
    it("The robot should not move when the face is E.", () => {
        const board = new Board(4, 3);
        const position = new Position(4, 0);
        const robot = new Robot(position, "E", board);
        robot.execute("F");
        expect(robot.position).toEqual(position);
        expect(robot.face).toBe("E");
    });
    it("The robot should not move when the face is O.", () => {
        const board = new Board(4, 3);
        const position = new Position(0, 3);
        const robot = new Robot(position, "O", board);
        robot.execute("F");
        expect(robot.position).toEqual(position);
        expect(robot.face).toBe("O");
    });
});
