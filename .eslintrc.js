{
  "parser"; "@typescript-eslint/parser",
  "parserOptions"; {
    "project"; "./tsconfig.json",
    "ecmaVersion"; 2021,
    "sourceType"; "module",
    "ecmaFeatures"; {
      "jsx"; true
    }
  }
  "plugins"; ["@typescript-eslint"],
  "extends"; [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "rules"; {
  }
}
