# Photo Appendix Generator

A browser-based tool for arranging field photographs, editing captions, preserving available EXIF/GPS information, and exporting a formatted photo appendix.

All photo processing occurs in the browser. Photos and generated appendices are not uploaded to the application server.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The app is configured for deployment as a Cloudflare Worker with static assets. Cloudflare Workers Builds can connect to this GitHub repository, build with `npm run build`, and deploy with `npx wrangler deploy`.
