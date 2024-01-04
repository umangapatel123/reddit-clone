import React from 'react'
import Post from '../Post/Post'

function PostPage() {
  return (
    <>
        <Post imageUrl="https://images.unsplash.com/photo-1683009427513-28e163402d16?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" title="Post 1" author="Author 1" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas." />
        <Post imageUrl="https://images.unsplash.com/photo-1702031617375-f71096eb385d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8" title="Post 2" author="Author 2" content="Lorem" />
    </>
  )
}

export default PostPage