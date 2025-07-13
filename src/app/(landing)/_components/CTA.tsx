import React from 'react';
import { ArrowRight, Shield } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Trading Performance?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of successful traders who have improved their performance with Trade2Learn. 
            Start your free trial today and see the difference professional analytics can make.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button disabled className="bg-white text-gray-900 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center group font-semibold">
              Free Trial Coming Soon
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button disabled className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-200 font-semibold">
              Demo Coming Soon
            </button>
          </div>

          <div className="flex items-center justify-center space-x-6 text-gray-300">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;