
import { useState } from "react";
import { Search, Calendar, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type WorkoutType = "All" | "Strength" | "Cardio" | "HIIT" | "Yoga" | "Recovery";
export type DateRange = { from: Date; to: Date } | undefined;

interface DashboardFiltersProps {
  onSearchChange: (value: string) => void;
  onWorkoutTypeChange: (type: WorkoutType) => void;
  onDateRangeChange: (range: DateRange) => void;
}

export const DashboardFilters = ({
  onSearchChange,
  onWorkoutTypeChange,
  onDateRangeChange
}: DashboardFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState<DateRange>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date()
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange(value);
  };

  const handleWorkoutTypeChange = (value: string) => {
    onWorkoutTypeChange(value as WorkoutType);
  };

  const handleDateSelect = (range: DateRange) => {
    if (range?.from && range?.to) {
      setDate(range);
      onDateRangeChange(range);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row mb-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search workouts..."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-10"
        />
      </div>
      
      <Select onValueChange={handleWorkoutTypeChange} defaultValue="All">
        <SelectTrigger className="w-[180px]">
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Workout Type" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Types</SelectItem>
          <SelectItem value="Strength">Strength</SelectItem>
          <SelectItem value="Cardio">Cardio</SelectItem>
          <SelectItem value="HIIT">HIIT</SelectItem>
          <SelectItem value="Yoga">Yoga</SelectItem>
          <SelectItem value="Recovery">Recovery</SelectItem>
        </SelectContent>
      </Select>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-start text-left font-normal w-[240px]"
          >
            <Calendar className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL d")} - {format(date.to, "LLL d, yyyy")}
                </>
              ) : (
                format(date.from, "LLL d, yyyy")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
