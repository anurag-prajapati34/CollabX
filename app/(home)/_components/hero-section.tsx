"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const  HeroSection=() =>{
  return (
    <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
            Now live with real-time collaboration
          </motion.div>
          
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6"
          >
            Collaborate in{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Real-Time
            </span>
            <br />
            on Shared Whiteboards
          </motion.h1>
          
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto"
          >
            Bring your team together with CollabX's intuitive whiteboard platform. 
            Brainstorm, plan, and create together from anywhere in the world.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button  onClick={()=>{
                              redirect('/sign-up')
                            }}
                             size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 w-full sm:w-auto cursor-pointer ">
              Start Collaborating Free
            </Button>
            <Button onClick={()=>redirect('https://www.youtube.com/watch?v=LM8lq6xjyJw&t=2s')} size="lg" variant="outline" className="border-2 border-slate-300 text-slate-700 px-8 py-4 text-lg font-semibold hover:border-slate-400 hover:bg-slate-50 transition-all duration-200 w-full sm:w-auto cursor-pointer ">
              Watch Demo
            </Button>
          </motion.div>
          
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative"
          >
            {/* Modern dashboard mockup with subtle gradient overlay */}
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl"></div>
              <div className="relative">
                {/* Whiteboard Interface Mockup */}
                <div className="bg-slate-50 rounded-xl p-6 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-xs text-slate-500">CollabX Whiteboard</div>
                  </div>
                  <div  style={{backgroundImage: "url('/images/whiteboard4.png')", backgroundSize: 'cover', height:'600px' }} className="rounded-lg bg-cover bg-center h-full"></div>
                 

                  <div className="flex justify-between items-center">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-full border-2 border-white"></div>
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full border-2 border-white"></div>
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-teal-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="text-xs text-slate-500">3 users online</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20"
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-400 rounded-2xl opacity-20"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;