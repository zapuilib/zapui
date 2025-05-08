# Contributing to ZAP

We appreciate your contributions! Whether you're here to report a bug, suggest improvements, submit a fix, or propose a new feature, we want the process to be as straightforward and transparent as possible.

## How You Can Contribute

- **Report a bug** – Identify and describe issues.
- **Discuss the code** – Engage in discussions about existing implementations.
- **Submit a fix** – Improve the stability and performance.
- **Propose new features** – Suggest and contribute innovative ideas.
- **Become a contributor** – Help shape ZAP through ongoing contributions.

---

## General Guidelines

1. Write tests for any new or modified code.
2. Update documentation when API changes are made.
3. Ensure all tests pass before submitting your changes.
4. Follow the project’s coding standards and linting rules.
5. Open a pull request with your contributions!

---

## Coding Standards

To maintain a clean and consistent codebase, adhere to the following conventions:

### Naming Conventions

- Use **camelCase** for variables and inputs.
- Start component selector names with `zap-` instead of `app-`.
- Prefix component class names with `Zap`, but do not end them with `Component`.

### Imports

- Place external imports before internal file imports.
- Add a space between external and internal imports.
- Treat Angular imports as external imports.

### Code Organization

- Place `@ViewChild` and `@ViewChildren` decorators at the top of the class.
- Follow with `@Output` decorators.
- Then, list `@Input` decorators.
- Use `@for` and `@if` instead of `*ngFor` and `*ngIf`.

### Best Practices

- **Avoid magic numbers** – Use constants instead.
- **Remove unnecessary comments** – Only keep comments that add value.
- **Maintain clean formatting** – No double empty lines.
- **Minimize use of `any`** – Only use it when necessary.
- **Keep methods short and concise** – Avoid overly long functions.
- **Follow the DRY principle** – Don't repeat yourself.

---

## Getting Started with Contributions

### 1. Fork and Clone the Repository

- Fork the repository on GitHub.
- Clone your fork to your local machine.

### 2. Create an Issue

- Open an issue on GitHub for any bug fix or new feature.

### 3. Create a Branch

- Use the format: `issues/<issue-number>`.

### 4. Make Changes and Commit

- Follow the commit message format: `<type>/<scope>: <message>`
- Example:
  - `fix/button: corrected disabled button color`
  - `feat/button: added a new button component`

#### Commit Types

- `feat` – New feature
- `fix` – Bug fix
- `refactor` – Code improvement without new features
- `test` – Adding or updating tests
- `improve` – General code enhancements
- `ci` – CI/CD configuration changes

#### Scopes

- `<component-name>` – The specific component you worked on.
- `core` – Core functionalities.
- `theme` – Styling and theme-related updates.
- `g-<component-name>` – Global configuration changes for a component.

### 5. Push and Submit a Pull Request

- Push your changes to your fork.
- Open a pull request to the main repository.

### 6. Review Process

- A reviewer will check your PR and provide feedback.
- If changes are requested, update your branch and push again:
  ```sh
  git commit --all --fixup HEAD && git push
  ```

### 7. Merge and Cleanup

- Once your PR is merged, delete your branch and pull the latest changes from the upstream repository.

---

## Setting Up Locally

1. **Clone the repository** and navigate to the `zapui` root directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the library in **watch mode**:
   ```
   npm run build:lib:watch
   ```
4. Navigate to the `projects/demo` directory and run the demo app:
   ```
   ng serve
   ```

---

## Reporting Bugs

Use GitHub’s [issue tracker](https://github.com/zapuilib/zapui/issues) to report bugs.

### What Makes a Great Bug Report?

- **Summary** – A brief description of the issue.
- **Steps to Reproduce** – A clear, step-by-step guide.
- **Expected vs. Actual Behavior** – Explain the difference.
- **Code Samples (if applicable)** – Help us reproduce the issue.
- **Additional Notes** – Any insights or debugging attempts.

Consider using a [bug report template](https://github.com/zapuilib/zapui/issues) for better clarity.

---

## License

All contributions are licensed under the [MIT License](http://choosealicense.com/licenses/mit/). By contributing, you agree to this licensing policy.

---

Thank you for helping improve ZAP!
