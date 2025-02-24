import React, { useState } from 'react';
    import { X } from 'lucide-react';
    import { useAuth } from '../../contexts/AuthContext';

    interface AuthModalProps {
      isOpen: boolean;
      onClose: () => void;
      onSuccess?: () => void;
    }

    export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
      const [isSignUp, setIsSignUp] = useState(false);
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [username, setUsername] = useState(''); // Add username state
      const [error, setError] = useState('');
      const [loading, setLoading] = useState(false);

      const { signIn, signUp, signInWithGoogle } = useAuth();

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
          if (isSignUp) {
            await signUp(email, password, username); // Pass username to signUp
          } else {
            await signIn(email, password);
          }
          onSuccess?.();
          onClose();
        } catch (err) {
          setError('Failed to ' + (isSignUp ? 'sign up' : 'sign in'));
        }

        setLoading(false);
      };

      const handleGoogleSignIn = async () => {
        try {
          await signInWithGoogle();
          onSuccess?.();
          onClose();
        } catch (err) {
          setError('Failed to sign in with Google');
        }
      };

      if (!isOpen) return null;

      return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

            <div className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 px-8 py-6 shadow-xl transition-all w-full max-w-md">
              <div className="absolute right-4 top-4">
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {isSignUp ? 'Create your account' : 'Welcome back'}
                </h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {isSignUp
                    ? 'Join LazyOwner to start buying or selling digital assets'
                    : 'Sign in to continue to LazyOwner'}
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && ( // Only show username field during signup
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700"
                      placeholder="Choose a username"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700"
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">Or continue with</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  <div className="flex items-center justify-center">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-5 w-5 mr-2" />
                    <span>Google</span>
                  </div>
                </button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                </span>
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="ml-1 text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };
