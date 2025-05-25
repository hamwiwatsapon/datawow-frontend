const fetchPosts = async (categoryId?: string, search?: string, userId?: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/posts?categoryId=${categoryId ?? ''}&search=${search ?? ''}&userId=${userId ?? ''}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Try to extract error message from response
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message ?? 'Load posts failed');
    }

    const data: Post[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }

}

const fetchPostByID = async (id: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Try to extract error message from response
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message ?? 'Load post failed');
    }

    const data: Post = await response.json();
    return data;
  } catch (error) {
    console.error('Error during fetching post:', error);
    throw error;
  }
}

const createPost = async (title: string, content: string, category: string, userId: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/posts`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, categoryId: Number(category), userId }),
    });

    if (!response.ok) {
      // Try to extract error message from response
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message ?? 'Post creation failed');
    }

    const data: Post = await response.json();
    return data;
  } catch (error) {
    console.error('Error during post creation:', error);
    throw error;
  }
}

const commentPost = async (postId: string, comment: string, userId: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/comments/${postId}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: comment, userId }),
    });

    if (!response.ok) {
      // Try to extract error message from response
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message ?? 'Comment post failed');
    }

    const data: Comment = await response.json();
    return data;
  } catch (error) {
    console.error('Error during commenting post:', error);
    throw error;
  }

}

const editPost = async (postId: string, title: string, content: string, categoryId: string, userId: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, categoryId, userId }),
    });

    if (!response.ok) {
      // Try to extract error message from response
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message ?? 'Edit post failed');
    }

    const data: Post = await response.json();
    return data;
  } catch (error) {
    console.error('Error during editing post:', error);
    throw error;
  }
}

const deletePost = async (postId: string, userId: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      // Try to extract error message from response
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message ?? 'Delete post failed');
    }

    return true; // Return true on successful deletion
  } catch (error) {
    console.error('Error during deleting post:', error);
    throw error;
  }
}

export { fetchPosts, fetchPostByID, commentPost, createPost, editPost, deletePost };