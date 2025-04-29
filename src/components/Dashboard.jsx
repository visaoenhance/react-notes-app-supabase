import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Link, useNavigate } from 'react-router-dom';

const demoUserId = '00000000-0000-4000-8000-000000000001'; // valid UUID format

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      /* // Original user fetching logic - Commented out
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not logged in');
      }
      */
      console.log(`Fetching notes for demo user: ${demoUserId}`);

      const { data, error } = await supabase
        .from('notesapp_notes')
        .select('id, title, created_at')
        // .eq('user_id', user.id) // Original user ID filter
        .eq('user_id', demoUserId) // Use demo user ID
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setError(error.message || 'Failed to fetch notes.');
      /* // Original error handling for logged out user - Commented out
      if (error.message === 'User not logged in') {
        navigate('/login');
      }
      */
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    // --- DEMO MODE: Bypass Supabase Logout --- 
    console.log('Bypassing logout for demo mode.');
    navigate('/login');
    setLoading(false);
    // --- END DEMO MODE ---
    /* // Original Supabase Logout Logic - Commented Out
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      setError(error.message || 'Failed to logout.');
      setLoading(false);
    }
    */ 
  };

  if (loading) return <div>Loading notes...</div>;
  if (error) return <div>Error: {error} <button onClick={fetchNotes}>Retry</button></div>;

  return (
    <div>
      <h2>My Notes (Demo User)</h2>
      <button onClick={() => navigate('/note/new')}>Add New Note</button>
      <button onClick={handleLogout} disabled={loading} style={{ marginLeft: '10px' }}>
        {/* {loading ? 'Logging out...' : 'Logout'} */}
        {loading ? 'Logging out...' : 'Logout (Back to Demo Login)'}
      </button>
      {notes.length === 0 ? (
        <p>No notes yet for the demo user. Add one!</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <Link to={`/note/${note.id}`}>{note.title || 'Untitled Note'}</Link>
              <span> - {new Date(note.created_at).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard; 