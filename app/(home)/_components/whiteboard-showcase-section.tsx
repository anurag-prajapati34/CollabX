import { motion } from "framer-motion";
import { Play, Users, MousePointer, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

import { redirect } from "next/navigation";
export default function WhiteboardShowcaseSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Live Collaboration in Action
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              See the magic of{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                real-time
              </span>
              <br />
              collaboration
            </h2>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Watch ideas come to life as multiple team members work together seamlessly. 
              Every stroke, every note, every change happens instantly across all devices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
              onClick={()=>(redirect('https://www.youtube.com/watch?v=LM8lq6xjyJw&t=2s'))}
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer "
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
              <Button 
              onClick={()=>{redirect('/sign-up')}}
                size="lg" 
                variant="outline" 
                className="border-2 border-slate-300 text-slate-700  cursor-pointer hover:border-slate-400 hover:bg-slate-50"
              >
                Try Now
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-slate-900">50ms</div>
                <div className="text-sm text-slate-600">Sync Speed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">99.9%</div>
                <div className="text-sm text-slate-600">Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">24/7</div>
                <div className="text-sm text-slate-600">Real-time</div>
              </div>
            </div>
          </motion.div>
          
          {/* Right - Whiteboard Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Whiteboard Container */}
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 relative overflow-hidden">
              {/* Browser Bar */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="text-xs text-slate-500 bg-slate-50 px-3 py-1 rounded-full">
                  collabx.app/whiteboard
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-500">4 online</span>
                </div>
              </div>
              
              {/* Whiteboard Content */}
              <div className="space-y-6">
                {/* Title and Sticky Notes */}
                <div className="text-center mb-8">
                  <motion.h3
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-2xl font-bold text-slate-800 mb-4"
                  >
                    Product Brainstorm Session
                  </motion.h3>
                </div>
                
                {/* Animated Elements */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Sticky Note 1 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, rotate: -5 }}
                    whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, rotate: 0 }}
                    className="bg-yellow-200 p-4 rounded-lg shadow-sm transform -rotate-3 cursor-pointer"
                  >
                    <div className="text-sm font-medium text-slate-800">User Research</div>
                    <div className="text-xs text-slate-600 mt-1">Survey insights</div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-red-400 rounded-full"></div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 bg-green-400 rounded-full"
                      />
                    </div>
                  </motion.div>
                  
                  {/* Sticky Note 2 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, rotate: 5 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 2 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, rotate: 0 }}
                    className="bg-blue-200 p-4 rounded-lg shadow-sm transform rotate-2 cursor-pointer"
                  >
                    <div className="text-sm font-medium text-slate-800">Feature Ideas</div>
                    <div className="text-xs text-slate-600 mt-1">New concepts</div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        className="w-2 h-2 bg-orange-400 rounded-full"
                      />
                    </div>
                  </motion.div>
                  
                  {/* Sticky Note 3 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, rotate: -3 }}
                    whileInView={{ opacity: 1, y: 0, rotate: -1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, rotate: 0 }}
                    className="bg-green-200 p-4 rounded-lg shadow-sm transform -rotate-1 cursor-pointer"
                  >
                    <div className="text-sm font-medium text-slate-800">Implementation</div>
                    <div className="text-xs text-slate-600 mt-1">Timeline</div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-teal-400 rounded-full"></div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        className="w-2 h-2 bg-blue-400 rounded-full"
                      />
                    </div>
                  </motion.div>
                  
                  {/* Sticky Note 4 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, rotate: 4 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 3 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, rotate: 0 }}
                    className="bg-purple-200 p-4 rounded-lg shadow-sm transform rotate-3 cursor-pointer"
                  >
                    <div className="text-sm font-medium text-slate-800">Design System</div>
                    <div className="text-xs text-slate-600 mt-1">Components</div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                        className="w-2 h-2 bg-purple-400 rounded-full"
                      />
                    </div>
                  </motion.div>
                </div>
                
                {/* Connecting Lines */}
                <motion.div
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1.3 }}
                  viewport={{ once: true }}
                  className="relative h-16"
                >
                  <svg className="absolute inset-0 w-full h-full">
                    <motion.path
                      d="M 50 10 Q 150 30 250 10"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 1.3 }}
                      viewport={{ once: true }}
                    />
                  </svg>
                </motion.div>
                
                {/* Live Collaboration Indicators */}
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-full border-2 border-white flex items-center justify-center"
                    >
                      <MousePointer className="w-3 h-3 text-white" />
                    </motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full border-2 border-white flex items-center justify-center"
                    >
                      <MousePointer className="w-3 h-3 text-white" />
                    </motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      className="w-8 h-8 bg-gradient-to-r from-green-400 to-teal-400 rounded-full border-2 border-white flex items-center justify-center"
                    >
                      <MousePointer className="w-3 h-3 text-white" />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full"
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    Live editing
                  </motion.div>
                </div>
              </div>
            </div>
            
            {/* Floating Action Indicators */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-blue-500 text-white p-3 rounded-xl shadow-lg"
            >
              <Users className="w-5 h-5" />
            </motion.div>
            
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute -bottom-4 -left-4 bg-purple-500 text-white p-3 rounded-xl shadow-lg"
            >
              <Zap className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}