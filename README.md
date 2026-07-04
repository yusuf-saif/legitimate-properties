# Legitimate Properties

Premium real estate website for Legitimate Properties (Nigeria).

Built with Next.js 14, Prisma + PostgreSQL, Tailwind CSS, and Framer Motion.

## Image Uploads

All uploaded images (property gallery, news featured images, team photos) are stored on **Cloudinary**. On Render, the local filesystem is not persistent — files written to `public/uploads/` would be lost on every redeploy. Cloudinary ensures images persist across deployments.

To configure Cloudinary, set these environment variables (see `.env.example`):

```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in DATABASE_URL and Cloudinary vars
npm run dev
```
