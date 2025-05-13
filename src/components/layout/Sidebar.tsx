
import { Activity, BarChart, Clock, History, Medal, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { 
      name: "Dashboard", 
      path: "/", 
      icon: <Activity className="w-5 h-5" /> 
    },
    { 
      name: "History", 
      path: "/history", 
      icon: <History className="w-5 h-5" /> 
    },
    { 
      name: "Records", 
      path: "/records", 
      icon: <Medal className="w-5 h-5" /> 
    },
    { 
      name: "Progress", 
      path: "/progress", 
      icon: <BarChart className="w-5 h-5" /> 
    },
  ];

  return (
    <div className="hidden md:flex h-screen w-64 flex-col border-r bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold text-fitness-blue">FitTrack</h1>
      </div>
      <div className="flex-1 overflow-auto py-6">
        <nav className="space-y-1 px-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-fitness-blue text-white"
                  : "text-gray-600 hover:bg-fitness-lightGray"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t p-4">
        <div className="rounded-lg bg-fitness-lightGray p-4">
          <h3 className="font-medium text-sm text-gray-900">Start Workout</h3>
          <p className="mt-1 text-xs text-gray-500">Track your next session</p>
          <Button 
            className="mt-3 w-full bg-fitness-blue hover:bg-fitness-darkBlue"
            asChild
          >
            <Link to="/new-workout">
              <Plus className="mr-1.5 h-4 w-4" /> New Workout
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
