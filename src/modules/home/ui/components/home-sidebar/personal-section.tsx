"use client"
import Link from "next/link"
import {SidebarGroup,SidebarGroupContent,SidebarMenu,SidebarMenuButton,SidebarMenuItem} from "@/components/ui/sidebar"
import {HistoryIcon,ListVideoIcon,ThumbsUpIcon} from "lucide-react"
import { useAuth, useClerk } from "@clerk/nextjs";
const items=[

     
    {
        title:"History",
        url:"/playlist/history",
        icon: HistoryIcon ,
        auth:true
    },
    {title:"Liked Videos",
        url:"/playlist/liked",
        icon:ThumbsUpIcon,
        auth:true,
    },

    {title:"All playlist",
        url:"/playlists",
        icon:ListVideoIcon,
        auth:true
    },
]
export const PersonalSection=()=>{

    const clerk = useClerk(); // ✅ FIXED
  const { isSignedIn } = useAuth();
    return(

        
        <SidebarGroup>
            <SidebarGroupContent>

                <SidebarMenu>
                  {items.map((item)=>(
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton tooltip={item.title} asChild isActive={false}// TODO:Change to look at current pathname
                        onClick={(e) => {
                            if (!isSignedIn && item.auth) {
                              e.preventDefault();
                              clerk.openSignIn?.(); // ✅ Ensure the function exists before calling
                            }
                          }}
                         // TODO:Do something on cLick
                         >

                     
                      <Link href={item.url} className="flex items-center gap-4">
                        <item.icon className="w-5 h-5" /> {/* Self-closing icon */}
                        <span className="text-sm" >{item.title}</span>
                      </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
        
    )
    
}