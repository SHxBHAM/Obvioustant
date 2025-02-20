import { Card, CardContent } from "@/components/ui/card";

export default function Summary({ notes, events }) {
  return (
    <Card className="w-full max-w-lg mt-4">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-2">Meeting Summary</h2>

        {notes ? <p className="mb-2">{notes}</p> : <p className="text-gray-500">No summary available.</p>}

        {events.length > 0 && (
          <div className="mt-2">
            <h3 className="font-semibold">Events:</h3>
            <ul className="list-disc pl-5">
              {events.map((event, index) => (
                <li key={index}>
                  {event.title} on {event.date} at {event.time}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
