# Freedom Intelligence
**Freedom Intelligence** is an AI-powered Website Intelligence Platform built with Next.js and TypeScript. It analyzes websites across SEO, technical health, security, accessibility, performance, and more, then presents actionable recommendations through a clear website intelligence report.

## Features

* Website URL analysis
* Website IQ score
* Website Health score and grade
* Basic SEO analysis
* Technical SEO analysis
* Social metadata analysis
* HTTPS and security checks
* Image accessibility and `alt` attribute checks
* Internal and external link analysis
* Accessibility checks
* Server response-time performance analysis
* Prioritized recommendations
* AI Website Consultant summary
* Interactive dashboard
* Score breakdown charts
* Report navigation
* Browser-based PDF report export
* Recent Scans history
* Responsive mobile layout

## Technology Stack

* **Framework:** Next.js
* **Language:** TypeScript
* **UI:** React and Tailwind CSS
* **HTML Parsing:** Cheerio
* **Charts:** Recharts
* **Icons:** Lucide React
* **Storage:** Browser `localStorage` for Recent Scans
* **Deployment:** Compatible with Vercel and other Node.js hosting platforms

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js 18 or later
* npm
* Git

### Installation

Clone the repository:

```bash
git clone <YOUR_REPOSITORY_URL>
```

Navigate to the project directory:

```bash
cd freedom-intelligence-v1
```

Install dependencies:

```bash
npm install
```

### Run the Development Server

Start the development server:

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

The application will automatically update when you edit the source files.

## Available Scripts

### Development

```bash
npm run dev
```

Starts the local development server.

### Production Build

```bash
npm run build
```

Creates an optimized production build and checks the project for build errors.

### Production Server

```bash
npm run start
```

Starts the application in production mode after a successful build.

### Linting

```bash
npm run lint
```

Runs the configured linting checks.

## How to Use

1. Open Freedom Intelligence.

2. Enter a website URL, such as:

   ```text
   https://example.com
   ```

3. Click **Analyze Website**.

4. Review the Website IQ and Website Health scores.

5. Explore the dashboard metrics and score charts.

6. Use Report Navigation to jump to individual analysis sections.

7. Review prioritized recommendations.

8. Export the report using **Export PDF Report**.

9. Revisit previously analyzed websites through **Recent Scans**.

## Analysis Modules

### Basic SEO

Checks important SEO foundation signals, including:

* Page title
* Meta description
* H1 heading
* Canonical URL

### Technical SEO

Checks technical website signals, including:

* `robots.txt`
* XML sitemap
* Canonical URL
* Image `alt` coverage

### Social Intelligence

Checks social sharing metadata, including:

* Open Graph title
* Open Graph description
* Open Graph image
* Twitter title
* Twitter description
* Twitter image

### Security Intelligence

Checks whether the analyzed website uses HTTPS.

### Images Intelligence

Analyzes image usage and identifies images that may be missing alternative text.

### Link Intelligence

Analyzes links and categorizes them into:

* Internal links
* External links
* Email links
* Telephone links
* Other or invalid links

### Accessibility Intelligence

Checks selected accessibility signals, including:

* HTML language attribute
* Viewport metadata
* Form-field labels
* Heading structure
* H1 usage

### Performance Intelligence

Measures server response time using multiple requests and calculates a performance score based on the observed response time.

> Performance results are a server-response-time proxy. They are not a replacement for Lighthouse, Core Web Vitals, or real-user monitoring.

### Recommendations

Generates prioritized improvement suggestions using:

* High priority
* Medium priority
* Low priority

### AI Website Consultant

Provides:

* Executive summary
* Identified strengths
* Recommended priorities
* High-impact improvement guidance

## Project Structure

```text
freedom-intelligence-v1/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── dashboard/
│   │   ├── charts/
│   │   ├── Dashboard.tsx
│   │   ├── DashboardHeader.tsx
│   │   ├── DashboardMetrics.tsx
│   │   ├── StatsBar.tsx
│   │   └── WebsiteIQCard.tsx
│   │
│   ├── report/
│   │   ├── AccessibilitySection.tsx
│   │   ├── AIConsultantSection.tsx
│   │   ├── BasicSeoSection.tsx
│   │   ├── ImageSection.tsx
│   │   ├── LinkSection.tsx
│   │   ├── PerformanceSection.tsx
│   │   ├── RecommendationsSection.tsx
│   │   ├── SecuritySection.tsx
│   │   ├── SocialSection.tsx
│   │   └── TechnicalSeoSection.tsx
│   │
│   ├── AnalysisReport.tsx
│   ├── AnalyzeButton.tsx
│   ├── Hero.tsx
│   ├── ReportCard.tsx
│   ├── SectionHeading.tsx
│   └── UrlInput.tsx
│
├── lib/
│   └── scanner/
│       ├── accessibility.ts
│       ├── aiConsultant.ts
│       ├── basicSeo.ts
│       ├── health.ts
│       ├── images.ts
│       ├── links.ts
│       ├── openGraph.ts
│       ├── performance.ts
│       ├── recommendations.ts
│       ├── robots.ts
│       ├── scanner.ts
│       ├── score.ts
│       ├── security.ts
│       ├── sitemap.ts
│       ├── technical.ts
│       ├── twitterCards.ts
│       └── websiteIQ.ts
│
├── types/
│   └── analysis.ts
│
├── public/
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

## Scoring Overview

Freedom Intelligence calculates an overall Website IQ using weighted scores from several analysis areas:

| Category         | Weight |
| ---------------- | -----: |
| SEO              |    30% |
| Accessibility    |    20% |
| Performance      |    20% |
| Security         |    15% |
| Technical Health |    15% |

The final Website IQ score is calculated on a scale of **0 to 100**.

## Production Build

Before deployment, run:

```bash
npm run build
```

If the build succeeds, start the production server locally:

```bash
npm run start
```

Then open:

```text
http://localhost:3000
```

## Deployment

Freedom Intelligence can be deployed to a Next.js-compatible hosting provider such as Vercel.

General deployment steps:

1. Push the project to GitHub.
2. Open your hosting provider.
3. Import the GitHub repository.
4. Configure the project as a Next.js application.
5. Install dependencies.
6. Run the production build.
7. Deploy the application.
8. Test the deployed website-analysis endpoint and report interface.

## Important Considerations

* Website analysis depends on the target website being reachable.
* Some websites may block automated requests.
* Results can vary depending on server response time and website configuration.
* The scanner analyzes accessible HTML and selected website signals.
* Performance scoring is not a full browser-based performance audit.
* Recent Scans are stored locally in the user's browser.
* PDF export uses the browser's print functionality.

## Future Improvements

Potential future enhancements include:

* Lighthouse and Core Web Vitals integration
* Scheduled website monitoring
* Historical score tracking
* User accounts and cloud scan history
* Competitor comparison
* Advanced backlink analysis
* Broken-link verification
* Sitemap URL analysis
* Mobile-specific audits
* AI-generated improvement plans
* Email reports
* Team workspaces
* White-label reports

## License

Add your preferred license here before publishing the project publicly.

## Author

Suresh C. N.

Freedom Intelligence — Website Intelligence Platform
