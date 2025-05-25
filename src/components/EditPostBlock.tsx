"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import React, { useState } from 'react'
import { Button } from "./ui/button"
import SelectCategory from "./SelectCategory"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { editPost } from "@/api/post";
import { Edit } from "lucide-react";


const EditPostBlock = ({ userId, post }: { userId?: string, post: Post }) => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(String(post.category.id));
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const onEdit = () => {
    if (!userId) {
      console.error("User ID is required to create a post");
      return;
    }
    if (!category || !title || !content) {
      console.error("All fields are required to create a post");
      return;
    }

    editPost(post.id, title, content, category, userId)
      .then(() => {
        setOpen(false);
      })
      .catch((error) => {
        console.error("Failed to create post:", error);
      })
      .finally(() => {
        window.location.reload();
      })
  }

  const onCancel = () => {
    setOpen(false);
    setCategory(post.category.id.toString());
    setTitle(post.title);
    setContent(post.content);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)} disabled={!userId}><Edit size={20} /></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Post</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-4">
          <SelectCategory style="bg-transparent border-success border text-success hover:border-2 focus:border-2 w-auto max-w-[200px]"
            defaultValue={category}
            onSelect={(value) => setCategory(value)}
          />
          <Input className="border border-gray-300 rounded-md" placeholder="Title" onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <Textarea className='w-full min-h-[120px] max-h-[400px] p-2 border-2 rounded-md resize-none h-["auto"]' placeholder="What's on your mind..."
            value={content}
            onChange={(e) => setContent(e.target.value)} />
        </DialogDescription>
        <div className='flex gap-2 justify-end'>
          <div className="flex gap-2">
            <Button
              className='border-success h-10 text-success md:min-w-[105px] w-full'
              variant={"outline"}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              className='bg-success h-10 md:min-w-[105px] w-full'
              onClick={onEdit}
              disabled={!category || !title || !content}
              title={!category || !title || !content ? "Please fill all fields" : ""}
            >
              Update
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

  )
}

export default EditPostBlock