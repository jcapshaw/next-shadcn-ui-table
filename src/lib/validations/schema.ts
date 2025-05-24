import { z } from "zod";

export const vehicleStatuses = ["in-stock", "sold", "maintenance"] as const;

export const vehicleSchema = z.object({
  id: z.string(),
  make: z.string(),
  model: z.string(),
  year: z.number().int().positive(),
  color: z.string(),
  vin: z.string().length(17), // Standard VIN length
  price: z.number().positive(),
  status: z.enum(vehicleStatuses),
  created_at: z.date().transform((value) => new Date(value))
});

export type VehicleType = z.infer<typeof vehicleSchema>;

export const statuses = [
  { value: "backlog", label: "Backlog" },
  { value: "todo", label: "Todo" },
  { value: "in progress", label: "In Progress" },
  { value: "in-progress", label: "In-Progress" },
  { value: "done", label: "Done" },
  { value: "canceled", label: "Canceled" },
] as const;

export const priorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
] as const;

export const labels = [
  { value: "bug", label: "Bug" },
  { value: "feature", label: "Feature" },
  { value: "documentation", label: "Documentation" },
] as const;

export const taskSchema = z.object({
  id: z.string(),
  code: z.string().optional(),
  title: z.string(),
  status: z.enum(statuses.map(s => s.value) as [string, ...string[]]),
  label: z.enum(labels.map(l => l.value) as [string, ...string[]]),
  priority: z.enum(priorities.map(p => p.value) as [string, ...string[]]),
  due_date: z.coerce.date().optional(), // Added optional due_date with coerce.date()
});

export type TaskType = z.infer<typeof taskSchema>;
