# Cover Letter Updater

A Next.js app to generate customized cover letters as PDFs, using markdown-it, jsPDF, and Tailwind CSS. Deployed on Netlify with GitHub Actions CI/CD.

## Features

- Input fields for company name and position.
- Dynamic date insertion (e.g., "June 24, 2025").
- Markdown template (`public/cover_letter.md`) with placeholders (`{{company}}`, `{{position}}`, `{{date}}`).
- PDF generation (A4, 25mm margins, 12pt font, 5mm line spacing, justified text, Roboto font with Times fallback).
- Hosted on Netlify.

## Setup

1. **Clone Repository**:
   ```bash
   git clone https://github.com/Snag-hub/coverletter-updater.git
   cd coverletter-updater
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run Locally**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000`.
4. **Test**:
   - Enter company and position.
   - Click "Update & Download PDF" to verify PDF output.
5. **Build**:
   ```bash
   npm run build
   ```

## Deployment (Netlify)

1. **Link to Netlify**:
   - Sign in to [Netlify](https://www.netlify.com/).
   - Click **New site from Git** > Connect to GitHub > Select `coverletter-updater`.
   - Set:
     - Branch: `main`
     - Build command: `npm run build`
     - Publish directory: `out`
   - Deploy.
2. **GitHub Actions**:
   - Pushes to `main` trigger automatic deployment (see `.github/workflows/deploy.yml`).
3. **Access Site**:
   - Visit the Netlify URL (e.g., `https://coverletter-updater.netlify.app`).

## Customization

- **Edit Template**: Modify `public/cover_letter.md`.
- **Font**: Update font URL in `CoverLetterForm.jsx`.
- **Justification**: Adjust `justificationThreshold` in `CoverLetterForm.jsx`.

## Future Features

- User management with local storage.
- Template viewer and rich text editor.
- Save templates in local storage.

## Troubleshooting

- **404 Errors**: Ensure `cover_letter.md` is in `public/` and accessible at `/cover_letter.md`.
- **Font Issues**: Embed base64 font if CORS fails.
- **Build Fails**: Check `npm install` and Next.js logs.

## License

MIT License
