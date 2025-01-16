import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Button,
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";
import {
  Laptop,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
  Sidebar,
  LayoutDashboard,
  Tags,
  Receipt,
  SendHorizontal,
  SidebarClose,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useDispatch, useSelector } from "react-redux";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Tags", path: "/tags", icon: Tags },
  { name: "Transactions", path: "/transactions", icon: Receipt },
  { name: "Send Money", path: "/send-money", icon: SendHorizontal },
];

export function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: any) => state.user.userData);

  useEffect(() => {
    if (!userData) {
      navigate("/signin");
    }
  }, [userData, dispatch, navigate]);

  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("sidebar-expanded");
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <TooltipProvider>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={cn(
          "flex flex-col h-screen bg-background/80 border-r transition-all duration-300 ease-in-out",
          isSidebarOpen ? "w-64" : "w-20",
          /* Mobile positioning */
          "fixed top-0 bottom-0 md:sticky md:top-0",
          /* Mobile slide animation */
          isSidebarOpen ? "left-0" : "-left-full md:left-0",
          "z-30",
        )}
      >
        {/* Mobile close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 md:hidden"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <SidebarClose className="w-4 h-4 hidden sm:flex" />
          ) : (
            <Sidebar className="w-4 h-4 hidden sm:flex" />
          )}
        </Button>

        {/* Desktop toggle button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-3 hidden sm:flex shadow-md rounded-full"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <SidebarClose className="w-4 h-4 hidden sm:flex" />
          ) : (
            <Sidebar className="w-4 h-4 hidden sm:flex" />
          )}
        </Button>

        <div className="flex items-center p-4">
          <Link
            to="/"
            className={cn(
              "flex items-center space-x-2",
              !isSidebarOpen && "justify-center w-full",
            )}
          >
            <Settings className="w-6 h-6" />
            {isSidebarOpen && (
              <span className="text-xl font-semibold">Money Manager</span>
            )}
          </Link>
        </div>

        <nav className="flex-1 p-4">
          {navItems.map((item) => (
            <Tooltip key={item.name} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-2 mt-2 text-sm rounded-md",
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    !isSidebarOpen && "justify-center px-0",
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {isSidebarOpen && <span className="ml-2">{item.name}</span>}
                </Link>
              </TooltipTrigger>
              {!isSidebarOpen && (
                <TooltipContent side="right">
                  <p>{item.name}</p>
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </nav>

        <div className={cn("p-4 border-t")}>
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full",
                      isSidebarOpen ? "justify-start" : "justify-center p-0",
                    )}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/avatar.png" alt="User avatar" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    {isSidebarOpen && (
                      <div className="flex flex-col items-start ml-2">
                        <span className="text-sm font-medium">
                          {userData && userData.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {userData && userData.email}
                        </span>
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              {!isSidebarOpen && (
                <TooltipContent side="right">
                  <p>{userData && userData.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {userData && userData.email}
                  </p>
                </TooltipContent>
              )}
            </Tooltip>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center justify-between w-full">
                  <span>Theme</span>
                  <div className="flex space-x-1">
                    <Button
                      variant={theme === "light" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={theme === "dark" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={theme === "system" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setTheme("system")}
                    >
                      <Laptop className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed right-4 top-4 md:hidden z-50"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Sidebar className="w-6 h-6" />
      </Button>
    </TooltipProvider>
  );
}
