import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { User, Mail, Calendar, Edit2 } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">Please log in to view your dashboard.</p>
      </div>
    );
  }

  // Safe Date Resolution Utility
  const rawDate = user.joinedDate || (user as any).createdAt || (user as any).date;
  const parsedDate = rawDate ? new Date(rawDate) : new Date();
  
  // Guard against any remaining browser edge cases for Invalid Dates
  const isValidDate = !isNaN(parsedDate.getTime());
  const displayDate = isValidDate ? parsedDate.toLocaleDateString() : new Date().toLocaleDateString();
  const displayYear = isValidDate ? parsedDate.getFullYear() : new Date().getFullYear();

  // Generate initials for avatar fallback placeholder
  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>

      {/* Profile Card Header */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col items-center bg-gradient-to-r from-green-600 to-green-700 px-6 py-8 text-white sm:flex-row sm:gap-6">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-sm"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-pink-300 text-2xl font-bold text-gray-800 shadow-sm">
              {initials}
            </div>
          )}
          
          <div className="mt-4 text-center sm:mt-0 sm:text-left">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-sm text-green-100">Member since {displayYear}</p>
          </div>
        </div>

        {/* Profile Details Body */}
        <div className="p-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h3 className="text-lg font-medium text-gray-900">Profile Details</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="gap-1.5 text-green-700 hover:bg-green-50 hover:text-green-800"
            >
              <Edit2 className="h-4 w-4" /> Edit Profile
            </Button>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Full Name</p>
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email Address</p>
                <p className="text-sm font-medium text-gray-900">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Account Created</p>
                <p className="text-sm font-medium text-gray-900">Joined {displayDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};