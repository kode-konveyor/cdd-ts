export const PatternTestData = {
  mkArgv: `  \\[
   "--distFiles",
   "dist.*js",
   "--contracts",
   "contracts.*Contract.ts",
   "--jsDir",
   "dist",
   "--moduleResolution",
   "ES",
   "-d"
  ]`,
  mergeConfig: `  {
   "contracts": "contracts.*Contract.ts",
   "debug": true,
   "distFiles": "dist.*.js",
   "jsDir": "dist",
   "moduleResolution": "ES",
   "watch": false
  }`,
  emptystdout: "\\[]",
};
