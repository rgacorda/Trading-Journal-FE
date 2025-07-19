import React from 'react';
import { TrendingUp, Users, BarChart, DollarSign } from 'lucide-react';

const Statistics = () => {
  const stats = [
    {
      icon: Users,
      value: '100+',
      label: 'Active Traders',
      description: 'Professional traders trust Trade2Learn'
    },
    {
      icon: BarChart,
      value: '250k+',
      label: 'Trades Analyzed',
      description: 'Trades tracked and analyzed monthly'
    },
    {
      icon: TrendingUp,
      value: '17%',
      label: 'Average Improvement',
      description: 'Win rate improvement in first 3 months'
    },
    {
      icon: DollarSign,
      value: '$1.2M+',
      label: 'Portfolio Value',
      description: 'Total portfolio value managed'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Traders Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of traders who have improved their performance using Trade2Learn&apos;s advanced analytics and journaling tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300 mb-4">
                <stat.icon className="h-8 w-8 text-gray-700 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-2">
                {stat.label}
              </div>
              <div className="text-gray-600 text-sm">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;