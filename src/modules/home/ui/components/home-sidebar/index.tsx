 // src/modules/home/ui/components/home-sidebar/index.tsx
import { Sidebar, SidebarContent } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { MainSection } from "@/modules/home/ui/components/home-sidebar/main-section"
import { PersonalSection } from "./personal-section"

export const HomeSidebar = () => {
  return (
    <Sidebar
      className="pt-16 z-40 border-none"
      collapsible="icon"
    >
      <SidebarContent className="bg-background">
        <MainSection />

        <Separator className="my-4" />

        <PersonalSection />
      </SidebarContent>
    </Sidebar>
  )
}








