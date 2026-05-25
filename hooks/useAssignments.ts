'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Assignment } from '@/lib/assignments';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export function useAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef<Socket | null>(null);

  // Fetch all assignments from backend
  const fetchAssignments = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/assignments`);
      const mapped = response.data.map((item: any) => ({
        ...item,
        id: item._id || item.id,
      }));
      setAssignments(mapped);
    } catch (error) {
      console.error('Failed to fetch assignments:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch initially on mount
  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  // Initialize socket and listen to events on the client side
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const socket = io(API_BASE_URL);
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('generation-progress', ({ assignmentId, status }) => {
      console.log(`Generation progress for ${assignmentId}: ${status}`);
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === assignmentId || (a as any)._id === assignmentId
            ? { ...a, status: status === 'started' || status === 'generating_content' ? 'generating' : status }
            : a
        )
      );
    });

    socket.on('generation-completed', async ({ assignmentId }) => {
      console.log(`Generation completed for ${assignmentId}`);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/assignments/${assignmentId}`);
        const updated = {
          ...response.data,
          id: response.data._id || response.data.id,
        };
        setAssignments((prev) =>
          prev.map((a) => (a.id === assignmentId || (a as any)._id === assignmentId ? updated : a))
        );
      } catch (err) {
        console.error('Failed to fetch updated assignment:', err);
      }
    });

    socket.on('generation-failed', ({ assignmentId }) => {
      console.log(`Generation failed for ${assignmentId}`);
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === assignmentId || (a as any)._id === assignmentId ? { ...a, status: 'failed' } : a
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const getAssignment = useCallback((id: string) => {
    return assignments.find((a) => a.id === id || (a as any)._id === id);
  }, [assignments]);

  const createAssignment = useCallback(async (data: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/assignments`, data);
      const newAssignment = {
        ...response.data,
        id: response.data._id || response.data.id,
      };
      setAssignments((prev) => [newAssignment, ...prev]);
      return newAssignment;
    } catch (error) {
      console.error('Failed to create assignment:', error);
      throw error;
    }
  }, []);

  const updateAssignment = useCallback(async (id: string, data: Partial<Assignment>) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/api/assignments/${id}`, data);
      const updated = {
        ...response.data,
        id: response.data._id || response.data.id,
      };
      setAssignments((prev) =>
        prev.map((a) => (a.id === id || (a as any)._id === id ? updated : a))
      );
      return updated;
    } catch (error) {
      console.error('Failed to update assignment:', error);
      // Fallback update local state on failure
      setAssignments((prev) =>
        prev.map((a) => (a.id === id || (a as any)._id === id ? { ...a, ...data } : a))
      );
      throw error;
    }
  }, []);

  const deleteAssignment = useCallback(async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/assignments/${id}`);
      setAssignments((prev) => prev.filter((a) => a.id !== id && (a as any)._id !== id));
    } catch (error) {
      console.error('Failed to delete assignment:', error);
      throw error;
    }
  }, []);

  const getStats = useCallback(() => {
    return {
      total: assignments.length,
      upcoming: assignments.filter((a) => new Date(a.dueDate) > new Date()).length,
      overdue: assignments.filter((a) => new Date(a.dueDate) < new Date()).length,
    };
  }, [assignments]);

  return {
    assignments,
    loading,
    createAssignment,
    getAssignment,
    updateAssignment,
    deleteAssignment,
    getStats,
  };
}
