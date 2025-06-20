
import React from 'react';
import { TrendingUp, Calendar, Target, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProgressRing from './ProgressRing';
import type { Habit } from '@/pages/Index';

interface StatisticsProps {
  habits: Habit[];
}

const Statistics: React.FC<StatisticsProps> = ({ habits }) => {
  const totalHabits = habits.length;
  const completedToday = habits.filter(habit => habit.completedToday).length;
  const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0);
  const longestStreak = Math.max(...habits.map(habit => habit.streak), 0);
  const completionRate = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;

  const getMotivationalMessage = () => {
    if (completionRate === 100) return "Perfect day! You're on fire! 🔥";
    if (completionRate >= 75) return "Great progress! Keep it up! 💪";
    if (completionRate >= 50) return "You're doing well! Don't stop now! 🌟";
    if (completionRate >= 25) return "Good start! You can do more! 🚀";
    return "Every journey starts with a single step! 🌱";
  };

  return (
    <div className="space-y-6">
      {/* Motivational Header */}
      <Card className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-2xl shadow-lg">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Your Progress Today</h2>
          <p className="text-lg opacity-90">{getMotivationalMessage()}</p>
          <div className="mt-6 flex justify-center">
            <ProgressRing 
              progress={completionRate} 
              size={80} 
              strokeWidth={6}
              className="text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-full">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Habits</p>
                <p className="text-2xl font-bold text-gray-900">{totalHabits}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Completed Today</p>
                <p className="text-2xl font-bold text-gray-900">{completedToday}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Streak</p>
                <p className="text-2xl font-bold text-gray-900">{totalStreak}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-full">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Longest Streak</p>
                <p className="text-2xl font-bold text-gray-900">{longestStreak}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Individual Habit Stats */}
      <Card className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Habit Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {habits.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No habits to analyze yet. Start by adding your first habit!
              </p>
            ) : (
              habits
                .sort((a, b) => b.streak - a.streak)
                .map(habit => (
                  <div key={habit.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${habit.color}`} />
                      <div>
                        <h4 className="font-medium text-gray-900">{habit.name}</h4>
                        <p className="text-sm text-gray-600">{habit.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{habit.streak}</p>
                      <p className="text-sm text-gray-600">day streak</p>
                    </div>
                  </div>
                ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;
