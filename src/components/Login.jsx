import React, { useState } from 'react';
// import { supabase } from '../supabase'; // Commented out Supabase import
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isSignUp, setIsSignUp] = useState(false); // No longer needed
  const [loading, setLoading] = useState(false); // Keep for UI feedback if desired
  const [error, setError] = useState(null); // Keep for potential non-auth errors
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // --- DEMO MODE: Bypass Supabase Auth --- 
    console.log('Bypassing login for demo mode.');
    navigate('/dashboard');
    setLoading(false);
    // --- END DEMO MODE ---

    /* // Original Supabase Auth Logic - Commented Out
    try {
      let response;
      if (isSignUp) {
        response = await supabase.auth.signUp({
          email,
          password,
        });
      } else {
        response = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      }

      if (response.error) throw response.error;

      // Check if session exists after successful login/signup
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      } else if (isSignUp) {
        // For sign up, Supabase might require email verification depending on settings
        alert('Sign up successful! Please check your email for verification.');
        setIsSignUp(false); // Switch back to login view
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError(error.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
    */
  };

  return (
    <div>
      {/* <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2> // Title can be simplified */}
      <h2>Demo Login</h2>
      <form onSubmit={handleAuth}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required // Not strictly required for demo
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required // Not strictly required for demo
            disabled={loading}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {/* {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Login')} */}
          {loading ? 'Loading...' : 'Go to Dashboard (Demo)'}
        </button>
      </form>
      {/* <button onClick={() => setIsSignUp(!isSignUp)} disabled={loading}>
        {isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}
      </button> // Sign up toggle removed */}
    </div>
  );
}

export default Login; 