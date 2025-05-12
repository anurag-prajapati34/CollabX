"use client";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {  ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
interface ConvexClientProviderProps {
    children: ReactNode;
  }

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);


export const ConvexClientProvider = ({
  children
}: ConvexClientProviderProps) => {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
 
  );
};
