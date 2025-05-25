# Next Blog Post

A simple blog platform built with Next.js, React, and TypeScript.

## Features

- User authentication (login via username, stored in cookies)
- View, create, edit, and delete blog posts
- Comment on posts with auto-expanding textarea
- Protected routes (e.g., `/our-blog` requires login, handled by Next.js middleware)
- Responsive UI with Tailwind CSS and [shadcn/ui](https://ui.shadcn.com/) components
- Middleware for route protection and redirection
- Alert dialogs for confirming post deletion
- Loading indicator at the top of the page during async actions
- Error handling and user feedback for login and post actions

## Project Structure

```
frontend/
  next-blog-post/
    src/
      api/           # API calls (login, post, etc.)
      components/    # React components (PostBlock, CommentButton, EditPostBlock, AlertDelete, etc.)
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
     NEXT_PUBLIC_API_URL=http://localhost:4444
     ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Visit [http://localhost:3000](http://localhost:3000)

## Usage

- **Sign in:** Enter a username to log in. User data is stored in cookies for authentication.
- **View posts:** Browse posts on the home page.
- **Create/Edit/Delete posts:** Available for authenticated users. Only the post owner can edit or delete their posts.
- **Comment:** Add comments to posts if logged in. The comment textarea auto-expands as you type.
- **Protected routes:** `/our-blog` requires login; unauthenticated users are redirected to `/signin` with an alert.
- **Delete confirmation:** Deleting a post prompts a confirmation dialog.
- **Loading indicator:** A loading bar appears at the top of the page during async actions (e.g., login, post, comment).

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## 🙋‍♂️ Author
Developed by Wiwatsapon - for testing interview DataWoW

# ขอ Feedback ด้วยนะครับถ้าเป็นไปได้
