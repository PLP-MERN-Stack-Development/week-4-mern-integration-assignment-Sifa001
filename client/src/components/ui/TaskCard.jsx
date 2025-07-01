import { Card } from "./card";

export function TaskCard({ title, description, status }) {
  return (
    <Card className="p-4 space-y-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-600">{description}</p>
      <span className={`inline-block px-2 py-1 rounded text-xs ${status === 'done' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>{status}</span>
    </Card>
  );
} 