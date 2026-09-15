import { Head, Link } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

type ProjectStatus = 'planning' | 'in_progress' | 'on_hold' | 'completed';
type ProjectPriority = 'low' | 'medium' | 'high';

export default function Create() {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!form.clientName.trim()) {
            newErrors.clientName = 'Client name is required.';
        }

        if (!form.projectName.trim()) {
            newErrors.projectName = 'Project name is required.';
        }

        if (!form.status) {
            newErrors.status = 'Status is required.';
        }

        if (!form.priority) {
            newErrors.priority = 'Priority is required.';
        }

        if (!form.startDate) {
            newErrors.startDate = 'Start date is required.';
        }

        if (!form.dueDate) {
            newErrors.dueDate = 'Due date is required.';
        }

        if (form.startDate && form.dueDate && form.dueDate < form.startDate) {
            newErrors.dueDate =
                'Due date cannot be earlier than the start date.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    const [form, setForm] = useState({
        clientName: '',
        projectName: '',
        description: '',
        status: 'planning' as ProjectStatus,
        priority: 'medium' as ProjectPriority,
        startDate: '',
        dueDate: '',
    });

    const handleChange = (field: keyof typeof form, value: string) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validate()) {
            return;
        }
        setSubmitting(true);
        console.log(form);
        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    client_name: form.clientName,
                    project_name: form.projectName,
                    description: form.description || null,
                    status: form.status,
                    priority: form.priority,
                    start_date: form.startDate,
                    due_date: form.dueDate,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 422) {
                    const validationErrors: Record<string, string> = {};

                    Object.entries(data.errors ?? {}).forEach(
                        ([field, messages]) => {
                            validationErrors[field] = (messages as string[])[0];
                        },
                    );

                    setErrors(validationErrors);
                    return;
                }

                throw new Error(data.message || 'Failed to create project.');
            }

            toast.success('Action completed successfully!', {
                duration: 3000,
                position: 'top-center',
            });

            setForm({
                clientName: '',
                projectName: '',
                description: '',
                status: 'planning',
                priority: 'medium',
                startDate: '',
                dueDate: '',
            });

            setErrors({});
        } catch (error) {
            console.error('Failed to create project:', error);
            toast.error('Failed to create project!', {
                duration: 3000,
                position: 'top-center',
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Head title="Add Project" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold">Add Project</h1>

                    <p className="text-muted-foreground text-sm">
                        Create a new client project.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
                    {/* Client Name */}
                    <div className="space-y-2">
                        <label
                            htmlFor="clientName"
                            className="text-sm font-medium"
                        >
                            Client Name
                        </label>

                        <input
                            id="clientName"
                            type="text"
                            value={form.clientName}
                            onChange={(event) =>
                                handleChange('clientName', event.target.value)
                            }
                            className="w-full rounded-md border px-3 py-2 text-sm"
                            placeholder="Enter client name"
                        />
                        {errors.clientName && (
                            <p className="text-destructive text-sm">
                                {errors.clientName}
                            </p>
                        )}
                    </div>

                    {/* Project Name */}
                    <div className="space-y-2">
                        <label
                            htmlFor="projectName"
                            className="text-sm font-medium"
                        >
                            Project Name
                        </label>

                        <input
                            id="projectName"
                            type="text"
                            value={form.projectName}
                            onChange={(event) =>
                                handleChange('projectName', event.target.value)
                            }
                            className="w-full rounded-md border px-3 py-2 text-sm"
                            placeholder="Enter project name"
                        />
                        {errors.projectName && (
                            <p className="text-destructive text-sm">
                                {errors.projectName}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label
                            htmlFor="description"
                            className="text-sm font-medium"
                        >
                            Description
                        </label>

                        <textarea
                            id="description"
                            value={form.description}
                            onChange={(event) =>
                                handleChange('description', event.target.value)
                            }
                            className="min-h-32 w-full rounded-md border px-3 py-2 text-sm"
                            placeholder="Enter project description"
                        />
                        {errors.description && (
                            <p className="text-destructive text-sm">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* Status & Priority */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label
                                htmlFor="status"
                                className="text-sm font-medium"
                            >
                                Status
                            </label>

                            <select
                                id="status"
                                value={form.status}
                                onChange={(event) =>
                                    handleChange('status', event.target.value)
                                }
                                className="w-full rounded-md border px-3 py-2 text-sm"
                            >
                                <option value="planning">Planning</option>

                                <option value="in_progress">In Progress</option>

                                <option value="on_hold">On Hold</option>

                                <option value="completed">Completed</option>
                            </select>
                            {errors.status && (
                                <p className="text-destructive text-sm">
                                    {errors.status}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="priority"
                                className="text-sm font-medium"
                            >
                                Priority
                            </label>

                            <select
                                id="priority"
                                value={form.priority}
                                onChange={(event) =>
                                    handleChange('priority', event.target.value)
                                }
                                className="w-full rounded-md border px-3 py-2 text-sm"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            {errors.priority && (
                                <p className="text-destructive text-sm">
                                    {errors.priority}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label
                                htmlFor="startDate"
                                className="text-sm font-medium"
                            >
                                Start Date
                            </label>

                            <input
                                id="startDate"
                                type="date"
                                value={form.startDate}
                                onChange={(event) =>
                                    handleChange(
                                        'startDate',
                                        event.target.value,
                                    )
                                }
                                className="w-full rounded-md border px-3 py-2 text-sm"
                            />
                            {errors.startDate && (
                                <p className="text-destructive text-sm">
                                    {errors.startDate}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="dueDate"
                                className="text-sm font-medium"
                            >
                                Due Date
                            </label>

                            <input
                                id="dueDate"
                                type="date"
                                value={form.dueDate}
                                onChange={(event) =>
                                    handleChange('dueDate', event.target.value)
                                }
                                className="w-full rounded-md border px-3 py-2 text-sm"
                            />
                            {errors.dueDate && (
                                <p className="text-destructive text-sm">
                                    {errors.dueDate}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Link
                            href="/projects"
                            className="rounded-md border px-4 py-2 text-sm font-medium"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium"
                        >
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
