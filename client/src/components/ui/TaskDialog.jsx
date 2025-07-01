import { Dialog } from "./dialog";
import { Form } from "./form";
import { Input } from "./input";
import { Button } from "./button";
import { useState } from "react";

export function TaskDialog({ open, onOpenChange, onSubmit, initialData }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [status, setStatus] = useState(initialData?.status || "pending");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ title, description, status });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <Button>{initialData ? "Edit Task" : "Add Task"}</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>{initialData ? "Edit Task" : "Add Task"}</Dialog.Title>
        <Form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          <select
            className="border rounded px-2 py-1 w-full"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="done">Done</option>
          </select>
          <Button type="submit" className="w-full">{initialData ? "Update" : "Create"}</Button>
        </Form>
      </Dialog.Content>
    </Dialog>
  );
} 