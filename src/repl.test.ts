
import { describe, expect, test } from "vitest";
import {clean_input} from "./clean_input";

describe.each([
    {
        input: "  hello  world  ",
        expected: ["hello", "world"],
    },
    // TODO: more test cases here
])("clean_input($input)", ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
        const actual = clean_input(input);

        expect(actual).toHaveLength(expected.length);
        for (const i in expected) {
            expect(actual[i]).toBe(expected[i]);
        }
    });
});
