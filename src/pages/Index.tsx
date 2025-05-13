
import { useState, useEffect } from "react";
import { Activity, Clock, TrendingUp, Medal } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { WorkoutHistoryCard } from "@/components/dashboard/WorkoutHistoryCard";
import { PersonalRecordsCard } from "@/components/dashboard/PersonalRecordsCard";
import { ProgressChart } from "@/components/dashboard/ProgressChart";
import { WorkoutTypesPieChart } from "@/components/dashboard/WorkoutTypesPieChart";
import { DashboardFilters, DateRange, WorkoutType } from "@/components/dashboard/DashboardFilters";
import { useToast } from "@/hooks/use-toast";

// Original data
const allStrengthData = [
  { name: "Week 1", value: 185 },
  { name: "Week 2", value: 190 },
  { name: "Week 3", value: 185 },
  { name: "Week 4", value: 195 },
  { name: "Week 5", value: 200 },
  { name: "Week 6", value: 205 },
  { name: "Week 7", value: 210 },
  { name: "Week 8", value: 220 },
];

const allWeightData = [
  { name: "Jan", value: 180 },
  { name: "Feb", value: 178 },
  { name: "Mar", value: 176 },
  { name: "Apr", value: 175 },
  { name: "May", value: 172 },
];

const Dashboard = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [workoutType, setWorkoutType] = useState<WorkoutType>("All");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // First day of current month
    to: new Date(), // Current date
  });
  
  const [strengthData, setStrengthData] = useState(allStrengthData);
  const [weightData, setWeightData] = useState(allWeightData);
  const [stats, setStats] = useState({
    totalWorkouts: 42,
    workoutHours: "24.5",
    currentStreak: "6 days",
    personalRecords: 12,
  });

  // Filter data based on selected filters
  useEffect(() => {
    // In a real app, this would be a server call with the filter parameters
    // For this demo, we'll just simulate filtering
    
    // Filter strength data (simulate date range filter)
    let filteredStrength = [...allStrengthData];
    if (workoutType !== "All" && workoutType !== "Strength") {
      // If not showing strength workouts, show less data
      filteredStrength = filteredStrength.slice(Math.floor(Math.random() * 3));
    }
    setStrengthData(filteredStrength);
    
    // Filter weight data
    let filteredWeight = [...allWeightData];
    setWeightData(filteredWeight);
    
    // Update stats based on filters
    let totalWorkouts = 42;
    let workoutHours = "24.5";
    
    if (workoutType !== "All") {
      // Simulate filtered stats
      totalWorkouts = Math.floor(totalWorkouts / 2) + Math.floor(Math.random() * 10);
      const hours = (parseFloat(workoutHours) / 2) + (Math.random() * 5);
      workoutHours = hours.toFixed(1);
    }
    
    setStats({
      totalWorkouts,
      workoutHours,
      currentStreak: "6 days",
      personalRecords: 12
    });

    // Show toast when filters change
    toast({
      title: "Dashboard Updated",
      description: `Showing data for ${workoutType} workouts`,
    });
    
  }, [workoutType, dateRange, searchQuery, toast]);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        <DashboardFilters
          onSearchChange={setSearchQuery}
          onWorkoutTypeChange={setWorkoutType}
          onDateRangeChange={setDateRange}
        />
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Workouts"
            value={stats.totalWorkouts}
            description="This month"
            icon={<Activity className="h-4 w-4" />}
            trend="up"
            trendValue="12%"
          />
          <StatsCard
            title="Workout Hours"
            value={stats.workoutHours}
            description="This month"
            icon={<Clock className="h-4 w-4" />}
            trend="up"
            trendValue="8%"
          />
          <StatsCard
            title="Current Streak"
            value={stats.currentStreak}
            description="Personal best: 14 days"
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <StatsCard
            title="Personal Records"
            value={stats.personalRecords}
            description="All time"
            icon={<Medal className="h-4 w-4" />}
            trend="up"
            trendValue="2 new"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <WorkoutHistoryCard searchQuery={searchQuery} workoutType={workoutType} />
          <PersonalRecordsCard />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ProgressChart
            title="Bench Press Progress"
            data={strengthData}
            color="#0EA5E9"
            description="Last 8 weeks"
            metric=" lbs"
          />
          <ProgressChart
            title="Weight Progress"
            data={weightData}
            color="#22C55E"
            description="Last 5 months"
            metric=" lbs"
          />
          <WorkoutTypesPieChart selectedType={workoutType} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
