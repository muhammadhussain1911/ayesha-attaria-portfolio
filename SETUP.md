# Portfolio Website Setup Guide

## Quick Start

### 1. Environment Configuration
Copy `.env.local.example` to `.env.local` and fill in your SMTP credentials:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local`:
```
SMTP_HOST=smtp.gmail.com          # Your email provider's SMTP server
SMTP_PORT=587                      # Usually 587 (TLS) or 465 (SSL)
SMTP_SECURE=false                  # false for 587, true for 465
SMTP_USER=your-email@gmail.com    # Your email address
SMTP_PASS=your-app-password       # App-specific password (not regular password)
CONTACT_EMAIL=your-email@gmail.com # Where contact form emails will be sent
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Run Development Server
```bash
pnpm dev
```

Visit http://localhost:3000 to see the site.

### 4. Build for Production
```bash
pnpm build
pnpm start
```

## Email Configuration

### Gmail
1. Enable 2FA on your Google Account
2. Generate an [App Password](https://myaccount.google.com/apppasswords)
3. Use the 16-character password in `SMTP_PASS`
4. Set `SMTP_HOST=smtp.gmail.com` and `SMTP_PORT=587`

### SendGrid
1. Create API key at https://sendgrid.com
2. Set `SMTP_USER=apikey`
3. Set `SMTP_PASS=your-sendgrid-api-key`
4. Set `SMTP_HOST=smtp.sendgrid.net`

### AWS SES
1. Verify your email in AWS SES console
2. Create SMTP credentials
3. Use provided SMTP hostname and credentials

### Other Providers
- Mailgun, Brevo (Sendinblue), Postmark, etc. - follow their SMTP setup guides

## Customization

### Site Content
- **Home**: Edit `components/home/*.tsx` for sections
- **About**: Edit `app/about/page.tsx`
- **Skills**: Edit `app/skills/page.tsx`
- **Experience**: Edit `app/experience/page.tsx`
- **Certifications**: Edit `app/certifications/page.tsx`
- **Projects**: Edit `app/projects/page.tsx`
- **Blog**: Edit `app/blog/page.tsx` and `app/blog/[slug]/page.tsx`

### Brand Colors
Edit `tailwind.config.ts`:
- `accent: "#4ddcd3"` - Main teal color
- `"accent-hover": "#2ec4bb"` - Hover state

Edit `app/globals.css` for design tokens (CSS variables).

### Typography
Fonts configured in `app/layout.tsx`:
- Space Grotesk (headings)
- DM Sans (body text)
- JetBrains Mono (code/monospace)

To change: Edit the font imports and update `tailwind.config.ts`

### Contact Form
- API endpoint: `app/api/contact/route.ts`
- Form component: `components/contact/ContactForm.tsx`
- Edit these files to add/remove fields or change validation

## Project Structure

```
app/                          # Next.js App Router pages
├── api/contact/route.ts     # Email API endpoint
├── blog/                    # Blog pages
├── page.tsx                 # Home page
└── [other pages]

components/
├── home/                    # Home page sections
├── contact/                 # Contact form
├── layout/                  # Navigation & footer
├── shared/                  # Reusable components
└── seo/                     # Schema markup

tailwind.config.ts          # Tailwind theme config
app/globals.css             # Global styles & animations
```

## Key Features

### Animations
- **TypewriterText**: Animated role cycling in hero
- **CountUpNumber**: Stat counters triggered on scroll
- **Fade-up**: Section reveals on scroll
- **Glow**: Button hover effects

To modify animations: Edit `app/globals.css` and `tailwind.config.ts`

### Responsive Design
Mobile-first breakpoints:
- Mobile: < 640px (bottom navigation)
- Tablet: 640px - 1024px
- Desktop: 1024px+

### SEO
- Unique metadata per page
- JSON-LD schema markup
- Auto-generated sitemap
- Open Graph & Twitter cards
- Canonical URLs

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables (SMTP_HOST, SMTP_PORT, etc.)
4. Deploy!

### Self-Hosted
1. Build: `pnpm build`
2. Start: `pnpm start`
3. Use PM2 or similar for process management
4. Set environment variables on server

## Troubleshooting

### "SMTP_HOST is not configured"
Make sure all SMTP variables are set in `.env.local`:
```
SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL
```

### Contact form not sending
1. Check SMTP credentials are correct
2. Check email isn't in spam folder
3. Verify SMTP port (usually 587 not 25)
4. Check server firewall allows outbound on SMTP port

### Styles not loading
Run `pnpm install` and clear `.next` folder:
```bash
rm -rf .next
pnpm dev
```

### Build errors
1. Check Node.js version (18+ required)
2. Clear cache: `rm -rf node_modules .next && pnpm install`
3. Rebuild: `pnpm build`

## Performance Tips

1. **Images**: Replace placeholders with optimized images
2. **Fonts**: Already using next/font for optimal loading
3. **Analytics**: Consider adding Vercel Analytics or Plausible
4. **Cache**: Blog posts are statically generated
5. **SEO**: Monitor Core Web Vitals in Vercel Analytics

## Security

- ✓ Environment variables for secrets
- ✓ Form validation with Zod
- ✓ No hardcoded API keys
- ✓ CSRF protection via Next.js
- ✓ Input sanitization in forms

## Support & Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Nodemailer](https://nodemailer.com)
- [React Hook Form](https://react-hook-form.com)

## Updates & Maintenance

- Check for package updates monthly: `pnpm update`
- Test contact form after updates
- Monitor error logs (consider Sentry)
- Keep Node.js and dependencies current

---

Need help? Check BUILD_SUMMARY.md for architecture details.
