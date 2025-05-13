
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { BarChart4, LineChart as LineChartIcon } from "lucide-react";

// Mock data for strength progress
const strengthData = [
  { date: "Jan 5", benchPress: 185, squat: 250, deadlift: 300 },
  { date: "Jan 12", benchPress: 190, squat: 255, deadlift: 310 },
  { date: "Jan 19", benchPress: 190, squat: 260, deadlift: 315 },
  { date: "Jan 26", benchPress: 195, squat: 265, deadlift: 320 },
  { date: "Feb 2", benchPress: 200, squat: 270, deadlift: 325 },
  { date: "Feb 9", benchPress: 200, squat: 275, deadlift: 330 },
  { date: "Feb 16", benchPress: 205, squat: 280, deadlift: 335 },
  { date: "Feb 23", benchPress: 210, squat: 280, deadlift: 340 },
  { date: "Mar 2", benchPress: 215, squat: 290, deadlift: 345 },
  { date: "Mar 9", benchPress: 215, squat: 295, deadlift: 350 },
  { date: "Mar 16", benchPress: 220, squat: 300, deadlift: 355 },
  { date: "Mar 23", benchPress: 225, squat: 305, deadlift: 365 },
  { date: "Mar 30", benchPress: 225, squat: 315, deadlift: 370 },
];

// Mock data for body stats
const bodyStatsData = [
  { date: "Jan", weight: 180, bodyFat: 18 },
  { date: "Feb", weight: 178, bodyFat: 17 },
  { date: "Mar", weight: 176, bodyFat: 16.5 },
  { date: "Apr", weight: 175, bodyFat: 16 },
  { date: "May", weight: 172, bodyFat: 15 },
];

// Mock data for workout frequency
const workoutFrequencyData = [
  { month: "Jan", workouts: 16 },
  { month: "Feb", workouts: 18 },
  { month: "Mar", workouts: 15 },
  { month: "Apr", workouts: 20 },
  { month: "May", workouts: 22 },
];

// Mock data for volume by muscle group
const volumeByMuscleGroup = [
  { name: "Week 1", chest: 6000, back: 7500, legs: 8500, shoulders: 5000, arms: 4500 },
  { name: "Week 2", chest: 6500, back: 7000, legs: 9000, shoulders: 5200, arms: 4700 },
  { name: "Week 3", chest: 7000, back: 7200, legs: 8800, shoulders: 5500, arms: 5000 },
  { name: "Week 4", chest: 7200, back: 7300, legs: 9200, shoulders: 5800, arms: 5200 },
  { name: "Week 5", chest: 7500, back: 7700, legs: 9500, shoulders: 6000, arms: 5300 },
];

const Progress = () => {
  const [timeRange, setTimeRange] = useState("3m");
  const [chartType, setChartType] = useState("line");
  const [bodyMetric, setBodyMetric] = useState("weight");

  // Filter data based on time range
  const getFilteredData = () => {
    // In a real app, this would filter based on actual dates
    // Here we'll just use the full dataset as an example
    return strengthData;
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h1 className="text-2xl font-bold">Progress Tracking</h1>
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1 Month</SelectItem>
                <SelectItem value="3m">3 Months</SelectItem>
                <SelectItem value="6m">6 Months</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={chartType === "line" ? "default" : "outline"}
              size="icon"
              onClick={() => setChartType("line")}
              className={chartType === "line" ? "bg-fitness-blue hover:bg-fitness-darkBlue" : ""}
            >
              <LineChartIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === "bar" ? "default" : "outline"}
              size="icon"
              onClick={() => setChartType("bar")}
              className={chartType === "bar" ? "bg-fitness-blue hover:bg-fitness-darkBlue" : ""}
            >
              <BarChart4 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Strength Progress</CardTitle>
            <CardDescription>
              Track your main lifts progress over time
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "line" ? (
                <LineChart data={getFilteredData()} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="benchPress"
                    name="Bench Press (lbs)"
                    stroke="#0EA5E9"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="squat"
                    name="Squat (lbs)"
                    stroke="#22C55E"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="deadlift"
                    name="Deadlift (lbs)"
                    stroke="#F97316"
                    strokeWidth={2}
                  />
                </LineChart>
              ) : (
                <BarChart data={getFilteredData()} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="benchPress" name="Bench Press (lbs)" fill="#0EA5E9" />
                  <Bar dataKey="squat" name="Squat (lbs)" fill="#22C55E" />
                  <Bar dataKey="deadlift" name="Deadlift (lbs)" fill="#F97316" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Body Stats</CardTitle>
              <CardDescription className="flex justify-between items-center">
                <span>Track your body measurements</span>
                <Select value={bodyMetric} onValueChange={setBodyMetric}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight">Weight</SelectItem>
                    <SelectItem value="bodyFat">Body Fat %</SelectItem>
                  </SelectContent>
                </Select>
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={bodyStatsData} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
                  <defs>
                    <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" />
                  <YAxis domain={bodyMetric === "weight" ? ["auto", "auto"] : [0, 30]} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey={bodyMetric}
                    stroke="#0EA5E9"
                    fillOpacity={1}
                    fill="url(#colorMetric)"
                    name={bodyMetric === "weight" ? "Weight (lbs)" : "Body Fat %"}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Workout Frequency</CardTitle>
              <CardDescription>
                Number of workouts per month
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workoutFrequencyData} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="workouts" name="Number of Workouts" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Training Volume by Muscle Group</CardTitle>
            <CardDescription>
              Weekly volume (weight × reps) by muscle group
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeByMuscleGroup} margin={{ top: 10, right: 20, bottom: 5, left: 0 }} stackOffset="expand">
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="chest" name="Chest" stackId="1" stroke="#0EA5E9" fill="#0EA5E9" />
                <Area type="monotone" dataKey="back" name="Back" stackId="1" stroke="#22C55E" fill="#22C55E" />
                <Area type="monotone" dataKey="legs" name="Legs" stackId="1" stroke="#F97316" fill="#F97316" />
                <Area type="monotone" dataKey="shoulders" name="Shoulders" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" />
                <Area type="monotone" dataKey="arms" name="Arms" stackId="1" stroke="#EF4444" fill="#EF4444" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Progress;
