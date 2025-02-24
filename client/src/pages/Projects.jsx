import React, { useEffect, useState } from 'react';
import CallToAction from '../components/CallToAction';
import { motion } from 'framer-motion';
import PostCard from '../components/PostCard';

const Projects = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 p-6 sm:p-10'
    >
      <motion.section 
        className='max-w-5xl mx-auto text-center flex flex-col items-center justify-center min-h-[60vh] px-4 sm:px-6'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h1 
          className='text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent h-16' 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: -0 }} 
          transition={{ delay: 0.2 }}
        >
          Explore Coding Projects
        </motion.h1>
        <motion.p 
          className='text-md sm:text-lg text-gray-600 dark:text-gray-300 mt-2 mb-3 max-w-3xl' 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.4 }}
        >
          Build fun and engaging projects while mastering HTML, CSS, JavaScript, and more!
        </motion.p>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
          <CallToAction />
        </motion.div>
      </motion.section>

      <motion.div 
        className='max-w-8xl mx-auto p-3 flex flex-col gap-8 py-7'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {posts && posts.length > 0 && (
          <motion.div className='flex flex-col gap-6'>
            <motion.h2 className='text-2xl font-semibold text-center'
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Recent Posts
            </motion.h2>
            <div className='flex flex-wrap justify-center gap-4'>
              {posts.map((post, index) => (
                <motion.div 
                  key={post._id} 
                  whileHover={{ scale: 1.05 }} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Projects;