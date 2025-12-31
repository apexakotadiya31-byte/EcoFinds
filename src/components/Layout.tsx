import React from 'react';
import type { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="mx-auto max-w-7xl px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} EcoFinds. Sustainable shopping made easy.</p>
        </div>
      </footer>
    </div>
  );
};
