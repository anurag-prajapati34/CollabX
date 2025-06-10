import { RedirectToSignIn, SignIn } from "@clerk/nextjs";

const SignInPage =()=>{

     return <div className="min-h-[100vh] w-full flex items-center justify-center p-6">
           <SignIn  signUpUrl="sign-up" forceRedirectUrl={'/dashboard'} />
       </div>;
}

export default SignInPage;