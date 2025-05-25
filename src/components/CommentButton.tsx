"use client";
import React from 'react'
import { Button } from './ui/button'
import { Textarea } from "@/components/ui/textarea"
import { commentPost } from '@/api/post';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const CommentButton = ({ postId }: { postId: string }) => {
  const router = useRouter();
  const { user } = useAuth(); // Assuming you have a UserContext to get the current user
  const [isCommenting, setIsCommenting] = React.useState(false);
  const [comment, setComment] = React.useState('');

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const onCancel = () => {
    setIsCommenting(false);
    setComment('');
  }

  const onPost = async () => {
    if (user) {
      commentPost(postId, comment, user.id)
        .then(() => {
          setIsCommenting(false);
          setComment('');
          router.refresh(); // Refresh the page to show the new comment
        })
        .catch((error) => {
          console.error("Failed to post comment:", error);
          // Handle error (e.g., show an error message)
        });
    }
  }

  return (
    <div className='my-4 flex'>
      {
        user && (
          isCommenting ? (
            <div className='flex flex-col w-full gap-2'>
              <Textarea
                className='w-full min-h-[120px] max-h-[400px] p-2 border-2 rounded-md resize-none h-["auto"]'
                placeholder="What’s on your mind..."
                autoFocus
                rows={5}
                value={comment}
                onChange={handleCommentChange}
                style={{ overflow: "hidden" }}
              />
              <div className='self-end flex flex-row gap-2'>
                <Button
                  className='border-success h-10 text-success md:min-w-[105px] w-full'
                  variant={"outline"}
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <Button
                  className='bg-success  md:min-w-[105px] w-full'
                  onClick={onPost}
                >
                  Post
                </Button>
              </div>
            </div>

          ) : (
            <Button className='border-success h-10 text-success w-fit'
              variant={'outline'}
              onClick={() => setIsCommenting(true)}
            >
              Add Comments
            </Button>
          )
        )
      }
    </div>
  )
}

export default CommentButton