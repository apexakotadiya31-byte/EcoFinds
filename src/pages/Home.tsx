import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowRight, Leaf, RefreshCw, ShieldCheck } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-green-900 px-6 py-24 text-center shadow-xl sm:px-12 lg:px-16">
        <div className="relative z-10 mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Give Pre-Loved Items a <span className="text-green-300">New Life</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-green-100">
            Join the circular economy. Buy and sell second-hand treasures in a community that cares about the planet.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link to="/feed">
              <Button size="lg" className="bg-white text-green-900 hover:bg-green-50">
                Start Browsing
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-green-300 text-green-100 hover:bg-green-800 hover:text-white">
                Join Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute -left-12 -top-12 h-64 w-64 rounded-full bg-green-800 opacity-50 blur-3xl"></div>
        <div className="absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-emerald-800 opacity-50 blur-3xl"></div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
              <Leaf className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">Eco-Friendly</h3>
            <p className="text-gray-600">Reduce waste by extending the lifecycle of quality products.</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
              <RefreshCw className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">Circular Economy</h3>
            <p className="text-gray-600">Buy what you need, sell what you don't. Keep goods in circulation.</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">Trusted Community</h3>
            <p className="text-gray-600">Connect with verified buyers and sellers in a safe environment.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
