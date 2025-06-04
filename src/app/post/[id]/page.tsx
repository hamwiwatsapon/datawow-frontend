import { fetchPostByID } from '@/api/post';
import { ArrowLeft } from 'lucide-react';
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getDiffrenceTime } from '@/utils/getDiffrenceTime';
import Link from 'next/link';
import CommentBlock from '@/components/CommentBlock';
import CommentButton from '@/components/CommentButton';

type Params = Promise<{ id: string }>

export async function generateMetadata(props: {
  params: Params
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const params = await props.params
}

const PostPage = async (props: {
  params: Params
}) => {
  const params = await props.params
  const post = await fetchPostByID(params.id); // Assuming fetchPostByID is defined and returns a promise that resolves to a Post object
  return (
    <div className='flex flex-col bg-gray-100 h-full w-full'>
      <div className='flex flex-col items-center h-full bg-white w-full py-6 px-4 md:px-20 gap-10'>
        <Link className='rounded-full p-4 bg-[#D8E9E4] w-fit h-fit self-start' href={'/home'}>
          <ArrowLeft />
        </Link>
        <div className='flex flex-col w-full gap-2'>
          <div className='flex flex-row gap-2 items-center'>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='flex gap-2'>
              <div className='text-sm font-medium text-gray-800'>
                {post.user.username}
              </div>
              <div className='text-sm font-medium text-gray-400'>
                {getDiffrenceTime(new Date(post.createdAt))}
              </div>
            </div>
          </div>
          <div className='text-sm text-gray-500 m-2'>
            {post.category.name.charAt(0).toUpperCase() + post.category.name.slice(1)}
          </div>
          <div className='flex flex-col gap-3'>
            <div className='text-2xl font-semibold text-gray-900'>
              {post.title}
            </div>
            <div
              className="overflow-hidden text-sm text-gray-700"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineClamp: 3,
              }}
            >
              {post.content}
            </div>
            {post.comments.length > 0 && (
              <div className='text-sm text-gray-500 mt-2'>
                {post.comments.length} comments
              </div>
            )}
          </div>
          <CommentButton postId={params.id} />
          <div className='flex flex-col gap-4'>
            {post.comments.map((comment) => (
              <CommentBlock
                key={comment.id}
                comment={comment}
              />
            ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostPage