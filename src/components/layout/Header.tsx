
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-white px-4">
      <div className="flex md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
        <div className="md:hidden flex items-center">
          <span className="text-lg font-bold text-fitness-blue">FitTrack</span>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-end md:justify-between">
        <div className="hidden md:flex">
          <span className="text-lg font-medium">Welcome, Athlete</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-fitness-blue border-fitness-blue hover:bg-fitness-blue hover:text-white">
            Profile
          </Button>
        </div>
      </div>
    </header>
  );
};
