# Contributing to BanDDoS

Thank you for your interest in contributing to BanDDoS. This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Issues

- Search for existing issues before creating a new one
- Use the issue template when available
- Include detailed steps to reproduce the issue
- Provide system information and logs when relevant

### Pull Requests

1. Fork the repository
2. Create a new branch from `main`:
```bash
git checkout -b feature/your-feature-name
```
3. Make your changes
4. Write or update tests as needed
5. Run tests locally
6. Commit your changes:
```bash
git commit -m "feat: add new feature"
```
7. Push to your fork:
```bash
git push origin feature/your-feature-name
```
8. Open a Pull Request

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/portafuku/BanDDoS.git
cd BanDDoS
```

2. Install dependencies:
```bash
npm install
```

3. Create configuration file:
```bash
cp config.example.json config.json
```

## Coding Standards

- Use ES6+ features
- Follow existing code style
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful variable names
- Document new methods and classes

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Include both unit and integration tests
- Test edge cases and error conditions

## Documentation

- Update README.md for new features
- Document new attack methods
- Include usage examples
- Update configuration options
- Add JSDoc comments for APIs

## Commit Guidelines

Use conventional commits format:

- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `test:` adding or updating tests
- `refactor:` code refactoring
- `style:` formatting changes
- `chore:` maintenance tasks

## Security

- Never commit sensitive data
- Report security issues privately
- Follow secure coding practices
- Validate all inputs
- Handle errors appropriately

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
