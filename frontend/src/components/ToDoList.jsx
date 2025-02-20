import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function ToDoList({ tasks }) {
  const [completedTasks, setCompletedTasks] = useState([]);

  const toggleTask = (task) => {
    setCompletedTasks((prev) =>
      prev.includes(task) ? prev.filter((t) => t !== task) : [...prev, task]
    );
  };

  return (
    <Card className="w-full max-w-lg mt-4">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-2">To-Do List</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks found.</p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task, index) => (
              <li key={index} className="flex items-center gap-2">
                <Checkbox
                  checked={completedTasks.includes(task)}
                  onCheckedChange={() => toggleTask(task)}
                />
                <span className={completedTasks.includes(task) ? "line-through text-gray-500" : ""}>
                  {task}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
