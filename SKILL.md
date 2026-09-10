# Competitor Researcher

**Description**: AI-assisted competitive research web application. Built with React + Vite + TypeScript + Gemini API for automated competitive intelligence gathering and analysis.

**Purpose**: Enable businesses to automatically research and analyze competitors, track market changes, and generate actionable intelligence reports.

---

## 🎯 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Google Gemini API key (for AI features)

### Installation

```bash
# Clone the repository
git clone https://github.com/Stijnman/competitor_researcher.git
cd competitor_researcher

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env with your API keys
nano .env

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Docker (Optional)

```bash
# Build and run with Docker
docker build -t competitor-researcher .
docker run -p 3000:3000 -e GEMINI_API_KEY=your-key competitor-researcher
```

---

## 🏗️ Architecture

```
competitor_researcher/
├── src/                      # React source code
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   ├── index.css            # Global styles
│   └── types.ts             # TypeScript types
├── server.ts                # Backend server (Express)
├── fallbackGenerator.ts     # Fallback content generator
├── assets/                  # Static assets
├── index.html               # HTML entry point
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Node.js dependencies
├── .env.example             # Environment template
├── DEPLOY.md                # Deployment guide
└── metadata.json            # Application metadata
```

### Key Components

| Component | Technology | Purpose |
|-----------|------------|---------|
| Frontend | React + TypeScript | User interface and visualization |
| Build Tool | Vite | Fast development and production builds |
| Backend | Express (server.ts) | API endpoints and AI processing |
| AI | Google Gemini API | Competitor analysis and intelligence |
| Styling | CSS | Component styling |

---

## 🎯 Features

### Core Features

| Feature | Description |
|---------|-------------|
| **Competitor Tracking** | Monitor competitor websites and changes |
| **Market Analysis** | Analyze market trends and positioning |
| **AI-Powered Research** | Automated research using Google Gemini |
| **Report Generation** | Generate actionable intelligence reports |
| **Real-time Alerts** | Get notified of competitor changes |
| **Historical Data** | Track changes over time |

### Technical Features

- ✅ React 18 with TypeScript
- ✅ Vite for fast development
- ✅ Express backend
- ✅ Google Gemini API integration
- ✅ Responsive design
- ✅ Production-ready builds

---

## 🔐 Security Overview

⚠️ **IMPORTANT**: This application handles API keys and may process sensitive business data.

**Please read [SECURITY.md](./SECURITY.md) before using this application.**

### Security Principles

| Principle | Implementation |
|-----------|----------------|
| **API Key Protection** | Never commit API keys to version control |
| **Environment Variables** | All secrets stored in .env file |
| **HTTPS Only** | All API calls use HTTPS |
| **Input Validation** | All user inputs are validated |
| **Error Handling** | Errors handled without exposing sensitive data |
| **Rate Limiting** | API calls respect rate limits |

### Sensitive Data

Never commit to version control:
- API keys (Gemini, etc.)
- Database credentials
- Session secrets
- Private business data
- Authentication tokens

---

## 📚 Documentation

| Document | Description | Required Reading |
|----------|-------------|------------------|
| **[SECURITY.md](./SECURITY.md)** | ⚠️ **REQUIRED** - Security policy and best practices | ✅ All users |
| **[CONTRIBUTING.md](./CONTRIBUTING.md)** | How to contribute improvements | ⚠️ Contributors |
| **[TESTING.md](./TESTING.md)** | Testing requirements and guide | ⚠️ Contributors |
| **[DEPLOY.md](./DEPLOY.md)** | Deployment guide | ✅ For deployment |
| **[CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)** | Community guidelines | ✅ All users |
| **[CHANGELOG.md](./CHANGELOG.md)** | Version history and changes | ⚠️ All users |
| **[LICENSE](./LICENSE)** | MIT License terms | ✅ All users |
| **[README.md](./README.md)** | Project overview | ✅ All users |

---

## 📖 Configuration

### Environment Variables

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Required
GEMINI_API_KEY=your-gemini-api-key
PORT=3000

# Optional
NODE_ENV=development
BASE_URL=http://localhost:3000
MAX_CONCURRENT_REQUESTS=5
RATE_LIMIT=100
```

**Never commit .env to version control!**

### API Configuration

The application uses Google Gemini API for AI-powered research. Configure in `.env`:

```env
GEMINI_API_KEY=your-key-here
```

