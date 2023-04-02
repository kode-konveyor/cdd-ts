export const SerializedTestdata = {
    serializedComplexObject: () => `{
 "boolean": true,
 "complexString": "a \\t \\b \\b 
 \\f \\r " \\ \\\\ ",
 "infinity": INFINITY,
 "jsonable": "JSONABLE",
 "null": null,
 "object": {
  "toJSON": "not a function"
 },
 "simpleNumber": 3,
 "simpleString": "foo",
 "yetAnotherComplexString": "\\u0000-\\t\\u000b-\\u001f"
}`,
    serializedCircularObject: () => `{
 "circular": CIRCULAR OBJECT
}`,
    serializedObjectWithFunctions: () => `{
 "a": "foo",
 "b": "() => { const egy = 1; return String(egy); }",
 "c": "() => "1""
}`,
    serializedError: () => `{
 "__class": "Error",
 "message": "hello",
 "stack": "fake stacktrace"
}`,
    serializedEmpty: () => "{\n \n}"
};
