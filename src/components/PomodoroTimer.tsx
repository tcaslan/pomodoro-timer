"use client";

import React, { useState, useEffect } from 'react';
import { Settings, Play, Pause, RotateCcw, Plus, Check, X, Volume2, VolumeX, ChevronDown, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const PomodoroTimer = () => {
        // Timer States
        const [mode, setMode] = useState('pomodoro');
        const [timeLeft, setTimeLeft] = useState({
          pomodoro: 25 * 60,
          shortBreak: 5 * 60,
          longBreak: 15 * 60
        });
        const [defaultTimes, setDefaultTimes] = useState({
          pomodoro: 25 * 60,
          shortBreak: 5 * 60,
          longBreak: 15 * 60
        });
        const [isRunning, setIsRunning] = useState(false);
        const [currentSession, setCurrentSession] = useState(1);
        const [soundEnabled, setSoundEnabled] = useState(true);
      
        // Tasks States
        const [tasks, setTasks] = useState([]);
        const [newTask, setNewTask] = useState('');
        const [currentTask, setCurrentTask] = useState(null);
      
        // Statistics States
        const [stats, setStats] = useState({
          completedPomodoros: 0,
          completedTasks: 0,
          totalFocusTime: 0,
        });
      
        // Helper Functions
        const formatTime = (seconds) => {
          const mins = Math.floor(seconds / 60);
          const secs = seconds % 60;
          return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        };
      
        const calculateProgress = () => {
          return ((defaultTimes[mode] - timeLeft[mode]) / defaultTimes[mode]) * 100;
        };
      
        const handleReset = () => {
          setTimeLeft(defaultTimes);
          setIsRunning(false);
        };
      
        const toggleTimer = () => {
          setIsRunning(!isRunning);
        };
      
        const addTask = () => {
          if (newTask.trim()) {
            setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
            setNewTask('');
          }
        };
      
        const toggleTask = (taskId) => {
          setTasks(tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ));
          if (!tasks.find(task => task.id === taskId).completed) {
            setStats(prev => ({
              ...prev,
              completedTasks: prev.completedTasks + 1
            }));
          }
        };
      
        const removeTask = (taskId) => {
          setTasks(tasks.filter(task => task.id !== taskId));
        };
      
        const playNotificationSound = () => {
          if (soundEnabled) {
            try {
              const audio = new Audio('/notification.mp3');
              audio.play().catch(error => console.log('Sound play failed:', error));
            } catch (error) {
              console.log('Sound creation failed:', error);
            }
          }
        };
      
        const handleSessionComplete = () => {
          playNotificationSound();
      
          if (mode === 'pomodoro') {
            setStats(prev => ({
              ...prev,
              completedPomodoros: prev.completedPomodoros + 1,
              totalFocusTime: prev.totalFocusTime + defaultTimes.pomodoro,
            }));
      
            if (currentSession % 4 === 0) {
              setMode('longBreak');
            } else {
              setMode('shortBreak');
            }
            setCurrentSession(prev => prev + 1);
          } else {
            setMode('pomodoro');
          }
      
          setTimeLeft(prev => ({
            ...prev,
            [mode]: defaultTimes[mode]
          }));
          setIsRunning(false);
        };
      
        useEffect(() => {
          let interval;
          if (isRunning && timeLeft[mode] > 0) {
            interval = setInterval(() => {
              setTimeLeft(prev => ({
                ...prev,
                [mode]: prev[mode] - 1
              }));
            }, 1000);
          } else if (timeLeft[mode] === 0) {
            handleSessionComplete();
          }
          return () => clearInterval(interval);
        }, [isRunning, timeLeft, mode]);
      

        
        // ... (return kısmı aynı kalacak)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-400 to-red-500 p-4">
      {/* Ana Timer Card - Bu kısım aynen kalacak */}
      <Card className="w-full max-w-2xl bg-white/10 backdrop-blur mb-8">
        <CardContent className="p-6">
          {/* Header Bölümü */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Online Pomodoro Timer - Be Focus!</h1>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? 
                  <Volume2 className="w-5 h-5 text-white" /> : 
                  <VolumeX className="w-5 h-5 text-white" />
                }
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="w-5 h-5 text-white" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Timer Settings</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="pomodoro">Pomodoro</Label>
                      <Input
                        id="pomodoro"
                        type="number"
                        value={defaultTimes.pomodoro / 60}
                        onChange={(e) => setDefaultTimes(prev => ({
                          ...prev,
                          pomodoro: parseInt(e.target.value) * 60
                        }))}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="shortBreak">Short Break</Label>
                      <Input
                        id="shortBreak"
                        type="number"
                        value={defaultTimes.shortBreak / 60}
                        onChange={(e) => setDefaultTimes(prev => ({
                          ...prev,
                          shortBreak: parseInt(e.target.value) * 60
                        }))}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="longBreak">Long Break</Label>
                      <Input
                        id="longBreak"
                        type="number"
                        value={defaultTimes.longBreak / 60}
                        onChange={(e) => setDefaultTimes(prev => ({
                          ...prev,
                          longBreak: parseInt(e.target.value) * 60
                        }))}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Timer Tabs */}
          <Tabs defaultValue="pomodoro" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger 
                value="pomodoro" 
                onClick={() => setMode('pomodoro')}
              >
                Pomodoro
              </TabsTrigger>
              <TabsTrigger 
                value="shortBreak" 
                onClick={() => setMode('shortBreak')}
              >
                Short Break
              </TabsTrigger>
              <TabsTrigger 
                value="longBreak" 
                onClick={() => setMode('longBreak')}
              >
                Long Break
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Timer Display */}
          <div className="text-center mb-8">
            <div className="text-8xl font-bold text-white mb-4">
              {formatTime(timeLeft[mode])}
            </div>
            <Progress value={calculateProgress()} className="mb-4" />
            <div className="flex justify-center gap-4">
              <Button 
                className="w-32 h-12 text-lg"
                onClick={toggleTimer}
              >
                {isRunning ? 
                  <Pause className="w-6 h-6 mr-2" /> : 
                  <Play className="w-6 h-6 mr-2" />
                }
                {isRunning ? 'PAUSE' : 'START'}
              </Button>
              <Button 
                variant="outline"
                size="icon"
                onClick={handleReset}
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Session Info */}
          <div className="text-center text-white mb-8">
            <div>#{currentSession}</div>
            <div>Time to focus!</div>
          </div>

          {/* Tasks Section */}
          <div className="bg-white/5 rounded-lg p-4 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Tasks</h2>
            <div className="flex gap-2 mb-4">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="What are you working on?"
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
              />
              <Button onClick={addTask}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {tasks.map(task => (
                <div key={task.id} className="flex items-center gap-2 bg-white/5 p-2 rounded">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleTask(task.id)}
                  >
                    <Check className={`w-4 h-4 ${task.completed ? 'text-green-500' : 'text-gray-400'}`} />
                  </Button>
                  <span className={`flex-1 text-white ${task.completed ? 'line-through' : ''}`}>
                    {task.text}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTask(task.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white/5 rounded-lg p-4">
            <h2 className="text-xl font-bold text-white mb-4">Statistics</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/5 p-4 rounded-lg">
                <div className="text-2xl font-bold text-white">{stats.completedPomodoros}</div>
                <div className="text-sm text-white/70">Pomodoros</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <div className="text-2xl font-bold text-white">{stats.completedTasks}</div>
                <div className="text-sm text-white/70">Tasks</div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <div className="text-2xl font-bold text-white">
                  {Math.floor(stats.totalFocusTime / 3600)}h {Math.floor((stats.totalFocusTime % 3600) / 60)}m
                </div>
                <div className="text-sm text-white/70">Focus Time</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Accordion - Timer altında */}
      <div className="w-full max-w-2xl">
        <Accordion type="single" collapsible className="mb-4">
          <AccordionItem value="about" className="border-none">
            <AccordionTrigger className="text-white hover:bg-white/10 rounded-lg px-4 py-2 hover:no-underline">
              <div className="flex items-center">
                <Info className="w-4 h-4 mr-2" />
                Learn About Pomodoro Technique
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <Card className="bg-white/10 backdrop-blur">
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold text-white mb-3">
                    How to Maximize Your Focus
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90">
                    <div>
                      <h3 className="font-medium mb-2">Time Blocking Strategy:</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>25 minutes focused work</li>
                        <li>5 minutes short break</li>
                        <li>15-30 minutes long break after 4 sessions</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Scientific Benefits:</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Enhanced focus and concentration</li>
                        <li>Reduced mental fatigue</li>
                        <li>Improved work-life balance</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur">
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold text-white mb-3">
                    Success Tips
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90">
                    <div>
                      <h3 className="font-medium mb-2">Best Practices:</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Start with your most important task</li>
                        <li>Remove distractions during focus time</li>
                        <li>Use breaks for physical movement</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">User Success Stories:</h3>
                      <div className="text-sm italic space-y-2">
                        <p>"40% productivity boost in 2 weeks!"</p>
                        <p>"Finally found work-life balance."</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default PomodoroTimer;