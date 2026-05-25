'use client';

import { useAssignments } from '@/hooks/useAssignments';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatsWidget } from '@/components/statistics/stats-widget';
import { ArrowRight, Calendar, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { formatDate, getAssignmentStatus, getDaysUntilDue } from '@/lib/assignments';

export default function HomePage() {
  const { assignments, getStats } = useAssignments();
  const stats = getStats();

  // Get upcoming assignments (next 7 days)
  const upcomingAssignments = assignments
    .filter((a) => {
      const daysUntil = getDaysUntilDue(a.dueDate);
      return daysUntil >= 0 && daysUntil <= 7;
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  // Get overdue assignments
  const overdueAssignments = assignments
    .filter((a) => getDaysUntilDue(a.dueDate) < 0)
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to VedaAI</h1>
        <p className="text-muted-foreground">Manage your assignments and track student progress</p>
      </div>

      {/* Stats */}
      <StatsWidget
        total={stats.total}
        upcoming={stats.upcoming}
        completed={stats.total - stats.upcoming}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Upcoming Assignments</span>
              <Link href="/assignments">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingAssignments.length > 0 ? (
              <div className="space-y-3">
                {upcomingAssignments.map((assignment) => {
                  const status = getAssignmentStatus(assignment.dueDate);
                  const daysUntil = getDaysUntilDue(assignment.dueDate);
                  const statusColor =
                    status === 'overdue'
                      ? 'text-red-600'
                      : status === 'due-soon'
                        ? 'text-orange-600'
                        : 'text-green-600';

                  return (
                    <Link key={assignment.id} href={`/assignments/${assignment.id}`}>
                      <div className="p-3 rounded-lg hover:bg-accent/5 transition-colors cursor-pointer border border-border">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-sm">{assignment.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {assignment.subject} • {assignment.className}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className={`text-xs font-semibold ${statusColor}`}>
                              {daysUntil} days left
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatDate(assignment.dueDate)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">
                No upcoming assignments
              </p>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/create-assignment" className="block">
              <Button className="w-full justify-start bg-accent hover:bg-accent/90">
                Create New Assignment
              </Button>
            </Link>
            <Link href="/ai-toolkit" className="block">
              <Button variant="outline" className="w-full justify-start">
                Use AI Tools
              </Button>
            </Link>
            <Link href="/library" className="block">
              <Button variant="outline" className="w-full justify-start">
                Manage Resources
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Alert */}
      {overdueAssignments.length > 0 && (
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-5 h-5" />
              Overdue Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {overdueAssignments.map((assignment) => (
                <Link key={assignment.id} href={`/assignments/${assignment.id}`}>
                  <div className="p-2 rounded hover:bg-destructive/10 transition-colors cursor-pointer text-sm">
                    <p className="font-semibold">{assignment.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Due: {formatDate(assignment.dueDate)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
