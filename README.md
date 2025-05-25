# Next Blog Post

A simple blog platform built with Next.js, React, and TypeScript.

## Features

- User authentication (login via username)
- View, create, edit, and delete blog posts
- Comment on posts
- Protected routes (e.g., `/our-blog` requires login)
- Responsive UI with Tailwind CSS and shadcn/ui components
- Middleware for route protection and redirection

## Project Structure

```
frontend/
  next-blog-post/
    src/
      api/           # API calls (login, post, etc.)
      components/    # React components (PostBlock, CommentButton, etc.)
      hooks/         # Custom hooks (useAuth)
      pages/         # Next.js pages
      middleware.ts  # Route protection and redirects
      ...
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set environment variables:**
   - Create a `.env.local` file and add:
     ```
     NEXT_PUBLIC_API_URL=http://your-api-url (http://localhost:4444)
     ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Visit [http://localhost:3000](http://localhost:3000)

## Usage

- **Sign in:** Enter a username to log in.
- **View posts:** Browse posts on the home page.
- **Create/Edit/Delete posts:** Available for authenticated users.
- **Comment:** Add comments to posts if logged in.
- **Protected routes:** `/our-blog` requires login; unauthenticated users are redirected to `/signin`.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## 🙋‍♂️ Author
Developed by Wiwatsapon - for testing interview DataWoW