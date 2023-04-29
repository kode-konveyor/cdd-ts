export const SerializedTestdata = {
  serializedComplexObject: () => `{
 "arraywithEmpty": [
  undefined,
  null
 ],
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
  serializedEmpty: () => "{\n \n}",
  config: () => `{
 "jsDir": "dist",
 "moduleResolution": "ES",
 "numberofTests": "119"
}`,
  defaultConfig: () => `{
 "contracts": "contracts/**/*Contract.ts",
 "debug": false,
 "distFiles": "dist/**/*.js",
 "jsDir": "dist",
 "moduleResolution": "ES",
 "watch": false
}`,
  contractEntity: () => `{
 "cases": {
  
 }
}`,
  argparser: () => `[
 [
  "output the version number -V, --version",
  "watch mode -w, --watch",
  "the files to be watched in watch mode (glob pattern) -f, --distFiles [value]",
  "the contracts (glob pattern) -c, --contracts [value]",
  "the js directory used for computing import -j, --jsDir <value>",
  "module resolution strategy -m, --moduleResolution <value>",
  "expected number of tested contract clauses -n, --numberofTests <value>",
  "debug -d, --debug"
 ],
 "runContracts",
 "1.0.13",
 "check the contracts"
]`,
  defaultargv: () => `[
 "--distFiles",
 "dist/**/*.js",
 "--contracts",
 "contracts/**/*Contract.ts",
 "--jsDir",
 "dist",
 "--moduleResolution",
 "ES"
]`,
  args: `[
 [
  1,
  "b"
 ]
]`,
  undef: () => "undefined",
};
