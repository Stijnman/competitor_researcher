# Contributing

Thank you for your interest in improving Competitor Researcher! We welcome contributions that make the application more useful, reliable, and easier to use.

---

## 📋 Table of Contents

- [Before You Begin](#-before-you-begin)
- [How to Contribute](#-how-to-contribute)
- [Development Setup](#-development-setup)
- [Pull Request Process](#-pull-request-process)
- [Code Guidelines](#-code-guidelines)
- [Testing](#-testing)
- [Reporting Issues](#-reporting-issues)

---

## 🎯 Before You Begin

Please review the following before contributing:

1. **Read** this CONTRIBUTING.md file
2. **Read** [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
3. **Read** [SECURITY.md](./SECURITY.md) for security-related contributions
4. **Search** existing issues and pull requests to avoid duplicates

---

## 🤝 How to Contribute

### Reporting Bugs

- Use the GitHub issue tracker
- Include steps to reproduce
- Include expected vs actual behavior
- Include screenshots if applicable
- Include your Node.js version, browser, and OS

### Suggesting Features

- Open a GitHub issue with your feature request
- Explain the use case
- Explain the expected behavior
- Include any relevant examples

### Submitting Code

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Install dependencies with `npm install`
4. Make your changes
5. Test thoroughly
6. Commit with clear messages
7. Push to your fork
8. Open a Pull Request to main branch

---

## 💻 Development Setup

```bash
# Clone the repository
git clone https://github.com/Stijnman/competitor_researcher.git
cd competitor_researcher

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your API keys
nano .env

# Start development server
npm run dev

# Build for production
npm run build
```

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run type checking
npx tsc --noEmit
```

---

## 📝 Pull Request Process

1. **Title**: Clear and descriptive (use prefix: feat:, fix:, docs:, refactor:)
2. **Description**: Explain what and why
3. **Testing**: Describe how you tested your changes
4. **Screenshots**: Include if UI changes
5. **Checklist**:
   - [ ] All tests pass
   - [ ] Code follows guidelines
   - [ ] Documentation updated
   - [ ] No sensitive data
   - [ ] All links work
   - [ ] TypeScript compiles without errors

Maintainers will review and may request changes before merging.

---

## 💻 Code Guidelines

### TypeScript/React

- Follow React best practices
- Use functional components with hooks
- Type all props and state
- Use descriptive variable and function names
- Keep components small and focused
- Use proper error boundaries

### Backend (Express)

- Follow Express best practices
- Validate all inputs
- Use proper error handling
- Sanitize all outputs
- Use HTTPS for all external calls

### General

- Follow consistent code style
- Add comments for complex logic
- Keep commits atomic
- Use descriptive commit messages
- Update documentation with code changes

---

## 🧪 Testing

All contributions should be tested:

### Manual Testing

- [ ] Test all UI components
- [ ] Test all API endpoints
- [ ] Test all user flows
- [ ] Test on different browsers
- [ ] Test on mobile devices

### Automated Testing

Run existing tests:
```bash
npm test
```

### Test Checklist

Before submitting a PR:
- [ ] All existing tests pass
- [ ] New tests added for new functionality
- [ ] Edge cases tested
- [ ] Error handling tested
- [ ] UI is responsive
- [ ] No console errors

---

## 🐛 Reporting Issues

When reporting issues:

- Use clear, descriptive title
- Include steps to reproduce
- Include expected vs actual behavior
- Include screenshots if applicable
- Include your environment (Node.js version, browser, OS)
- Include relevant code snippets

**Do not** report security vulnerabilities publicly. See [SECURITY.md](./SECURITY.md) for private reporting.

---

## 📚 Additional Resources

- [LICENSE](./LICENSE) - License information
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) - Community guidelines
- [SECURITY.md](./SECURITY.md) - Security policy
- [DEPLOY.md](./DEPLOY.md) - Deployment guide

---

*Last updated: September 11, 2026*
*Maintainer: Stijnman*
