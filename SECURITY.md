# Security Policy

## Scope

This repository contains a web application that uses AI APIs (Google Gemini) for competitive research. Security concerns include:

- API key exposure and misuse
- Sensitive business data handling
- User input validation
- Cross-site scripting (XSS) vulnerabilities
- Rate limiting and abuse prevention
- Privacy violations

## Reporting a Vulnerability

**Do not open a public issue for security vulnerabilities.**

Contact the maintainer privately through the repository owner's GitHub profile and include:

1. The affected file or component
2. A concise description of the vulnerability
3. Steps to reproduce (without exposing sensitive data)
4. Potential impact
5. Suggested mitigation (if available)

Allow reasonable time for response and remediation before public disclosure.

## Security Requirements

### For Contributors

- **Never** commit API keys or credentials to version control
- **Always** validate and sanitize all user inputs
- **Always** use HTTPS for all external API calls
- **Never** include sensitive data in code or documentation
- **Test** all security-related changes thoroughly
- **Review** changes for security implications

### For Users

- **Review** .env files before deployment
- **Rotate** API keys regularly
- **Restrict** API key permissions (least privilege)
- **Monitor** API usage for anomalies
- **Update** regularly to get security fixes
- **Use** HTTPS in production
- **Secure** your deployment environment

## Supported Versions

Security fixes are applied to the current main branch. Report issues with:
- Commit SHA
- Node.js version
- Browser and OS
- Environment details

## Security Best Practices

### API Keys

| Practice | Requirement |
|----------|-------------|
| Use environment variables | ✅ All API keys in .env |
| Never commit .env | ✅ .env in .gitignore |
| Use least privilege | ✅ Minimal required permissions |
| Rotate regularly | ✅ Change keys periodically |
| Restrict access | ✅ Limit who can access keys |

### Input Validation

| Input | Validation |
|-------|------------|
| User inputs | ✅ Sanitize and validate |
| API responses | ✅ Validate before processing |
| File uploads | ✅ Scan for malware |
| URLs | ✅ Validate format and domain |

### Output Security

| Output | Protection |
|--------|------------|
| HTML | ✅ Escape special characters |
| API responses | ✅ Filter sensitive data |
| Error messages | ✅ No sensitive data exposed |
| Logs | ✅ No sensitive data logged |

## Specific Vulnerabilities

### Cross-Site Scripting (XSS)

- All user inputs are escaped before rendering
- Use React's built-in XSS protection
- Sanitize HTML from external sources

### API Key Leakage

- Never log API keys
- Never return API keys in responses
- Never store API keys in client-side code

### Rate Limiting

- Implement client-side rate limiting
- Respect API provider rate limits
- Handle rate limit errors gracefully

### Data Exposure

- Filter sensitive data from responses
- Encrypt sensitive data at rest
- Use HTTPS for all communications

## Out of Scope

This project does not:
- Provide hosting
- Manage API key infrastructure
- Store user data (beyond session)
- Process payments

Reports about third-party services (Google Gemini, etc.) should be directed to those providers.

---

*Last updated: September 11, 2026*
*Maintainer: Stijnman*
