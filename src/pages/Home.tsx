import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import your auth hook
import { Button } from '../components/ui/Button';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Destructure the active user state

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="rounded-3xl bg-gradient-to-br from-green-800 to-green-700 px-6 py-16 text-center text-white shadow-xl sm:px-12 sm:py-24">
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Give Pre-Loved Items a <span className="text-green-300">New Life</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-green-100 sm:text-xl">
          Join the circular economy. Buy and sell second-hand treasures in a community that cares about the planet.
        </p>
        
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={() => navigate('/feed')}
            className="bg-white text-green-800 hover:bg-gray-100"
          >
            Start Browsing
          </Button>

          {/* Conditional Rendering: Only show Join Now if there is NO logged-in user */}
          {!user ? (
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/register')}
              className="border-white text-white hover:bg-white hover:text-green-800"
            >
              Join Now →
            </Button>
          ) : (
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="border-green-300 text-green-300 hover:bg-green-600 hover:text-white"
            >
              Go to Dashboard →
            </Button>
          )}
        </div>
      </div>

      {/* Rest of your landing page components (features, stats, etc.) */}
    </div>
  );
};