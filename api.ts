import type { Task } from './types';

const API_URL = 'http://localhost:8080';

export async function fetchTasks(): Promise<Task[]> {
    const response = await fetch(`${API_URL}/tasks`);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return await response.json();
}

export async function createTask(content: string): Promise<number> {
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
    });
    if (!response.ok) throw new Error('Failed to create task');
    const data = await response.json();
    return data.id;
}

export async function updateTask(id: number, content: string, done: number): Promise<void> {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, done }),
    });
    if (!response.ok) throw new Error('Failed to update task');
}

export async function deleteTask(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
}
