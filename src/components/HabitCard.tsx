
import React from 'react';
import { Check, Trash2, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProgressRing from './ProgressRing';
import type { Habit } from '@/pages/Index';

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle, onDelete }) => {
  const progress = habit.completedToday ? 100 : 0;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border border-gray-100 rounded-2xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${habit.color}`} />
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{habit.name}</h3>
              <p className="text-gray-600 text-sm">{habit.description}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(habit.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="text-lg font-bold text-gray-900">{habit.streak}</span>
            <span className="text-gray-600 text-sm">day streak</span>
          </div>
          <ProgressRing progress={progress} size={40} strokeWidth={4} />
        </div>

        <Button
          onClick={() => onToggle(habit.id)}
          className={`w-full rounded-xl py-3 font-medium transition-all duration-300 ${
            habit.completedToday
              ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
          }`}
        >
          <Check className={`h-4 w-4 mr-2 ${habit.completedToday ? 'text-white' : 'text-gray-500'}`} />
          {habit.completedToday ? 'Completed!' : 'Mark Complete'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default HabitCard;
