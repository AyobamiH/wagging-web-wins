# Security Policy

## Reporting Security Vulnerabilities

We take the security of Tail Wagging Websites seriously. If you discover a security vulnerability, please follow these responsible disclosure guidelines:

### Private Reporting

**DO NOT** create a public GitHub issue for security vulnerabilities.

Instead, please report security issues privately to:
- **Email**: security@tailwaggingwebdesign.com (or your designated security contact)
- **Response Time**: We aim to respond within 48 hours
- **Resolution Timeline**: Critical issues will be prioritized and patched within 7 days

### What to Include

When reporting a vulnerability, please provide:

1. **Description** of the vulnerability and its potential impact
2. **Steps to reproduce** the issue (proof-of-concept)
3. **Affected components** (URLs, endpoints, functions, database tables)
4. **Suggested fix** (if you have one)
5. **Your contact information** for follow-up questions

### What to Expect

After you report a vulnerability:

1. **Acknowledgment**: We'll acknowledge receipt within 48 hours
2. **Validation**: We'll validate and assess the severity
3. **Fix Development**: We'll develop and test a fix
4. **Disclosure**: We'll coordinate public disclosure with you
5. **Credit**: We'll credit you in our security changelog (if desired)

## Security Best Practices for Contributors

If you're contributing code to this project:

### Code Reviews

- All pull requests require security review for changes to:
  - Authentication/authorization logic
  - Database queries and RLS policies
  - Payment processing
  - User input handling
  - Edge functions and API endpoints

### Testing Requirements

Before submitting:

- [ ] Test with malicious input (XSS attempts, SQL injection)
- [ ] Verify RLS policies prevent unauthorized access
- [ ] Check that rate limiting works correctly
- [ ] Ensure secrets are not committed to git
- [ ] Confirm error messages don't leak sensitive data

### Prohibited Practices

**NEVER:**

- Commit secrets, API keys, or passwords to the repository
- Disable security features (RLS, CORS, rate limiting) without approval
- Use `dangerouslySetInnerHTML` without `DOMPurify.sanitize()`
- Bypass authentication checks in client-side code only
- Log sensitive data (passwords, payment details, PII)
- Use `eval()` or similar dynamic code execution
- Trust user input without validation

## Current Security Measures

This project implements defense-in-depth security:

### Application Security

✅ **XSS Protection**: All user-generated HTML sanitized with DOMPurify  
✅ **SQL Injection Prevention**: Parameterized queries only, no raw SQL  
✅ **CSRF Protection**: SameSite cookies + CORS restrictions  
✅ **Rate Limiting**: Token bucket algorithm, fails closed on errors  
✅ **Input Validation**: Zod schemas on all API endpoints  
✅ **Payload Size Limits**: Max 10KB for contact forms, 5KB for email updates

### Infrastructure Security

✅ **Row Level Security**: Enabled on all sensitive tables  
✅ **Webhook Signatures**: HMAC-SHA256 verification for n8n webhooks  
✅ **Security Headers**: CSP, HSTS, X-Frame-Options, X-Content-Type-Options  
✅ **Audit Logging**: Admin operations tracked in audit_log table  
✅ **Anonymous Denial Policies**: Explicit blocks on customer/payment data  
✅ **Service Role Isolation**: Payment/rate limit tables only accessible to service role

### Authentication & Authorization

✅ **Supabase Auth**: Industry-standard JWT-based authentication  
✅ **Password Protection**: Leaked password detection enabled  
✅ **Role-Based Access**: Separate user_roles table, security definer functions  
✅ **Admin Verification**: Server-side is_admin() checks, not client-side only

## Penetration Testing

### Annual Testing Schedule

We conduct annual penetration testing by qualified security professionals:

- **Frequency**: Once per year (minimum)
- **Scope**: Full application + infrastructure
- **Standards**: OWASP Top 10, SANS Top 25
- **Report**: Findings shared with development team
- **Remediation**: Critical issues fixed within 7 days, high within 30 days

### Last Penetration Test

- **Date**: 2025-01-14
- **Conducted By**: Internal security review
- **Findings**: 8 critical/high issues identified and fixed
- **Status**: ✅ Production-ready after fixes applied

### Next Scheduled Test

- **Target Date**: 2026-01-14
- **Provider**: External security firm (TBD)

## Bug Bounty Program

We currently **do not** have a formal bug bounty program. However, we deeply appreciate responsible security researchers:

- **Recognition**: We'll credit you in our security changelog
- **Swag**: We may send Tail Wagging Websites branded merchandise
- **Future Program**: As we grow, we plan to establish a paid bug bounty program

## Security Updates

Stay informed about security updates:

- **Changelog**: See `docs/security-changelog.md` for all security fixes
- **Notifications**: Subscribe to our security mailing list (coming soon)
- **GitHub Releases**: Security patches noted in release notes

## Compliance & Standards

This project follows:

- **OWASP Top 10**: Web application security best practices
- **GDPR**: EU data protection regulations (for customer PII)
- **PCI DSS**: Payment card industry standards (via Stripe)
- **CWE Top 25**: Common weakness enumeration

## Security Team

**Security Lead**: [Your Name/Team]  
**Contact**: security@tailwaggingwebdesign.com  
**PGP Key**: (Optional - add if you have one)

## Acknowledgments

We thank the following researchers for responsibly disclosing vulnerabilities:

- *2025-01-14*: Internal security audit identified 8 critical/high issues (fixed)

---

**Version**: 1.0  
**Last Updated**: 2025-01-14  
**Next Review**: 2025-07-14
