'use client';

import { useState } from 'react';
import { Search, Filter, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const assignments = [
  { id: 1, title: 'Quiz on Electricity', assignedOn: '20-06-2025', dueDate: '21-06-2025' },
  { id: 2, title: 'Quiz on Electricity', assignedOn: '20-06-2025', dueDate: '21-06-2025' },
  { id: 3, title: 'Quiz on Electricity', assignedOn: '20-06-2025', dueDate: '21-06-2025' },
  { id: 4, title: 'Quiz on Electricity', assignedOn: '20-06-2025', dueDate: '21-06-2025' },
  { id: 5, title: 'Quiz on Electricity', assignedOn: '20-06-2025', dueDate: '21-06-2025' },
  { id: 6, title: 'Quiz on Electricity', assignedOn: '20-06-2025', dueDate: '21-06-2025' },
];

export function AssignmentsList() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Assignments</h1>
        <p className="text-muted-foreground">Manage and create assignments for your classes.</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={20} />
          <span>Filter By</span>
        </Button>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
          <Input
            placeholder="Search Assignment"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary"
          />
        </div>
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-foreground">{assignment.title}</h3>
              <Button variant="ghost" size="icon">
                <MoreVertical size={20} className="text-muted-foreground" />
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-foreground">
                <span className="font-semibold">Assigned on</span> : {assignment.assignedOn}
              </p>
              <p className="text-foreground">
                <span className="font-semibold">Due</span> : {assignment.dueDate}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Assignment Button for Desktop */}
      <div className="flex justify-center">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-full font-semibold">
          + Create Assignment
        </Button>
      </div>
    </div>
  );
}
