import React from 'react';
import { TrendingUp, Target, Code, Lightbulb, CheckCircle, ArrowRight, Monitor } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Trader-First Approach',
      description: 'Every feature is designed from a trader\'s perspective. I understand the pain points because I\'ve experienced them firsthand.'
    },
    {
      icon: CheckCircle,
      title: 'Data-Driven Insights',
      description: 'I believe in the power of data to transform trading performance. The platform provides actionable insights, not just numbers.'
    },
    {
      icon: Code,
      title: 'Technical Excellence',
      description: 'Built with modern technologies and best practices to ensure reliability, speed, and scalability as we grow.'
    },
    {
      icon: Lightbulb,
      title: 'Continuous Innovation',
      description: 'Always pushing the boundaries of what\'s possible in trading analytics, with regular updates and new features.'
    }
  ];

  const milestones = [
    {
      year: '2024',
      title: 'Concept & Development',
      description: 'Started building Trade2Learn after years of frustration with existing trading journal solutions that lacked proper analytics.'
    },
    {
      year: '2024',
      title: 'MVP Development',
      description: 'Developed the core features including trade tracking, performance analytics, and journaling capabilities.'
    },
    {
      year: '2025',
      title: 'Beta Testing',
      description: 'Currently in beta phase, refining features and preparing for the official launch to serve traders worldwide.'
    },
    {
      year: '2025',
      title: 'Public Launch',
      description: 'Planning to launch publicly and onboard the first users who will help shape the future of the platform.'
    }
  ];

  return (
    <section id="about" className="container mx-auto flex flex-col items-center space-y-16 py-8 md:py-12 lg:py-24">
      {/* Hero Section */}
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          About Trade2Learn
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          A passion project born from the frustration of inadequate trading tools. Built by a trader, for traders who want to take their performance to the next level.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6" />
              My Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              To create the trading journal and analytics platform I always wished existed. After years of using spreadsheets and basic tools, I decided to build something that provides real insights and helps traders improve their performance systematically.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              My Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              To democratize professional-grade trading analytics and make them accessible to every trader. I envision Trade2Learn becoming the go-to platform where traders can track, analyze, and continuously improve their trading performance.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Founder Story */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
            My Story
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From frustrated trader to solution builder
          </p>
        </div>

        <div className="mx-auto max-w-[800px] space-y-6 text-muted-foreground">
          <p className="text-lg leading-relaxed">
            Hi, I'm the founder of Trade2Learn. Like many traders, I started my journey with basic tools and spreadsheets, constantly frustrated by the lack of proper analytics and insights. After years of manual tracking and analysis, I realized that the tools available just weren't cutting it.
          </p>
          <p className="text-lg leading-relaxed">
            As a software developer with a passion for trading, I decided to build the solution I always wanted. Trade2Learn combines my technical expertise with real trading experience to create a platform that actually helps traders improve their performance.
          </p>
          <p className="text-lg leading-relaxed">
            Currently in development, Trade2Learn is my attempt to solve the problems I faced as a trader. While we don't have customers yet, I'm working hard to create something that will genuinely help traders succeed in the markets.
          </p>
        </div>
      </div>

      {/* Platform Preview */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
            Platform Preview
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A glimpse into what Trade2Learn will offer
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Dashboard Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg border bg-muted overflow-hidden mb-4">
                <img 
                  src="/src/assets/Screenshot 2025-07-17 at 1.45.05 PM.png" 
                  alt="Trade2Learn Dashboard"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Clean, intuitive dashboard showing key performance metrics and recent trading activity at a glance.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Analytics View
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg border bg-muted overflow-hidden mb-4">
                <img 
                  src="/src/assets/Screenshot 2025-07-17 at 1.45.25 PM.png" 
                  alt="Trade2Learn Analytics"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Comprehensive analytics with detailed breakdowns of trading performance, win rates, and profit factors.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Trade Journal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg border bg-muted overflow-hidden mb-4">
                <img 
                  src="/src/assets/Screenshot 2025-07-17 at 1.45.34 PM.png" 
                  alt="Trade2Learn Journal"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Detailed trade logging with notes, screenshots, and analysis to help you learn from every trade.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Values */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
            Core Values
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The principles guiding Trade2Learn's development
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {values.map((value, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <value.icon className="h-6 w-6" />
                  </div>
                  {value.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Development Timeline */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
            Development Journey
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From concept to launch preparation
          </p>
        </div>

        <div className="mx-auto max-w-[800px] space-y-8">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted font-bold text-sm">
                  {milestone.year}
                </div>
                {index < milestones.length - 1 && (
                  <div className="mt-2 h-16 w-px bg-border"></div>
                )}
              </div>
              <div className="flex-1 space-y-2 pb-8">
                <h3 className="text-xl font-semibold">{milestone.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Status */}
      <div className="mx-auto max-w-[1000px] text-center space-y-6">
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>Current Status: Pre-Launch</CardTitle>
            <CardDescription>
              Trade2Learn is currently in development and preparing for beta testing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              I'm putting the finishing touches on the platform and would love to hear from traders who are interested in being early users. Your feedback will help shape the final product.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" disabled>
                Join the Waitlist (Coming Soon)
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button disabled variant="outline" size="lg">
                Provide Feedback (Coming Soon)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default About;