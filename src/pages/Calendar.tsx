import React, { useState } from 'react';
import { Target } from 'lucide-react';
import CalendarView from '@/components/CalendarView';
import type { Habit } from './Index';

const Calendar = () => {
  // For now, using sample habits - in a real app, this would come from shared state or API
  const [habits] = useState<Habit[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                HabitFlow
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Dashboard
              </a>
              <span className="text-blue-600 font-semibold">Calendar</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <CalendarView habits={habits} />
      </div>
    </div>
  );
};

export default Calendar;