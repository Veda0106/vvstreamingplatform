// "use client"
// import { Button } from "@/components/ui/button"
// import {ClapperboardIcon, User, UserCircleIcon} from "lucide-react"
// import {UserButton,SignInButton,SignedIn,SignedOut} from "@clerk/nextjs"
// import Link from "next/link"
// export const AuthButton=()=>{
//     //   TODO:add different auth states
    
//     return(
//         <> 
//         <SignedIn>
//             <UserButton>

//             <UserButton.MenuItems>
//                   {/* TODO:Add User profile menu button */}
//                 <UserButton.Link label="Studio" href="/studio" labelIcon={<ClapperboardIcon className="size-4"/>}/>  
                
//                 <UserButton.Action label="manageAccount"/>
//             </UserButton.MenuItems>
//             {/* </UserButton>
//             <UserButton>
//          <UserButton.MenuItems>
//             <UserButton.Link label="Studio" href="/studio" labelIcon={<ClapperboardIcon className="size-4"/>} className="flex items-center gap-x-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none" />
//             </UserButton.MenuItems>
//          {/* Add Menu items for studio and user profile */}
//         </UserButton> 
//         </SignedIn>
//         <SignedOut>
//         <SignInButton mode="modal">
//         <Button variant="outline" className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none" >
//         <UserCircleIcon className="size-4"/>
//         Sign In
//         </Button>
//         </SignInButton>
// </SignedOut>
// </>

//     )
// }




"use client";

import { Button } from "@/components/ui/button";
import {
  ClapperboardIcon,
  UserCircleIcon,
} from "lucide-react";
import {
  UserButton,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

export const AuthButton = () => {
  return (
    <>
      <SignedIn>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link
              label="Studio"
              href="/studio"
              labelIcon={
                <ClapperboardIcon className="h-4 w-4" />
              }
            />
            <UserButton.Action label="manageAccount" />
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>

      <SignedOut>
        <SignInButton mode="modal">
          <Button
            variant="outline"
            className="flex items-center gap-x-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none"
          >
            <UserCircleIcon className="h-4 w-4" />
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};