Get your API key from: https://makersuite.google.com/app/apikey

---

## 🚀 Deployment

See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions.

### Quick Deployment Options

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

#### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy
```

#### Docker

```bash
# Build image
docker build -t competitor-researcher .

# Run container
docker run -p 3000:3000 -e GEMINI_API_KEY=your-key competitor-researcher
```

#### Manual Deployment

1. Run `npm run build`
2. Copy `dist/` contents to your web server
3. Start the server with `node server.js` (if using server-side features)

---

## 🎓 Usage Examples

### Example 1: Track a Competitor

```
1. Open the application in your browser
2. Click "Add Competitor"
3. Enter competitor website URL
4. Select research parameters
5. Run analysis
6. View results
```

### Example 2: Generate a Report

```
1. Navigate to "Reports" section
2. Select time period
3. Select competitors to include
4. Generate report
5. Download or share report
```

### Example 3: Set Up Alerts

```
1. Navigate to "Alerts" section
2. Create new alert
3. Select competitor and trigger conditions
4. Save alert
5. Get notified when conditions are met
```

---

## 🧪 Testing

All features have been tested for production use. See [TESTING.md](./TESTING.md) for:

- Testing philosophy and requirements
- Manual testing checklists
- Automated testing setup
- Deployment testing guide

**Quality Assurance**:
- ✅ All components tested
- ✅ All API endpoints tested
- ✅ All user flows tested
- ✅ Cross-browser compatibility verified
- ✅ Mobile responsiveness verified

---

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for:

- How to add new features
- How to improve existing code
- Testing requirements
- Pull request process
- Code of conduct

### Quick Contribution Guide

1. **Fork** the repository
2. **Clone** your fork
3. **Create** a feature branch
4. **Install** dependencies with `npm install`
5. **Make** your changes
6. **Test** thoroughly
7. **Commit** with clear messages
8. **Push** to your fork
9. **Open** a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**. See [LICENSE](./LICENSE) for full license text.

**You are free to**:
- Use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
- Use for commercial purposes
- Modify for your own needs

**Under the following conditions**:
- Include copyright notice and license in all copies
- Provide attribution to the original author (Stijnman)

---

## 📞 Support

| Issue Type | How to Get Help | Response Time |
|-----------|-----------------|---------------|
| 🐛 **Bug Report** | [Open a GitHub Issue](https://github.com/Stijnman/competitor_researcher/issues) | 24-48 hours |
| 🔒 **Security Issue** | Private message via GitHub profile | Immediate |
| ❓ **General Question** | [Open a GitHub Discussion](https://github.com/Stijnman/competitor_researcher/discussions) | 24 hours |
| 💡 **Feature Request** | [Open a GitHub Issue](https://github.com/Stijnman/competitor_researcher/issues) | 1 week |

---

## 🏷️ Repository Metadata

| Attribute | Value |
|-----------|-------|
| **Repository** | [competitor_researcher](https://github.com/Stijnman/competitor_researcher) |
| **Owner** | [Stijnman](https://github.com/Stijnman) |
| **License** | MIT |
| **Language** | TypeScript, React, HTML |
| **Framework** | Vite, Express |
| **AI** | Google Gemini |
| **Created** | September 2026 |
| **Last Updated** | September 2026 |

---

## 🔗 Dependencies

### Core Dependencies

| Dependency | Version | Purpose |
|------------|---------|---------|
| React | 18+ | Frontend framework |
| TypeScript | 5+ | Type system |
| Vite | 4+ | Build tool |
| Express | 4+ | Backend server |
| @google/generative-ai | Latest | Google Gemini SDK |

### Dev Dependencies

| Dependency | Purpose |
|------------|---------|
| @types/react | TypeScript types for React |
| @types/node | TypeScript types for Node.js |
| @vitejs/plugin-react | Vite React plugin |
| typescript | TypeScript compiler |
| tsx | TypeScript execution |

---

## 📌 Important Notes

### Design Principle
> **Security First**: All API keys and sensitive data must be protected. Never commit secrets to version control.

### Usage Warning
> **Test locally first**: Always test the application locally before deploying to production.

### Performance Considerations
> **Rate limits apply**: Respect API rate limits to avoid being blocked.

---

*Last updated: September 11, 2026*
*Maintainer: Stijnman*
*Repository: [competitor_researcher](https://github.com/Stijnman/competitor_researcher)*
