
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Habit } from '@/pages/Index';

interface CalendarViewProps {
  habits: Habit[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ habits }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6">
      <Card className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-semibold text-gray-900">
              {formatMonth(currentDate)}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('prev')}
                className="rounded-lg"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('next')}
                className="rounded-lg"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {/* Week day headers */}
            {weekDays.map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {days.map((day, index) => (
              <div
                key={index}
                className={`p-2 h-12 flex items-center justify-center text-sm rounded-lg transition-colors ${
                  day
                    ? `border border-gray-100 ${
                        isToday(day)
                          ? 'bg-blue-100 border-blue-300 text-blue-700 font-semibold'
                          : 'hover:bg-gray-50'
                      }`
                    : ''
                }`}
              >
                {day && (
                  <span className="relative">
                    {day.getDate()}
                    {/* Small dots for habits completed on this day */}
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                      {habits.slice(0, 3).map((habit, habitIndex) => (
                        <div
                          key={habitIndex}
                          className={`w-1 h-1 rounded-full ${habit.color.replace('bg-', 'bg-')}`}
                        />
                      ))}
                    </div>
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Habit Legend */}
      <Card className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Habit Legend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {habits.map(habit => (
              <div key={habit.id} className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${habit.color}`} />
                <span className="text-gray-700">{habit.name}</span>
                <span className="text-sm text-gray-500">({habit.streak} day streak)</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarView;
