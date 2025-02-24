import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
      className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-6'
    >
      <motion.div 
        initial={{ y: 30, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='max-w-3xl mx-auto p-8 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700'
      >
        <h1 className='text-4xl font-bold text-center my-7 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
          About Hunting Blog
        </h1>
        <div className='text-lg text-gray-700 dark:text-gray-300 flex flex-col gap-6 leading-relaxed'>
          <p>
            Welcome to <strong className='text-blue-600 dark:text-blue-400'>Hunting Blog</strong>! This blog was founded by 
            <strong className='text-purple-600 dark:text-purple-400'> Mahesh Sirswa</strong>, a passionate developer who enjoys 
            sharing insights, tutorials, and experiences related to programming, web development, and emerging technologies.
          </p>

          <p>
            Our mission is to provide <span className='font-semibold text-blue-500 dark:text-blue-400'>high-quality, practical, and engaging</span> content 
            for developers of all levels. Whether you’re a beginner starting with coding or an experienced programmer exploring new technologies, 
            you’ll find valuable resources here.
          </p>

          <h2 className='text-2xl font-semibold mt-5 text-blue-600 dark:text-blue-400'>What We Cover</h2>
          <ul className='list-disc pl-6 text-md space-y-2'>
            <motion.li whileHover={{ scale: 1.05, color: '#3b82f6' }} className='transition-all duration-300'>In-depth tutorials on web development (HTML, CSS, JavaScript, React, etc.)</motion.li>
            <motion.li whileHover={{ scale: 1.05, color: '#3b82f6' }} className='transition-all duration-300'>Insights into best coding practices and software engineering</motion.li>
            <motion.li whileHover={{ scale: 1.05, color: '#3b82f6' }} className='transition-all duration-300'>Career advice for developers and aspiring tech professionals</motion.li>
            <motion.li whileHover={{ scale: 1.05, color: '#3b82f6' }} className='transition-all duration-300'>Latest trends and updates in the tech world</motion.li>
            <motion.li whileHover={{ scale: 1.05, color: '#3b82f6' }} className='transition-all duration-300'>Personal experiences and project showcases</motion.li>
          </ul>

          <h2 className='text-2xl font-semibold mt-5 text-blue-600 dark:text-blue-400'>Join Our Community</h2>
          <p>
            Learning is more effective when we do it together! Engage in discussions, leave comments, and share your thoughts. 
            Connect with other readers by liking and replying to comments.
          </p>

          <p>
            Stay connected and never miss an update by following us on social media and subscribing to our newsletter!
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
