import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { EditIcon, TrashIcon } from 'lucide-react';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

type ProjectStatus = 'planning' | 'in_progress' | 'on_hold' | 'completed';
type ProjectPriority = 'low' | 'medium' | 'high';

interface Project {
    id: number;
    clientName: string;
    projectName: string;
    description: string | null;
    status: ProjectStatus;
    priority: ProjectPriority;
    startDate: string;
    dueDate: string;
}

export default function Index() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    const [projectToDelete, setProjectToDelete] = useState<Project | null>(
        null,
    );
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [search]);

    useEffect(() => {
        setLoading(true);

        fetch(`/api/projects?search=${encodeURIComponent(debouncedSearch)}`)
            .then((response) => response.json())
            .then((data) => {
                setProjects(data.data);
            })
            .catch((error) => {
                console.error('Failed to fetch projects:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [debouncedSearch]);

    const handleDelete = async () => {
        if (!projectToDelete) {
            return;
        }

        setDeleting(true);

        try {
            const response = await fetch(
                `/api/projects/${projectToDelete.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                    },
                },
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete project.');
            }

            setProjects((current) =>
                current.filter((project) => project.id !== projectToDelete.id),
            );

            setProjectToDelete(null);

            toast.success('Project deleted successfully!', {
                duration: 3000,
                position: 'top-center',
            });
        } catch (error) {
            console.error('Failed to delete project:', error);

            toast.error('Failed to delete project.', {
                duration: 3000,
                position: 'top-center',
            });
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            <Head title="Projects" />

            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Projects</h1>

                        <p className="text-muted-foreground text-sm">
                            Manage and track client projects.
                        </p>
                    </div>

                    <Link
                        href="/projects/create"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium"
                    >
                        Add Project
                    </Link>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search projects..."
                        className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
                    />
                </div>

                {loading ? (
                    <p>Loading projects...</p>
                ) : (
                    <div className="overflow-hidden rounded-lg border">
                        <table className="w-full">
                            <thead className="bg-muted/50 border-b">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-medium">
                                        Project
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">
                                        Client
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">
                                        Priority
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">
                                        Start Date
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium">
                                        Due Date
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {projects.map((project) => (
                                    <tr
                                        key={project.id}
                                        className="border-b last:border-0 hover:bg-gray-50"
                                    >
                                        <td className="group flex items-center justify-between px-4 py-3">
                                            {project.projectName}
                                            <div className="flex items-center space-x-4">
                                                <Link
                                                    href={`/projects/${project.id}/edit`}
                                                    className="opacity-0 transition-opacity group-hover:opacity-100"
                                                >
                                                    <EditIcon size="16" />
                                                </Link>
                                                <button
                                                    type="button"
                                                    className="text-destructive cursor-pointer opacity-0 transition-opacity group-hover:opacity-100"
                                                    onClick={() =>
                                                        setProjectToDelete(
                                                            project,
                                                        )
                                                    }
                                                >
                                                    <TrashIcon size="16" />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            {project.clientName}
                                        </td>

                                        <td className="px-4 py-3">
                                            {project.status}
                                        </td>

                                        <td className="px-4 py-3">
                                            {project.priority}
                                        </td>

                                        <td className="px-4 py-3">
                                            {project.startDate}
                                        </td>

                                        <td className="px-4 py-3">
                                            {project.dueDate}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <Dialog
                    open={!!projectToDelete}
                    onOpenChange={(open) => {
                        if (!open && !deleting) {
                            setProjectToDelete(null);
                        }
                    }}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete project?</DialogTitle>

                            <DialogDescription>
                                Are you sure you want to delete{' '}
                                <strong>{projectToDelete?.projectName}</strong>?
                                This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>

                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setProjectToDelete(null)}
                                disabled={deleting}
                            >
                                Cancel
                            </Button>

                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                                disabled={deleting}
                            >
                                {deleting ? 'Deleting...' : 'Delete'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}
