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
import { createPost } from "@/api/post";
import { useRouter } from "next/navigation";


const CreatePostButton = ({ userId, refetch }: { userId?: string, refetch: () => void }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onPost = () => {
    if (!userId) {
      console.error("User ID is required to create a post");
      return;
    }
    if (!category || !title || !content) {
      console.error("All fields are required to create a post");
      return;
    }
    createPost(title, content, category, userId)
      .then(() => {
        setCategory("");
        setTitle("");
        setContent("");
        setOpen(false);
      })
      .catch((error) => {
        console.error("Failed to create post:", error);
        // Handle error (e.g., show an error message)
      })
      .finally(() => {
        router.refresh();
        refetch();
      })
  }

  const onCancel = () => {
    setOpen(false);
    setCategory("");
    setTitle("");
    setContent("");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-success hover:bg-success/50 md:py-1.5 md:px-5 rounded-md text-white font-semibold md:text-base text-sm px-2 py-1" onClick={() => setOpen(true)} disabled={!userId}>Create+</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Post</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-4">
          <SelectCategory style="bg-transparent border-success border text-success hover:border-2 focus:border-2 w-auto max-w-[200px]"
            onSelect={(value) => setCategory(value)}
          />
          <Input className="border border-gray-300 rounded-md" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
          <Textarea className='w-full min-h-[120px] max-h-[400px] p-2 border-2 rounded-md resize-none h-["auto"]' placeholder="What's on your mind..."
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
              onClick={onPost}
              disabled={!category || !title || !content}
              title={!category || !title || !content ? "Please fill all fields" : ""}
            >
              Post
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

  )
}

export default CreatePostButton