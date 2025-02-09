import * as consoleUtils from "../editor/js/editor-libs/console-utils";

describe("console utils", () => {
  describe("formatOutput", () => {
    test("String", () => {
      expect(consoleUtils.formatOutput("lorem ipsum")).toBe('"lorem ipsum"');
    });
    test("undefined", () => {
      expect(consoleUtils.formatOutput(undefined)).toBe("undefined");
    });
    test("null", () => {
      expect(consoleUtils.formatOutput(null)).toBe("null");
    });
    test("NaN", () => {
      expect(consoleUtils.formatOutput(NaN)).toBe("NaN");
    });
    test("Boolean: true", () => {
      expect(consoleUtils.formatOutput(true)).toBe("true");
    });
    test("Boolean: false", () => {
      expect(consoleUtils.formatOutput(false)).toBe("false");
    });
    test("Positive integer", () => {
      expect(consoleUtils.formatOutput(42)).toBe("42");
    });
    test("Positive floating point", () => {
      expect(consoleUtils.formatOutput(4.2)).toBe("4.2");
    });
    test("Negative integer", () => {
      expect(consoleUtils.formatOutput(-42)).toBe("-42");
    });
    test("Negative floating point", () => {
      expect(consoleUtils.formatOutput(-4.2)).toBe("-4.2");
    });
    test("Infinity", () => {
      expect(consoleUtils.formatOutput(Infinity)).toBe("Infinity");
    });
    test("Negative Infinity", () => {
      expect(consoleUtils.formatOutput(-Infinity)).toBe("-Infinity");
    });
    test("Positive zero", () => {
      expect(consoleUtils.formatOutput(0)).toBe("0");
    });
    test("Negative zero", () => {
      expect(consoleUtils.formatOutput(-0)).toBe("-0");
    });
    test("String object", () => {
      expect(consoleUtils.formatOutput(new String("foo"))).toBe(
        'String { "foo" }'
      );
    });
    test('Object.getPrototypeOf should return String { "" }', () => {
      expect(consoleUtils.formatOutput(Object.getPrototypeOf("foo"))).toBe(
        'String { "" }'
      );
    });
  });

  describe("formatArray", () => {
    test("Array formatting", () => {
      expect(consoleUtils.formatArray([1, 2, 3, 4])).toBe("1, 2, 3, 4");
    });
    test("Mixed array", () => {
      expect(
        consoleUtils.formatArray([1, "a", { x: 2 }, null, undefined])
      ).toBe('1, "a", Object { x: 2 }, null, undefined');
    });
  });

  describe("formatObject", () => {
    test("the JSON object", () => {
      expect(consoleUtils.formatObject(JSON)).toBe("JSON {}");
    });
    test("Int8Array", () => {
      expect(consoleUtils.formatObject(new Int8Array(4))).toBe(
        "Int8Array [0, 0, 0, 0]"
      );
    });
    test("ArrayBuffer nested inside DataView", () => {
      expect(consoleUtils.formatObject(new DataView(new ArrayBuffer()))).toBe(
        "DataView {}"
      );
    });
    test("Empty object", () => {
      expect(consoleUtils.formatObject({})).toBe("Object {  }");
    });
    describe("Simple object", () => {
      test("string -> numbers", () => {
        expect(consoleUtils.formatObject({ a: 1, b: 2, c: 3 })).toBe(
          "Object { a: 1, b: 2, c: 3 }"
        );
      });
      test("string -> mix of number and strings", () => {
        expect(consoleUtils.formatObject({ a: 1, b: "something", c: 3 })).toBe(
          'Object { a: 1, b: "something", c: 3 }'
        );
      });
      test("string -> mix of number and null", () => {
        expect(consoleUtils.formatObject({ a: 1, b: null, c: 3 })).toBe(
          "Object { a: 1, b: null, c: 3 }"
        );
      });
    });
    describe("Nested object", () => {
      test("string -> numbers", () => {
        expect(
          consoleUtils.formatObject({ a: 1, b: { d: 2, e: 4 }, c: 3 })
        ).toBe("Object { a: 1, b: Object { d: 2, e: 4 }, c: 3 }");
      });
      test("string -> mix of array and numbers", () => {
        expect(consoleUtils.formatObject({ a: 1, b: [1, 2, 3], c: 3 })).toBe(
          "Object { a: 1, b: Array [1, 2, 3], c: 3 }"
        );
      });
    });
  });
});
