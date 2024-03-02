import {v4} from "uuid"

describe("it should generate a valid UUID", () => {
    it("generate a valid UUID", () => {
        const generatedID = () => {
            return v4();
        };

        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        expect(generatedID()).toMatch(uuidRegex);
    });
});
