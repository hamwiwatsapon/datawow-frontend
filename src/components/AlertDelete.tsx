import { deletePost } from "@/api/post";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useAuth } from "@/hooks/useAuth";
import { Trash } from "lucide-react";

import React from 'react'

type Props = {
  post: Post
}

const AlertDelete = ({ post }: Props) => {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const onDeletePost = () => {
    deletePost(post.id, user?.id ?? "")
      .then(() => {
        console.log("Post deleted successfully");

      })
      .catch((error) => {
        console.error("Failed to delete post:", error);
        // Handle error (e.g., show an error message)
      })
      .finally(() => {
        setOpen(false);
        window.location.reload();
      });
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Trash size={20} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Please confirm if you wish to
            delete the post</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the post? Once deleted, it cannot be recovered.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDeletePost} className="bg-red-500 w-full">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}

export default AlertDelete