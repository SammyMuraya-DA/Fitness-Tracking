
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Medal } from "lucide-react";

interface PersonalRecord {
  id: string;
  exercise: string;
  value: string;
  date: string;
  previousBest?: string;
  improvement?: string;
}

const mockRecords: PersonalRecord[] = [
  {
    id: "1",
    exercise: "Bench Press",
    value: "225 lbs",
    date: "May 10, 2025",
    previousBest: "215 lbs",
    improvement: "+10 lbs",
  },
  {
    id: "2",
    exercise: "Squat",
    value: "315 lbs",
    date: "May 8, 2025",
    previousBest: "300 lbs",
    improvement: "+15 lbs",
  },
  {
    id: "3",
    exercise: "Deadlift",
    value: "405 lbs",
    date: "May 5, 2025",
    previousBest: "385 lbs",
    improvement: "+20 lbs",
  },
  {
    id: "4",
    exercise: "Pull-ups",
    value: "15 reps",
    date: "May 3, 2025",
    previousBest: "12 reps",
    improvement: "+3 reps",
  },
  {
    id: "5",
    exercise: "5K Run",
    value: "22:45",
    date: "April 30, 2025",
    previousBest: "23:30",
    improvement: "-0:45",
  },
];

export const PersonalRecordsCard = () => {
  return (
    <Card className="h-[400px]">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Medal className="mr-2 h-5 w-5 text-fitness-orange" />
          Personal Records
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[320px] px-6">
          <div className="space-y-4">
            {mockRecords.map((record) => (
              <div
                key={record.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4"
              >
                <div className="flex-1">
                  <div className="flex flex-col">
                    <span className="font-medium">{record.exercise}</span>
                    <div className="flex items-center mt-1">
                      <span className="text-lg font-semibold text-fitness-purple">
                        {record.value}
                      </span>
                      {record.improvement && (
                        <span className="ml-2 text-xs text-fitness-green">
                          {record.improvement}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      Achieved on {record.date}
                    </span>
                    {record.previousBest && (
                      <span className="text-xs text-gray-500">
                        Previous: {record.previousBest}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
