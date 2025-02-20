import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";

export default function ToDoList({ tasks = [], isLoading }) {
  const [completedTasks, setCompletedTasks] = useState({});

  const toggleTask = (index) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Card className="w-full max-w-lg mt-4">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-2">To-Do List</h2>

        {isLoading ? (
          <ul className="space-y-2">
            {[...Array(3)].map((_, index) => (
              <li key={index} className="flex items-center gap-2">
                <Skeleton className="w-5 h-5 rounded" />
                <Skeleton className="h-4 w-3/4" />
              </li>
            ))}
          </ul>
        ) : tasks.length > 0 ? (
          <ul className="space-y-2">
            {tasks.map((task, index) => (
              <li key={index} className="flex items-center gap-2">
                <Checkbox
                  id={`task-${index}`}
                  checked={!!completedTasks[index]}
                  onCheckedChange={() => toggleTask(index)}
                  aria-label={`Mark ${task} as completed`}
                />
                <label
                  htmlFor={`task-${index}`}
                  className={`cursor-pointer ${completedTasks[index] ? "line-through text-gray-500" : ""}`}
                >
                  {task}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No tasks found.</p>
        )}
      </CardContent>
    </Card>
  );
}
