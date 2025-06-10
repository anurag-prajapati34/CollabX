'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";

import { redirect } from "next/navigation";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8  rounded-lg flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="collabX logo"
                width={32}
                height={32}
              />
            </div>
            <span className="font-bold text-xl text-slate-900">CollabX</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              How it Works
            </button>
          
                <button onClick={()=>{
                  redirect('/sign-in')
                }} className="text-slate-600 hover:text-slate-900 transition-colors text-left cursor-pointer">
                  Sign In
                </button>
            

            <Button onClick={()=>{
              redirect('/sign-up ')
            }

            } className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-slate-900 cursor-pointer "
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6  " />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 bg-white/95 backdrop-blur-md">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("features")}
                className="text-slate-600 hover:text-slate-900 transition-colors text-left cursor-pointer "
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-slate-600 hover:text-slate-900 transition-colors text-left cursor-pointer "
              >
                How it Works
              </button>
              
             
                <button  onClick={()=>{
                  redirect('/sign-in')
                }} className="text-slate-600 hover:text-slate-900 transition-colors text-left cursor-pointer ">
                  Sign In
                </button>
             
              <Button  onClick={()=>{
                  redirect('/sign-up')
                }} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-full cursor-pointer ">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
