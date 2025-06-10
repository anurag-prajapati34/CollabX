import { RedirectToSignUp, SignUp } from "@clerk/nextjs";

const SignUpPage=()=>{



   return (<RedirectToSignUp redirectUrl={
    '/dashboard'}/>
   )
   

}
export default SignUpPage;