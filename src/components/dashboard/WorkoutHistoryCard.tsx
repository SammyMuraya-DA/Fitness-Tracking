
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WorkoutType } from "./DashboardFilters";

interface Workout {
  id: string;
  date: string;
  title: string;
  duration: string;
  exercises: number;
  intensity: "Low" | "Medium" | "High";
  type: WorkoutType;
}

const allWorkouts: Workout[] = [
  {
    id: "1",
    date: "May 12, 2025",
    title: "Upper Body Strength",
    duration: "45 min",
    exercises: 7,
    intensity: "High",
    type: "Strength"
  },
  {
    id: "2",
    date: "May 10, 2025",
    title: "Leg Day",
    duration: "60 min",
    exercises: 6,
    intensity: "High",
    type: "Strength"
  },
  {
    id: "3",
    date: "May 8, 2025",
    title: "Full Body HIIT",
    duration: "30 min",
    exercises: 8,
    intensity: "Medium",
    type: "HIIT"
  },
  {
    id: "4",
    date: "May 5, 2025",
    title: "Core & Cardio",
    duration: "40 min",
    exercises: 5,
    intensity: "Medium",
    type: "Cardio"
  },
  {
    id: "5",
    date: "May 3, 2025",
    title: "Recovery Session",
    duration: "45 min",
    exercises: 4,
    intensity: "Low",
    type: "Recovery"
  },
  {
    id: "6",
    date: "May 1, 2025",
    title: "Yoga Flow",
    duration: "50 min",
    exercises: 10,
    intensity: "Low",
    type: "Yoga"
  },
  {
    id: "7",
    date: "April 29, 2025",
    title: "Cardio Blast",
    duration: "35 min",
    exercises: 5,
    intensity: "High",
    type: "Cardio"
  },
];

const getIntensityColor = (intensity: "Low" | "Medium" | "High") => {
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

interface WorkoutHistoryCardProps {
  searchQuery?: string;
  workoutType?: WorkoutType;
}

export const WorkoutHistoryCard = ({ 
  searchQuery = "", 
  workoutType = "All" 
}: WorkoutHistoryCardProps) => {
  // Filter workouts based on search query and type
  const filteredWorkouts = allWorkouts.filter((workout) => {
    const matchesSearch = workout.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = workoutType === "All" || workout.type === workoutType;
    return matchesSearch && matchesType;
  });

  return (
    <Card className="h-[400px]">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Recent Workouts</CardTitle>
        {filteredWorkouts.length === 0 && (
          <p className="text-sm text-muted-foreground mt-2">
            No workouts found for the selected filters.
          </p>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[320px] px-6">
          <div className="space-y-4">
            {filteredWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4"
              >
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="font-medium text-sm">{workout.title}</span>
                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-xs ${getIntensityColor(
                        workout.intensity
                      )}`}
                    >
                      {workout.intensity}
                    </span>
                    <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-800">
                      {workout.type}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {workout.date} • {workout.duration} • {workout.exercises} exercises
                  </span>
                </div>
                <button className="mt-2 sm:mt-0 text-sm text-fitness-blue hover:underline self-start sm:self-center">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
