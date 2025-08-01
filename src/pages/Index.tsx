
import React, { useState } from 'react';
import { Plus, Calendar, BarChart3, Target, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import HabitCard from '@/components/HabitCard';
import HabitForm from '@/components/HabitForm';
import Statistics from '@/components/Statistics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface Habit {
  id: string;
  name: string;
  description: string;
  color: string;
  streak: number;
  completedToday: boolean;
  completionHistory: { date: string; completed: boolean }[];
  createdAt: string;
  daysOfWeek: number[]; // 0-6 (Sunday-Saturday)
}

const Index = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  const [isAddingHabit, setIsAddingHabit] = useState(false);

  const addHabit = (newHabit: Omit<Habit, 'id' | 'streak' | 'completedToday' | 'completionHistory' | 'createdAt'>) => {
    const habit: Habit = {
      ...newHabit,
      id: Date.now().toString(),
      streak: 0,
      completedToday: false,
      completionHistory: [],
      createdAt: new Date().toISOString().split('T')[0]
    };
    setHabits([...habits, habit]);
    setIsAddingHabit(false);
  };

  // Filter habits for today
  const today = new Date().getDay();
  const todaysHabits = habits.filter(habit => habit.daysOfWeek.includes(today));

  const toggleHabit = (id: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const newCompletedToday = !habit.completedToday;
        return {
          ...habit,
          completedToday: newCompletedToday,
          streak: newCompletedToday ? habit.streak + 1 : Math.max(0, habit.streak - 1)
        };
      }
      return habit;
    }));
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0);
  const completedToday = todaysHabits.filter(habit => habit.completedToday).length;

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
              <div className="hidden md:flex items-center gap-6">
                <span className="text-blue-600 font-semibold">Dashboard</span>
                <a href="/calendar" className="text-gray-600 hover:text-blue-600 transition-colors">Calendar</a>
                <span className="text-sm text-gray-600">Total Streak: <span className="font-semibold text-blue-600">{totalStreak}</span></span>
                <span className="text-sm text-gray-600">Today: <span className="font-semibold text-green-600">{completedToday}/{todaysHabits.length}</span></span>
              </div>
              <Dialog open={isAddingHabit} onOpenChange={setIsAddingHabit}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Habit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <HabitForm onSubmit={addHabit} onCancel={() => setIsAddingHabit(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-full">
                <Flame className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Streak</p>
                <p className="text-2xl font-bold text-gray-900">{totalStreak}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-full">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Completed Today</p>
                <p className="text-2xl font-bold text-gray-900">{completedToday}/{todaysHabits.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-full">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Today's Habits</p>
                <p className="text-2xl font-bold text-gray-900">{todaysHabits.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white rounded-xl shadow-sm">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Statistics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Your Habits</h2>
              <Dialog open={isAddingHabit} onOpenChange={setIsAddingHabit}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-xl px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Habit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <HabitForm onSubmit={addHabit} onCancel={() => setIsAddingHabit(false)} />
                </DialogContent>
              </Dialog>
            </div>

            {todaysHabits.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100">
                <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No habits for today</h3>
                <p className="text-gray-600 mb-6">{habits.length === 0 ? 'Start building better habits today!' : 'No habits scheduled for today. Add one or check your existing habit schedules.'}</p>
                <Button 
                  onClick={() => setIsAddingHabit(true)}
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-xl"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Habit
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {todaysHabits.map((habit, index) => (
                  <div 
                    key={habit.id} 
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <HabitCard 
                      habit={habit} 
                      onToggle={toggleHabit}
                      onDelete={deleteHabit}
                    />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="statistics" className="animate-fade-in">
            <Statistics habits={habits} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
