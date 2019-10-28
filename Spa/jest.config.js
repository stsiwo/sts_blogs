module.exports = {
  "roots": [
    "<rootDir>/tests/",
    "<rootDir>/src/"
  ],
  "testRegex": "\\.(spec|test)\\.tsx?$",
  "moduleNameMapper": {
      "\\.(css|scss|less)$": "identity-obj-proxy"
    },
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
}
