"use client";

import { useState } from 'react';
import PomodoroTimer from './PomodoroTimer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const LandingPage = () => {
  const [showTimer, setShowTimer] = useState(false);

  const scrollToTimer = () => {
    setShowTimer(true);
    setTimeout(() => {
      document.getElementById('timer-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-400 to-red-600">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-white">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
          Pomodoro Timer | Boost Your Productivity
        </h1>
        <p className="text-xl text-center mb-8 opacity-90">
          Transform your work habits with the scientifically-proven Pomodoro Technique
        </p>
        <div className="flex justify-center mb-12">
          <Button
            size="lg"
            className="bg-white text-red-500 hover:bg-red-100 text-lg px-8"
            onClick={scrollToTimer}
          >
            Start Now
          </Button>
        </div>
        <div className="flex justify-center animate-bounce">
          <ChevronDown size={32} />
        </div>
      </div>

      {/* How to Maximize Section */}
      <section className="bg-white/10 backdrop-blur py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            How to Maximize Your Focus with Pomodoro Technique
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-white/20 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Benefits of Time Management with Pomodoro Method
                </h3>
                <ul className="space-y-3 text-white/90">
                  <li>• Increased focus and concentration</li>
                  <li>• Reduced mental fatigue</li>
                  <li>• Better work-life balance</li>
                  <li>• Enhanced productivity tracking</li>
                  <li>• Improved task estimation</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-white/20 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Scientific Research Behind Pomodoro Technique
                </h3>
                <p className="text-white/90 mb-4">
                  Studies show that our brains naturally work in focused sprints. The Pomodoro 
                  Technique aligns with our cognitive cycles, allowing for:
                </p>
                <ul className="space-y-2 text-white/90">
                  <li>• Optimal attention spans (25 minutes)</li>
                  <li>• Natural recovery periods</li>
                  <li>• Reduced decision fatigue</li>
                  <li>• Enhanced learning retention</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Productivity Journey Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Start Your Productivity Journey Today
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-white/20 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Effective Time Blocking Strategies
                </h3>
                <div className="space-y-4 text-white/90">
                  <p>1. Identify your most important tasks</p>
                  <p>2. Schedule focused work blocks</p>
                  <p>3. Take regular breaks</p>
                  <p>4. Track your progress</p>
                  <p>5. Adjust and optimize your schedule</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/20 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Work-Break Balance for Peak Performance
                </h3>
                <div className="space-y-4 text-white/90">
                  <p><strong>25 minutes</strong> - Focused work session</p>
                  <p><strong>5 minutes</strong> - Short break</p>
                  <p><strong>15-30 minutes</strong> - Long break after 4 sessions</p>
                  <p><strong>Result:</strong> Sustainable productivity without burnout</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Progress Tracking Section */}
      <section className="bg-white/10 backdrop-blur py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Track Your Progress & Success Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-white/20 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Productivity Analytics & Insights
                </h3>
                <div className="space-y-3 text-white/90">
                  <p>• Daily focus time tracking</p>
                  <p>• Task completion analytics</p>
                  <p>• Productivity trends</p>
                  <p>• Custom goal setting</p>
                  <p>• Performance reports</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/20 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Success Stories from Pomodoro Users
                </h3>
                <div className="space-y-4 text-white/90">
                  <blockquote className="italic">
                    "Increased my productivity by 40% in just two weeks!"
                    <footer className="text-sm mt-2">- Sarah K., Software Developer</footer>
                  </blockquote>
                  <blockquote className="italic">
                    "Finally found a way to maintain focus without burning out."
                    <footer className="text-sm mt-2">- Mark R., Content Writer</footer>
                  </blockquote>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timer Section */}
      <section id="timer-section" className="py-16">
        <div className="container mx-auto px-4">
          {showTimer ? (
            <PomodoroTimer />
          ) : (
            <div className="text-center">
              <Button
                size="lg"
                className="bg-white text-red-500 hover:bg-red-100 text-lg px-8"
                onClick={() => setShowTimer(true)}
              >
                Launch Timer
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/10 backdrop-blur py-8">
        <div className="container mx-auto px-4 text-center text-white/70">
          <p>© 2024 Pomodoro Timer. All rights reserved.</p>
          <p className="mt-2">Maximize your productivity with science-backed time management.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;