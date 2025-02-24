import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicyPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
      className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-6 text-gray-800 dark:text-gray-200'
    >
      <motion.div 
        initial={{ y: 30, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='max-w-3xl w-full p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-2xl rounded-2xl border border-gray-300 dark:border-gray-700'
      >
        <h1 className='text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
          Privacy Policy
        </h1>
        
        <p className='text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal data.
        </p>

        <motion.div 
          whileHover={{ scale: 1.02 }} 
          className='mt-8 p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg'
        >
          <h2 className='text-2xl font-semibold'>Information We Collect</h2>
          <p className='mt-2 text-gray-200'>We collect personal data such as name, email, and usage data for improving our services.</p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }} 
          className='mt-6 p-6 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow-lg'
        >
          <h2 className='text-2xl font-semibold'>How We Use Your Data</h2>
          <p className='mt-2 text-gray-200'>Your data is used for improving user experience, analytics, and providing personalized content.</p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }} 
          className='mt-6 p-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg shadow-lg'
        >
          <h2 className='text-2xl font-semibold'>Your Privacy Rights</h2>
          <p className='mt-2 text-gray-200'>You have the right to request access, correction, or deletion of your data at any time.</p>
        </motion.div>

        <p className='mt-6 text-gray-700 dark:text-gray-300 text-center'>
          If you have any questions, feel free to <span className='text-blue-500 dark:text-blue-400 font-semibold'>contact us</span>.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default PrivacyPolicyPage;
