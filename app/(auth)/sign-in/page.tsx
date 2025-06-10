import { RedirectToSignIn, SignIn } from "@clerk/nextjs";

const SignInPage =()=>{

     return (
        <RedirectToSignIn redirectUrl={'/dashboard'}/>
     )
}

export default SignInPage;