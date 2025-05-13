
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, Search, Filter } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockWorkouts = [
  {
    id: "1",
    date: "May 12, 2025",
    title: "Upper Body Strength",
    duration: "45 min",
    exercises: [
      { name: "Bench Press", sets: 3, reps: "8, 8, 7", weight: "225 lbs" },
      { name: "Pull Ups", sets: 3, reps: "10, 8, 6", weight: "Bodyweight" },
      { name: "Shoulder Press", sets: 3, reps: "10, 10, 8", weight: "135 lbs" },
    ],
    notes: "Felt strong today, increased bench press weight by 5 lbs.",
    intensity: "High",
  },
  {
    id: "2",
    date: "May 10, 2025",
    title: "Leg Day",
    duration: "60 min",
    exercises: [
      { name: "Squats", sets: 4, reps: "10, 8, 8, 6", weight: "275 lbs" },
      { name: "Leg Press", sets: 3, reps: "12, 10, 10", weight: "360 lbs" },
      { name: "Lunges", sets: 3, reps: "10 each", weight: "40 lbs" },
    ],
    notes: "Good session, focusing on form for squats.",
    intensity: "High",
  },
  {
    id: "3",
    date: "May 8, 2025",
    title: "Full Body HIIT",
    duration: "30 min",
    exercises: [
      { name: "Burpees", sets: 3, reps: "15, 15, 12", weight: "Bodyweight" },
      { name: "Mountain Climbers", sets: 3, reps: "30 sec", weight: "Bodyweight" },
      { name: "Push-ups", sets: 3, reps: "15, 12, 10", weight: "Bodyweight" },
    ],
    notes: "Intense session, kept rest periods short.",
    intensity: "Medium",
  },
  {
    id: "4",
    date: "May 5, 2025",
    title: "Core & Cardio",
    duration: "40 min",
    exercises: [
      { name: "Running", sets: 1, reps: "20 min", weight: "N/A" },
      { name: "Planks", sets: 3, reps: "60 sec", weight: "Bodyweight" },
      { name: "Russian Twists", sets: 3, reps: "20, 20, 15", weight: "25 lbs" },
    ],
    notes: "Good cardio session, improved pace from last time.",
    intensity: "Medium",
  },
  {
    id: "5",
    date: "May 3, 2025",
    title: "Recovery Session",
    duration: "45 min",
    exercises: [
      { name: "Foam Rolling", sets: 1, reps: "10 min", weight: "N/A" },
      { name: "Stretching", sets: 1, reps: "15 min", weight: "N/A" },
      { name: "Light Walking", sets: 1, reps: "20 min", weight: "N/A" },
    ],
    notes: "Focus on recovery and mobility today.",
    intensity: "Low",
  },
];

const getIntensityColor = (intensity: string) => {
  switch (intensity) {
    case "Low":
      return "bg-blue-100 text-blue-800";
    case "Medium":
      return "bg-orange-100 text-orange-800";
    case "High":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const History = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedWorkoutId, setExpandedWorkoutId] = useState<string | null>(null);

  // Filter workouts based on search and date
  const filteredWorkouts = mockWorkouts.filter((workout) => {
    const matchesSearch = workout.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = date ? workout.date.includes(format(date, "MMM d, yyyy")) : true;
    return matchesSearch && matchesDate;
  });

  const toggleWorkoutDetails = (id: string) => {
    setExpandedWorkoutId(expandedWorkoutId === id ? null : id);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h1 className="text-2xl font-bold">Workout History</h1>
          <Button className="mt-2 sm:mt-0 bg-fitness-blue hover:bg-fitness-darkBlue">
            Export History
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search workouts..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Filter by date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
              {date && (
                <div className="p-3 border-t flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setDate(undefined)}
                  >
                    Clear
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" /> More Filters
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Your Workouts</CardTitle>
            <CardDescription>
              {filteredWorkouts.length} {filteredWorkouts.length === 1 ? 'workout' : 'workouts'} found
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              {filteredWorkouts.length > 0 ? (
                <div className="space-y-4 px-6 py-2">
                  {filteredWorkouts.map((workout) => (
                    <div key={workout.id} className="border-b pb-4 last:border-0">
                      <div 
                        onClick={() => toggleWorkoutDetails(workout.id)}
                        className="cursor-pointer"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">{workout.title}</h3>
                              <span
                                className={`ml-2 rounded-full px-2 py-0.5 text-xs ${getIntensityColor(
                                  workout.intensity
                                )}`}
                              >
                                {workout.intensity}
                              </span>
                            </div>
                            <div className="text-sm text-gray-500">
                              {workout.date} • {workout.duration}
                            </div>
                          </div>
                          <div>
                            {expandedWorkoutId === workout.id ? (
                              <div className="text-fitness-blue font-medium">Hide Details</div>
                            ) : (
                              <div className="text-fitness-blue font-medium">Show Details</div>
                            )}
                          </div>
                        </div>
                      </div>

                      {expandedWorkoutId === workout.id && (
                        <div className="mt-4 space-y-4">
                          <div className="bg-gray-50 p-4 rounded-md">
                            <h4 className="font-medium mb-2">Exercises</h4>
                            <div className="space-y-2">
                              {workout.exercises.map((exercise, idx) => (
                                <div key={idx} className="grid grid-cols-4 text-sm">
                                  <div className="col-span-1">{exercise.name}</div>
                                  <div>{exercise.sets} sets</div>
                                  <div>{exercise.reps}</div>
                                  <div>{exercise.weight}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                          {workout.notes && (
                            <div>
                              <h4 className="font-medium mb-1">Notes</h4>
                              <p className="text-sm text-gray-600">{workout.notes}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">No workouts found</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your search or filter
                  </p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default History;
