This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Optional NSFW passages

The site reads only `content/Kiro's story.docx`. In that document, put each marker in its own ordinary Word paragraph (press Enter, not Shift+Enter):

```text
[[nsfw]]
Your adult passage goes here. Keep your usual paragraphs and dialogue markers.
[[/nsfw]]
```

Everything between the markers appears behind the existing 18+ warning with Show, Skip, and Hide controls. Text after the closing marker stays visible. You can use multiple pairs in any chapter; pairs must stay within a chapter and cannot be nested. Missing or incorrectly placed markers produce an explanatory build error. Chapters without markers display normally.

Save the document, then rebuild/restart the site to publish document changes. The markers themselves are not displayed. The same prose formatting and dialogue labels apply inside and outside the optional sections. Run `node tests/mature-section.cjs` to check parsing and the default warning state.
