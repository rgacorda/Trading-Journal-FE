import React from 'react';
import { BarChart3, Target, BookOpen, Shield, Users, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive performance metrics, risk analysis, and detailed trade breakdowns to identify patterns and improve your strategy.',
      color: 'text-gray-700'
    },
    {
      icon: Target,
      title: 'Trade Tracking',
      description: 'Log every trade with detailed entry/exit points, stop losses, and profit targets. Import data from major brokers automatically.',
      color: 'text-gray-700'
    },
    {
      icon: BookOpen,
      title: 'Journal & Notes',
      description: 'Document your trading psychology, market observations, and lessons learned. Build a comprehensive trading knowledge base.',
      color: 'text-gray-700'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Monitor position sizing, portfolio exposure, and risk-reward ratios. Set alerts for risk thresholds and drawdown limits.',
      color: 'text-gray-700'
    },
    {
      icon: Users,
      title: 'Community Insights',
      description: 'Connect with other traders, share strategies, and learn from successful trading patterns in our community.',
      color: 'text-gray-700'
    },
    {
      icon: Zap,
      title: 'Real-time Sync',
      description: 'Automatic synchronization across all devices. Access your trading data anywhere, anytime with real-time updates.',
      color: 'text-gray-700'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive tools designed by traders, for traders. Track your progress, analyze your performance, and accelerate your learning curve.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300 mb-4`}>
                <feature.icon className={`h-6 w-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;