import { RedirectToSignUp, SignUp } from "@clerk/nextjs";

const SignUpPage=()=>{



   return <div className="min-h-[100vh] w-full flex items-center justify-center p-6">
              <SignUp  signInUrl="sign-in" forceRedirectUrl={'/dashboard'} />
          </div>;

}
export default SignUpPage;