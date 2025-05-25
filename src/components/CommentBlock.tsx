import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getDiffrenceTime } from '@/utils/getDiffrenceTime';

interface Props {
  comment: CommentBlog;
}

const CommentBlock = ({ comment }: Props) => {
  return (
    <div className='flex flex-col border-b w-full h-fit pb-6'>
      <div className='flex flex-row gap-2 items-center'>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='flex gap-2'>
          <div className='text-sm font-medium text-gray-800'>
            {comment.user.username}
          </div>
          <div className='text-sm font-medium text-gray-400'>
            {getDiffrenceTime(new Date(comment.createdAt))}
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <div
          className="overflow-hidden text-sm text-gray-700"
        >
          {comment.content}
        </div>
      </div>
    </div>
  )
}

export default CommentBlock