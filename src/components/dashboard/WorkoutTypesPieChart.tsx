
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { WorkoutType } from "./DashboardFilters";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A259FF"];

interface WorkoutTypeData {
  name: string;
  value: number;
  color: string;
}

const allData: WorkoutTypeData[] = [
  { name: "Strength", value: 35, color: COLORS[0] },
  { name: "Cardio", value: 25, color: COLORS[1] },
  { name: "HIIT", value: 20, color: COLORS[2] },
  { name: "Yoga", value: 15, color: COLORS[3] },
  { name: "Recovery", value: 5, color: COLORS[4] },
];

interface WorkoutTypesPieChartProps {
  selectedType?: WorkoutType;
}

export const WorkoutTypesPieChart = ({ selectedType = "All" }: WorkoutTypesPieChartProps) => {
  // If a specific type is selected (not "All"), highlight that slice
  const data = allData.map(item => ({
    ...item,
    // Emphasize the selected type by adding to its value
    value: 
      selectedType !== "All" && item.name === selectedType 
        ? item.value * 1.2  // Increase the selected type's value by 20%
        : item.value
  }));

  return (
    <Card className="h-[380px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Workout Types</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={90}
              innerRadius={40}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  // Highlight the selected type with a stroke
                  stroke={
                    selectedType !== "All" && entry.name === selectedType
                      ? "#000"
                      : "transparent"
                  }
                  strokeWidth={
                    selectedType !== "All" && entry.name === selectedType ? 2 : 0
                  }
                />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value} workouts`, name]} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
