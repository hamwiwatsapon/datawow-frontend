"use client";
import SelectCategory from '@/components/SelectCategory'
import PostBlock from '@/components/PostBlock'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'
import { fetchPosts } from '@/api/post'
import CreatePostButton from '@/components/CreatePostButton'
import { useAuth } from '@/hooks/useAuth'
import useDebounce from '@/hooks/useDebounce';


function OurBlogPage() {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [search, setSearch] = React.useState<string>("");
  const searchDebounce = useDebounce(search, 1000);

  const [selectedCategory, setSelectedCategory] = React.useState<string>("");

  const { user } = useAuth();

  const fetchData = async () => {
    try {
      const response = await fetchPosts(selectedCategory || '', searchDebounce, user?.id);
      setPosts(response);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [selectedCategory, searchDebounce]);

  return (
    <div className='flex flex-col bg-gray-100 h-full w-full px-10 md:px-32'>
      <div className='flex flex-row gap-5 items-center pb-4'>
        <div className="relative h-10 w-full flex flex-row items-center">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10" />
          <Input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="pl-10 pr-3 py-2 text-md text-black w-full border border-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6E23DD] focus:border-transparent"
          />
        </div>
        <SelectCategory onSelect={(value) => setSelectedCategory(value)} />
        <CreatePostButton userId={user?.id} refetch={fetchData} />
      </div>
      <div className='flex flex-col items-center rounded-xl h-full bg-white w-full'>
        {
          posts && posts.length > 0 ? (
            posts.map((post: Post) => (
              <PostBlock post={post} key={post.id} />
            ))
          ) : (
            <div className='flex items-center justify-center h-full w-full'>
              <p className='text-gray-500'>No posts available</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default OurBlogPage

