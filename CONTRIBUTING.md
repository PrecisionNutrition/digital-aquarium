# Contributing to Digital Aquarium

We love your input! We want to make contributing to Digital Aquarium as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## We Develop with Github
We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## We Use [Github Flow](https://guides.github.com/introduction/flow/index.html)
Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `develop`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes with >80% coverage.
5. Make sure your code lints.
6. Issue that pull request!

## Any contributions you make will be under the MIT Software License
In short, when you submit code changes, your submissions are understood to be under the same [MIT License](LICENSE) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using Github's [issues](https://github.com/PrecisionNutrition/digital-aquarium/issues)
We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/PrecisionNutrition/digital-aquarium/issues/new); it's that easy!

## Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Development Process

1. **Setup**: Follow the README to set up your development environment
2. **Branch**: Create a feature branch from `develop`
3. **Code**: Write your code following our standards
4. **Test**: Write tests for your code
5. **Lint**: Run `yarn lint` and fix any issues
6. **Format**: Run `yarn format` to ensure consistent formatting
7. **Commit**: Use [conventional commits](https://www.conventionalcommits.org/)
8. **Push**: Push your branch and create a PR

## Code Style

- We use ESLint and Prettier for code style
- TypeScript strict mode is enabled
- Follow the SOLID principles
- Keep files focused on a single responsibility
- Write tests for all new functionality

## Testing

- Unit tests for all business logic
- Integration tests for Electron IPC
- Component tests for React components
- Minimum 80% code coverage required

## License
By contributing, you agree that your contributions will be licensed under its MIT License.

## References
This document was adapted from the open-source contribution guidelines for [Facebook's Draft](https://github.com/facebook/draft-js/blob/a9316a723f9e918afde44dea68b5f9f39b7d9b00/CONTRIBUTING.md)
