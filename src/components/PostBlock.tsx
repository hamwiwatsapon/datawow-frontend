"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from '@/hooks/useAuth';
import EditPostBlock from './EditPostBlock';
import Link from 'next/link';
import AlertDelete from './AlertDelete';

interface Props {
  post: Post;
}

const PostBlock = ({ post }: Props) => {
  const { user } = useAuth();
  return (
    <Link href={`/post/${post.id}`} key={post.id} className='w-full'>
      <div className='flex flex-col border-b w-full h-fit p-5 hover:shadow-md transition-all duration-200'>
        <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-row gap-2 items-center'>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <div className='text-sm font-medium text-gray-500'>
                {post.user.username}
              </div>
            </div>
          </div>
          {
            user && user.id === post.user.id &&
            <div
              className='flex flex-row place-items-center gap-2'
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <EditPostBlock post={post} userId={user.id} />
              <AlertDelete post={post} />
            </div>
          }
        </div>
        <div className='pl-4 text-sm text-gray-500 m-2'>
          {post.category.name.charAt(0).toUpperCase() + post.category.name.slice(1)}
        </div>
        <div className='flex flex-col'>
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
      </div>
    </Link>

  )
}

export default PostBlock