interface LayoutProps {
    children: React.ReactNode;
    }   
    const Layout = ({ children }: LayoutProps) => {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex-1">
                    {children}
                </div>
            </div>
        );
    }

export default Layout;