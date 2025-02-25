import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
import { motion } from "framer-motion";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        setPost(data.posts[0]);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          const filteredPosts = data.posts.filter(
            (recent) => recent._id !== post?._id
          );
          setRecentPosts(filteredPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentPosts();
  }, [post]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="p-3 flex flex-col items-center max-w-6xl mx-auto min-h-screen"
    >
      <motion.h1
        className="text-2xl sm:text-3xl lg:text-4xl mt-5 sm:mt-10 p-3 text-center font-serif max-w-2xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {post?.title}
      </motion.h1>
      <Link
        to={`/search?category=${post?.category}`}
        className="self-center mt-3 sm:mt-5"
      >
        <Button color="gray" pill size="xs">
          {post?.category}
        </Button>
      </Link>
      <motion.img
        src={post?.image}
        alt={post?.title}
        className="mt-5 sm:mt-10 p-3 max-h-[400px] sm:max-h-[600px] w-full max-w-4xl object-cover rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-4xl mb-1 text-xs sm:text-sm">
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <motion.div
        style={{
          overflow: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.2)",
        }}
        className="p-3 sm:p-5 max-w-full sm:max-w-4xl mb-2 mx-auto w-full post-content bg-white dark:bg-gray-800 shadow-md rounded-lg leading-relaxed text-sm sm:text-lg overflow-x-scroll"
        dangerouslySetInnerHTML={{ __html: post?.content }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      ></motion.div>

      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <CommentSection postId={post?._id} />
      <div className="flex flex-col justify-center items-center mb-5">
        <motion.h1
          className="text-lg sm:text-xl mt-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Recent articles
        </motion.h1>
        <motion.div
          className="flex flex-wrap gap-3 sm:gap-5 mt-3 sm:mt-5 justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {recentPosts &&
            recentPosts.map((post, index) => (
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
        </motion.div>
      </div>
    </motion.main>
  );
}
