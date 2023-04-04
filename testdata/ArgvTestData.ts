
export const ArgvTestData = {
    defaultConfig: () => [
        "--distFiles",
        "dist/**/*.js",
        "--contracts",
        "contracts/**/*Contract.ts",
        "--jsDir",
        "dist",
        "--moduleResolution",
        "ES"
    ],
    debug: () => [
        "--distFiles",
        "dist/**/*.js",
        "--contracts",
        "contracts/**/*Contract.ts",
        "--jsDir",
        "dist",
        "--moduleResolution",
        "ES",
        "-d"
    ]
};
