import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Summary({ notes,events = [], isLoading }) {
  return (
    <Card className="w-full max-w-lg mt-4">
      <CardContent className="p-4">
        <section aria-labelledby="summary-heading">
          <h2 id="summary-heading" className="text-lg font-semibold mb-2">
            Meeting Summary/events
          </h2>

          {isLoading ? (
            <Skeleton className="h-4 w-full mb-2" />
          ) : notes ? (
            <p className="mb-2">{notes}</p>
          ) : (
            <p className="text-gray-500">No summary available.</p>
          )}

          {isLoading ? (
            <div className="mt-2 space-y-2">
              {[...Array(2)].map((_, index) => (
                <Skeleton key={index} className="h-4 w-3/4" />
              ))}
            </div>
          ) : (
            events?.length > 0 && (
              <div className="mt-2">
                <h3 className="font-semibold">Events:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {events.map((event, index) => (
                    <li key={index}>
                      {event.title} on{" "}
                      {event.date
                        ? new Date(event.date).toLocaleDateString()
                        : "TBD"}{" "}
                      at {event.time || "TBD"}
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </section>
      </CardContent>
    </Card>
  );
}
