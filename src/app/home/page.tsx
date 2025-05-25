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


function HomePage() {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [search, setSearch] = React.useState<string>("");

  const searchDebounce = useDebounce(search, 1000);

  const [selectedCategory, setSelectedCategory] = React.useState<string>("");

  const { user } = useAuth();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPosts(selectedCategory || '', searchDebounce);
        setPosts(response);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      }
    };
    fetchData();
  }, [selectedCategory, searchDebounce]);

  return (
    <div className='flex flex-col bg-gray-100 px-2 md:px-32'>
      <div className='flex flex-row justify-between items-center pb-4'>
        <div className="relative h-10 w-auto flex flex-row items-center">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 " size={20} />
          <Input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="pl-10 pr-3 py-2 text-md text-black w-full border border-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6E23DD] focus:border-transparent text-sm md:text-base"
          />
        </div>
        <SelectCategory onSelect={(value) => setSelectedCategory(value)} />
        <CreatePostButton userId={user?.id} />
      </div>
      <div className='flex flex-col items-center rounded-xl bg-white'>
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

export default HomePage

