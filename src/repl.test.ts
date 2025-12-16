
import { describe, expect, test } from "vitest";
import {cleanInput} from "./cleanInput";

describe.each([
    {
        input: "  hello  world  ",
        expected: ["hello", "world"],
    },
    // TODO: more test cases here
])("cleanInput($input)", ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
        const actual = cleanInput(input);

        expect(actual).toHaveLength(expected.length);
        for (const i in expected) {
            expect(actual[i]).toBe(expected[i]);
        }
    });
});
