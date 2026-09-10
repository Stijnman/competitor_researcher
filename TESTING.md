# Testing Guide

This document outlines the testing requirements and best practices for Competitor Researcher.

---

## 📋 Table of Contents

- [Testing Philosophy](#-testing-philosophy)
- [Testing Levels](#-testing-levels)
- [Manual Testing](#-manual-testing)
- [Automated Testing](#-automated-testing)
- [Test Environment](#-test-environment)
- [Test Data](#-test-data)

---

## 🎯 Testing Philosophy

### Core Principles

1. **Safety First**: Never test with production API keys
2. **Validation**: All inputs and outputs must be validated
3. **Security**: All tests must maintain security standards
4. **Completeness**: Test all features and edge cases
5. **Cross-browser**: Test on multiple browsers and devices

### What Must Be Tested

Every change **MUST** be tested for:
- ✅ All UI components render correctly
- ✅ All API endpoints work
- ✅ All user flows complete successfully
- ✅ No XSS vulnerabilities
- ✅ No API key exposure
- ✅ Responsive design on all devices
- ✅ Error handling works correctly
- ✅ TypeScript compiles without errors

---

## 🏗️ Testing Levels

### Level 1: Unit Testing (Recommended)

Test individual components and functions:

```typescript
// src/App.test.tsx
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/Competitor Researcher/i)).toBeInTheDocument();
  });
});
```

```typescript
// server.test.ts
import request from 'supertest';
import app from './server';

describe('API Endpoints', () => {
  test('GET /api/health should return 200', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
  });
});
```

### Level 2: Integration Testing (Recommended)

Test component interactions and API integrations:

```typescript
// src/integration.test.tsx
import { render, fireEvent, waitFor } from '@testing-library/react';
import CompetitorList from './components/CompetitorList';

describe('CompetitorList Integration', () => {
  test('loads and displays competitors', async () => {
    const mockCompetitors = [{ id: '1', name: 'Test' }];
    // Mock API call
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockCompetitors)
    }));
    
    render(<CompetitorList />);
    await waitFor(() => {
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });
});
```

### Level 3: End-to-End Testing (Required)

Test complete user flows:

1. Open application in browser
2. Add a competitor
3. Run analysis
4. View results
5. Generate report
6. Test all navigation

---

## 👤 Manual Testing

### Required Manual Tests

#### Frontend Tests
- [ ] Application loads without errors
- [ ] All pages render correctly
- [ ] All components interact correctly
- [ ] All buttons and links work
- [ ] All forms submit correctly
- [ ] All validations work
- [ ] Error messages display correctly

#### Backend Tests
- [ ] All API endpoints respond correctly
- [ ] All API endpoints handle errors
- [ ] All API endpoints validate inputs
- [ ] All API endpoints respect rate limits
- [ ] All API endpoints use HTTPS

#### Integration Tests
- [ ] AI analysis works correctly
- [ ] Competitor tracking works
- [ ] Report generation works
- [ ] Alert system works
- [ ] Historical data is tracked

#### Browser Tests
- [ ] Chrome: Application works
- [ ] Firefox: Application works
- [ ] Safari: Application works
- [ ] Edge: Application works
- [ ] Mobile Chrome: Application works
- [ ] Mobile Safari: Application works

### Manual Testing Checklist

```markdown
# Testing Checklist: [Feature/Change]

## Setup
- [ ] Test environment configured
- [ ] Test API key available
- [ ] Test data prepared

## Frontend Tests
- [ ] UI renders correctly
- [ ] All components work
- [ ] All interactions work
- [ ] No console errors
- [ ] No warnings

## Backend Tests
- [ ] API endpoints work
- [ ] Input validation works
- [ ] Error handling works
- [ ] Rate limiting works
- [ ] No sensitive data exposed

## Integration Tests
- [ ] AI integration works
- [ ] Data flows correctly
- [ ] All features work together

## Security Tests
- [ ] No XSS vulnerabilities
- [ ] No API key exposure
- [ ] Input validation works
- [ ] Sensitive data protected

## Browser Tests
- [ ] Chrome: ✅
- [ ] Firefox: ✅
- [ ] Safari: ✅
- [ ] Edge: ✅
- [ ] Mobile: ✅

## Cleanup
- [ ] Test data removed
- [ ] Environment restored

## Results
- [ ] All tests passed
- [ ] Issues found: _______________
- [ ] Notes: _____________________
```

---

## 🤖 Automated Testing

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run type checking
npx tsc --noEmit

# Run linting
npm run lint
```

### Test File Structure

```
competitor_researcher/
├── src/
│   ├── __tests__/
│   │   ├── App.test.tsx
│   │   ├── components/
│   │   │   └── *.test.tsx
│   │   └── api/
│   │       └── *.test.ts
│   └── ...
├── server.test.ts
└── package.json
```

---

## 🌍 Test Environment

### Local Development

```bash
# Start development server
npm run dev

# Open in browser
http://localhost:3000
```

### Test Configuration

Use `.env.test` for testing:

```env
# .env.test
GEMINI_API_KEY=test-key-for-testing
PORT=3001
NODE_ENV=test
```

**Never use production API keys for testing!**

---

## 📊 Test Data

### Sample Test Data

```typescript
// src/__mocks__/competitors.ts
export const mockCompetitors = [
  {
    id: 'test-1',
    name: 'Test Competitor 1',
    url: 'https://example.com',
    category: 'Test',
    lastAnalyzed: new Date().toISOString()
  },
  {
    id: 'test-2',
    name: 'Test Competitor 2',
    url: 'https://example.org',
    category: 'Test',
    lastAnalyzed: new Date().toISOString()
  }
];
```

### Test Data Principles

1. Use fake data only
2. Use example.com/example.org for test URLs
3. Use test API keys
4. Clean up after testing

---

## ✅ Test Checklists

### Pre-Commit Checklist

- [ ] All tests pass
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] No lint errors
- [ ] No sensitive data

### Pre-PR Checklist

- [ ] All manual tests pass
- [ ] All automated tests pass
- [ ] Code follows guidelines
- [ ] Documentation updated
- [ ] No sensitive data

### Pre-Release Checklist

- [ ] All tests pass
- [ ] All PRs merged
- [ ] CHANGELOG.md updated
- [ ] Version numbers updated
- [ ] Security review completed

---

## 🛠️ Test Utilities

### Mocking

```typescript
// __mocks__/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

export const mockGemini = {
  generateContent: jest.fn().mockResolvedValue({
    response: { text: () => Promise.resolve('mock response') }
  })
};

jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => mockGemini)
}));
```

### Test Helpers

```typescript
// test/utils.ts
export const waitForAsync = (callback: () => Promise<void>) => {
  return async () => {
    await callback();
  };
};

export const mockFetch = (response: any) => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(response)
  }));
};
```

---

## 🎯 Summary

| Aspect | Requirement |
|--------|-------------|
| Manual Testing | ✅ Required for all changes |
| Automated Testing | ⚠️ Recommended for all features |
| Test Coverage | Test all features and edge cases |
| Test Environment | Never use production data |
| Validation | ✅ Required for all PRs |

**Remember**: Thorough testing ensures the application works reliably and securely for all users.

---

*Last updated: September 11, 2026*
*Maintainer: Stijnman*
