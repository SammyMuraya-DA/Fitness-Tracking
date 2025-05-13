
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Search, Medal } from "lucide-react";
import { useState } from "react";

type RecordType = "weight" | "reps" | "time" | "distance";

interface Record {
  id: string;
  exercise: string;
  category: string;
  type: RecordType;
  value: string;
  units: string;
  date: string;
  previousBest?: string;
  improvement?: string;
}

const mockRecords: Record[] = [
  {
    id: "1",
    exercise: "Bench Press",
    category: "Strength",
    type: "weight",
    value: "225",
    units: "lbs",
    date: "May 10, 2025",
    previousBest: "215 lbs",
    improvement: "+10 lbs",
  },
  {
    id: "2",
    exercise: "Squat",
    category: "Strength",
    type: "weight",
    value: "315",
    units: "lbs",
    date: "May 8, 2025",
    previousBest: "300 lbs",
    improvement: "+15 lbs",
  },
  {
    id: "3",
    exercise: "Deadlift",
    category: "Strength",
    type: "weight",
    value: "405",
    units: "lbs",
    date: "May 5, 2025",
    previousBest: "385 lbs",
    improvement: "+20 lbs",
  },
  {
    id: "4",
    exercise: "Pull-ups",
    category: "Calisthenics",
    type: "reps",
    value: "15",
    units: "reps",
    date: "May 3, 2025",
    previousBest: "12 reps",
    improvement: "+3 reps",
  },
  {
    id: "5",
    exercise: "5K Run",
    category: "Cardio",
    type: "time",
    value: "22:45",
    units: "min",
    date: "April 30, 2025",
    previousBest: "23:30",
    improvement: "-0:45",
  },
  {
    id: "6",
    exercise: "Push-ups",
    category: "Calisthenics",
    type: "reps",
    value: "50",
    units: "reps",
    date: "April 28, 2025",
    previousBest: "45 reps",
    improvement: "+5 reps",
  },
  {
    id: "7",
    exercise: "10K Run",
    category: "Cardio",
    type: "time",
    value: "48:22",
    units: "min",
    date: "April 25, 2025",
    previousBest: "50:15",
    improvement: "-1:53",
  },
  {
    id: "8",
    exercise: "Long Jump",
    category: "Athletics",
    type: "distance",
    value: "2.5",
    units: "meters",
    date: "April 20, 2025",
    previousBest: "2.3 meters",
    improvement: "+0.2 meters",
  },
  {
    id: "9",
    exercise: "Plank",
    category: "Core",
    type: "time",
    value: "3:15",
    units: "min",
    date: "April 18, 2025",
    previousBest: "2:45",
    improvement: "+0:30",
  },
  {
    id: "10",
    exercise: "Overhead Press",
    category: "Strength",
    type: "weight",
    value: "135",
    units: "lbs",
    date: "April 15, 2025",
    previousBest: "125 lbs",
    improvement: "+10 lbs",
  },
];

const Records = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredRecords = mockRecords.filter(record => {
    if (activeTab !== "all" && record.category.toLowerCase() !== activeTab) {
      return false;
    }
    return record.exercise.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Personal Records</h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search exercises..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Medal className="mr-2 h-5 w-5 text-fitness-orange" />
              Your Personal Records
            </CardTitle>
            <CardDescription>
              {filteredRecords.length} records in your collection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="strength">Strength</TabsTrigger>
                <TabsTrigger value="cardio">Cardio</TabsTrigger>
                <TabsTrigger value="calisthenics">Calisthenics</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-0">
                <RecordsTable records={filteredRecords} />
              </TabsContent>
              <TabsContent value="strength" className="mt-0">
                <RecordsTable records={filteredRecords} />
              </TabsContent>
              <TabsContent value="cardio" className="mt-0">
                <RecordsTable records={filteredRecords} />
              </TabsContent>
              <TabsContent value="calisthenics" className="mt-0">
                <RecordsTable records={filteredRecords} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

const RecordsTable = ({ records }: { records: Record[] }) => {
  return records.length > 0 ? (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Exercise</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Record</TableHead>
            <TableHead className="text-right">Date</TableHead>
            <TableHead className="text-right">Improvement</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium">{record.exercise}</TableCell>
              <TableCell>{record.category}</TableCell>
              <TableCell className="text-right font-bold">{record.value} {record.units}</TableCell>
              <TableCell className="text-right">{record.date}</TableCell>
              <TableCell className="text-right text-fitness-green">{record.improvement}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ) : (
    <div className="py-12 text-center">
      <p className="text-muted-foreground">No records found</p>
      <p className="text-sm text-muted-foreground mt-1">
        Try adjusting your search or filter
      </p>
    </div>
  );
};

export default Records;
