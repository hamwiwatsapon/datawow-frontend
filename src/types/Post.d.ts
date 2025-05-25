type Post = {
  id: string;
  title: string;
  content: string;
  category: Category;
  user: User;
  comments: CommentBlog[];
  createdAt: string;
}

type Category = {
  id: string;
  name: string;
}

type CommentBlog = {
  id: string;
  postId: string;
  content: string;
  user: User;
  createdAt: string;
}

type User = {
  id: string;
  username: string;
}