import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import CallToAction from '../components/CallToAction';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 overflow-y-auto'
    >
      {/* Hero Section */}
      <section className='relative flex flex-col items-center justify-center text-center py-32 px-6 max-w-6xl mx-auto min-h-screen'>
        <motion.h1 
          className='text-6xl font-extrabold lg:text-8xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent' 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
        >
          Level Up Your Coding Skills
        </motion.h1>
        <motion.p 
          className='text-gray-600 dark:text-gray-300 text-lg sm:text-xl max-w-3xl mt-6' 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.4 }}
        >
          Learn programming, web development, and software engineering with hands-on projects, industry insights, and real-world projects.
        </motion.p>
        <motion.div whileHover={{ scale: 1.1 }} className='mt-8'>
          <Link 
            to='/projects' 
            className='px-10 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg rounded-full shadow-lg hover:opacity-90 transition duration-300'
          >
            Explore Projects
          </Link>
        </motion.div>
      </section>

      {/* Featured Tutorials with Hover Animation */}
      <section className='max-w-7xl mx-auto py-20 px-6 text-center grid grid-cols-1 md:grid-cols-3 gap-10 '>
        {[
          { title: 'JavaScript Mastery', desc: 'Deep dive into JavaScript fundamentals, ES6+, and advanced concepts.', extra: 'Includes DOM manipulation, closures, and async programming.', color: 'from-yellow-400 to-orange-500' },
          { title: 'React for Beginners', desc: 'Learn React.js step by step with practical projects and hooks.', extra: 'Covers JSX, components, state management, and APIs.', color: 'from-blue-400 to-purple-500' },
          { title: 'Backend Development', desc: 'Master Node.js, Express, and databases to build robust applications.', extra: 'Learn authentication, REST APIs, and database handling.', color: 'from-green-400 to-teal-500' }
        ].map((item, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className={`p-8 bg-gradient-to-r ${item.color} text-white shadow-xl rounded-xl relative overflow-hidden group cursor-pointer`}
          >
            <h3 className='text-2xl font-semibold'>{item.title}</h3>
            <p className='mt-4 transition-opacity duration-300'>{item.desc}</p>
            <p className='mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-gray-100'>
              {item.extra}
            </p>
          </motion.div>
        ))}
      </section>

        <CallToAction />
      {/* Blog Highlights with Hover Animation */}
      <section className='min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-purple-100 to-blue-200 dark:from-gray-800 dark:to-gray-900 py-20'>
        <h2 className='text-4xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>Latest Coding Articles</h2>
        <p className='text-gray-700 dark:text-gray-300 mt-4 max-w-2xl text-lg'>
          Stay updated with the latest trends, coding challenges, and best practices in software development.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
          {[
            { title: 'Modern JavaScript Tricks', desc: 'Learn about the latest advancements in coding.', extra: 'Discover ES2023 features, async patterns, and performance tips.' },
            { title: 'Best React Libraries', desc: 'Enhance your React apps with these must-have libraries.', extra: 'Explore Zustand, TanStack Query, and Framer Motion.' },
            { title: 'Building Scalable APIs', desc: 'Design and build high-performance REST & GraphQL APIs.', extra: 'Learn rate limiting, caching, and microservices architecture.' }
          ].map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className='p-6 bg-gradient-to-r from-blue-400 to-indigo-500 text-white shadow-lg rounded-lg relative overflow-hidden group cursor-pointer'
            >
              <h3 className='text-xl font-semibold'>{item.title}</h3>
              <p className='mt-2 transition-opacity duration-300'>{item.desc}</p>
              <p className='mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-gray-200'>
                {item.extra}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
