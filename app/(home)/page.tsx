'use client'
import { useUser,} from '@clerk/nextjs'
import React from 'react'
import HeroSection from './_components/hero-section';
import FeaturesSection from './_components/features-section';
import WhiteboardShowcaseSection from './_components/whiteboard-showcase-section';
import HowItWorksSection from './_components/how-it-works-section';

import FooterSection from './_components/footer-section';
import Navigation from './_components/navigation';
import { redirect } from 'next/navigation';

const HomePage = () => {


  const {isSignedIn}=useUser();
  

  if(isSignedIn){
    
    return redirect('/dashboard');
  }

  return (
  <>
  <Navigation/>
  <HeroSection/>
  <FeaturesSection/>
  <WhiteboardShowcaseSection/>
  <HowItWorksSection/>
  <FooterSection/>
  </>
  )
}

export default HomePage;