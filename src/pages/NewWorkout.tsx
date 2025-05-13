
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface WorkoutFormValues {
  name: string;
  type: string;
  duration: string;
  notes: string;
}

const NewWorkout = () => {
  const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState(false);
  
  const form = useForm<WorkoutFormValues>({
    defaultValues: {
      name: "",
      type: "",
      duration: "",
      notes: ""
    }
  });

  const handleSubmit = (data: WorkoutFormValues) => {
    if (isStarted) {
      // In the future, this would save the completed workout to the database
      toast.success("Workout completed! 💪", {
        description: `${data.name} - ${data.duration} minutes`
      });
      navigate("/history");
    } else {
      setIsStarted(true);
      toast("Workout started! Get after it! 🏋️‍♂️");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          {isStarted ? (
            <>
              <Clock className="h-6 w-6 text-fitness-blue" />
              Workout in Progress
            </>
          ) : (
            <>
              <Plus className="h-6 w-6 text-fitness-blue" />
              New Workout
            </>
          )}
        </h1>
        
        <Card>
          <CardHeader>
            <CardTitle>{isStarted ? "Finish Your Workout" : "Create Workout"}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workout Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Morning Push Day" 
                          {...field} 
                          disabled={isStarted}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workout Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        disabled={isStarted}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="strength">Strength</SelectItem>
                          <SelectItem value="cardio">Cardio</SelectItem>
                          <SelectItem value="hiit">HIIT</SelectItem>
                          <SelectItem value="yoga">Yoga</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="45" 
                          {...field} 
                          disabled={isStarted}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{isStarted ? "Workout Notes" : "Notes"}</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={isStarted ? "How was your workout? Add notes here..." : "Optional notes..."}
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit"
                  className="w-full bg-fitness-blue hover:bg-fitness-darkBlue"
                >
                  {isStarted ? (
                    <><Clock className="mr-1.5 h-4 w-4" /> Complete Workout</>
                  ) : (
                    <><Plus className="mr-1.5 h-4 w-4" /> Start Workout</>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NewWorkout;
