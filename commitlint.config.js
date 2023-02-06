module.exports = {
  extends: ["@commitlint/config-angular"],
  ignores: [(message) => message.includes("WIP")],
  plugins: [
    {
      rules: {},
    },
  ],
  rules: {
    // Commit Prefix
    "type-enum": [
      2,
      "always",
      ["build", "ci", "docs", "feat", "fix", "refactor", "revert", "style", "test"],
    ],
    "subject-case": [2, "always", ["sentence-case"]],
    // Commit Body
    "body-leading-blank": [2, "always"],
    "body-max-line-length": [2, "always", 100],

    // TODO setup commit footer. the code below will throw back an error
    // Commit Footer
    // "footer-leading-blank": [2, "always"],
    // "footer-max-line-length": [2, "always", 100],
  },
};
