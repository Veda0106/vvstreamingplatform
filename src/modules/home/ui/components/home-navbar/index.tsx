// src/modules/home/ui/components/home-navbar/index.tsx
import Image from "next/image"
import Link from "next/link"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { SearchInput } from  "../home-navbar/search-input"
import { AuthButton } from "@/modules/auth/ui/components/auth-button"
export const HomeNavbar =()=>{
return (
    < nav className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50">
        <div className="flex items-center gap-4 w-full">
                    {/* Menu & Logo */}
                    <div className="flex items-center gap-2">
                    <SidebarTrigger/>
                <Link href="/">
                <div className="p-4 flex items-center gap-1">
                    <Image src="/ok.jpg" alt="Logo" height={60} width={60} />
                    <p className="text-xl font-semibold tracking-tight">VedaVerse </p>
                </div>
                </Link>
                </div>
                {/* Search Bar */}
                <div className="flex-1 justify-center max-w-[720px] mx-auto">
                   <SearchInput/>
                </div>
                <div className="flex-shrink-0 items-center gap-4">
                    <AuthButton/>
                </div>
    </div>
    </nav>
);
}