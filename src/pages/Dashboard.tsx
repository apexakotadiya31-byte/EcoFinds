import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { User as UserIcon, Mail, Calendar } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email });
    setIsEditing(false);
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-8 text-2xl font-bold text-gray-900">User Dashboard</h1>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-gray-200">
        <div className="bg-green-600 px-6 py-8 text-center">
          <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-white shadow-md">
            <img
              src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.name}`}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          </div>
          <h2 className="mt-4 text-xl font-bold text-white">{user.name}</h2>
          <p className="text-green-100">Member since {new Date(user.joinedDate).getFullYear()}</p>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Profile Details</h3>
            {!isEditing && (
              <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>

          {message && (
            <div className="mb-6 rounded-md bg-green-50 p-4 text-sm text-green-700">
              {message}
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="flex gap-4 pt-2">
                <Button type="submit">Save Changes</Button>
                <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <UserIcon className="h-5 w-5 text-gray-400" />
                <span className="font-medium text-gray-900">{user.name}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="h-5 w-5 text-gray-400" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
