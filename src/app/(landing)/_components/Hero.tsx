import React from 'react';
import { ArrowRight, BarChart3, TrendingUp } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Master Your Trading
              <span className="block text-gray-700">Performance</span>
            </h1>
            <p className="text-xl text-gray-600 mt-6 leading-relaxed">
              The most comprehensive trading journal and analytics platform. Track, analyze, and improve your trading performance with advanced statistics and insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
              <button disabled className="bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-all duration-200 flex items-center justify-center group">
                14-Day Free Trial Coming Soon
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button disabled className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                Demo Coming Soon
              </button>
            </div>
            <div className="flex items-center justify-center lg:justify-start mt-8 space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gray-600 rounded-full mr-2"></div>
                No credit card required
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gray-600 rounded-full mr-2"></div>
                Setup in 2 minutes
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Trading Performance</h3>
                <TrendingUp className="h-6 w-6 text-gray-700" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Win Rate</span>
                  <span className="text-2xl font-bold text-gray-900">73.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Profit Factor</span>
                  <span className="text-2xl font-bold text-gray-900">2.4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Return</span>
                  <span className="text-2xl font-bold text-gray-900">+24.7%</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <BarChart3 className="h-5 w-5 text-gray-600" />
                    <span className="text-sm text-gray-600">Last 30 days</span>
                  </div>
                  <div className="h-20 bg-gradient-to-r from-gray-600 to-gray-800 rounded opacity-75"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;