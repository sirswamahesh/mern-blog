import { Button } from "flowbite-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <motion.div
      className="relative flex flex-col sm:flex-row p-5 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center bg-gradient-to-r mx-5 from-purple-600 to-blue-500 text-white shadow-2xl overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/1600x900/?technology,coding')",
        }}
      ></div>

      <motion.div
        className="flex-1 flex flex-col items-center  sm:items-start z-10"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-4xl font-extrabold drop-shadow-lg">
          Elevate Your JavaScript Skills
        </h2>
        <p className="text-gray-200 my-3 text-lg drop-shadow-md">
          Dive into modern web development and master JavaScript today.
        </p>
        <Button
          gradientDuoTone="cyanToBlue"
          className="rounded-tl-xl rounded-bl-none mt-2 mx-auto shadow-lg"
        >
          <Link
            to="/projects"
            rel="noopener noreferrer"
            className="font-semibold"
          >
            Get Started
          </Link>
        </Button>
      </motion.div>
      <motion.div
        className="p-7 flex-1 z-10"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <img
          src="https://media.istockphoto.com/id/1284271878/photo/javascript-inscription-against-laptop-and-code-background-learn-javascript-programming.jpg?s=612x612&w=0&k=20&c=H9FI5X3ZBQIyEijvhJc-jv5McwCh-BxqQPxee9Aoa08="
          alt="JavaScript Illustration"
          className="rounded-lg shadow-xl border border-white"
        />
      </motion.div>
    </motion.div>
  );
}
