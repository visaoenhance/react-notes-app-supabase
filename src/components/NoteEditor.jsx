import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useParams, useNavigate, Link } from 'react-router-dom';

const demoUserId = '00000000-0000-4000-8000-000000000001';

function NoteEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const isNewNote = id === 'new';

  useEffect(() => {
    const getNoteForDemoUser = async () => {
      if (isNewNote) {
        setTitle('');
        setContent('');
        return; 
      }

      setLoading(true);
      setError(null);
      try {
        console.log(`Fetching note ID: ${id} for demo user: ${demoUserId}`);

        const { data, error } = await supabase
            .from('notesapp_notes')
            .select('title, content')
            .eq('id', id)
            .eq('user_id', demoUserId)
            .single();

        if (error) {
          if (error.code === 'PGRST116') { 
              throw new Error('Note not found for demo user or access denied.');
          } else {
              throw error;
          }
        }
        if (data) {
          setTitle(data.title || '');
          setContent(data.content || '');
        } else {
           throw new Error('Note data not found.');
        }
      } catch (error) {
        console.error('Error loading note for demo user:', error);
        setError(error.message || 'Failed to load note data.');
      } finally {
        setLoading(false);
      }
    };

    getNoteForDemoUser();
  }, [id, navigate, isNewNote]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const noteData = { 
        title: title || 'Untitled Note',
        content, 
        user_id: demoUserId
      };
      console.log(`Saving note for demo user: ${demoUserId}`, noteData);

      let response;
      if (isNewNote) {
        console.log('Inserting new note...');
        response = await supabase
          .from('notesapp_notes')
          .insert([noteData])
          .select('id')
          .single();
      } else {
        console.log(`Updating note ID: ${id}...`);
        response = await supabase
          .from('notesapp_notes')
          .update(noteData)
          .eq('id', id)
          .eq('user_id', demoUserId);
      }

      if (response.error) throw response.error;
      
      if (isNewNote && response.data) {
         console.log(`New note created with ID: ${response.data.id}`);
        navigate(`/note/${response.data.id}`, { replace: true }); 
      } else if (!isNewNote) {
         console.log(`Note ID: ${id} updated successfully.`);
         alert('Note saved successfully!'); 
      }

    } catch (error) {
      console.error('Error saving note:', error);
      setError(error.message || 'Failed to save note.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (isNewNote || !window.confirm('Are you sure you want to delete this note?')) {
      return;
    }
    setSaving(true); 
    setError(null);
    try {
        console.log(`Deleting note ID: ${id} for demo user: ${demoUserId}`);
        const { error } = await supabase
            .from('notesapp_notes')
            .delete()
            .eq('id', id)
            .eq('user_id', demoUserId);

        if (error) throw error;
        console.log('Note deleted successfully.');
        navigate('/dashboard');
    } catch (error) {
        console.error('Error deleting note:', error);
        setError(error.message || 'Failed to delete note.');
    } finally {
        setSaving(false);
    }
  };

  if (loading && !isNewNote) return <div>Loading editor...</div>;
  if (error) return <div>Error: {error} <Link to="/dashboard">Go to Dashboard</Link></div>;

  return (
    <div>
      <h2>{isNewNote ? 'Create Note' : 'Edit Note'} (Demo User)</h2>
      <input
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={saving || loading}
        style={{ display: 'block', marginBottom: '10px', width: '80%' }}
      />
      <textarea
        placeholder="Note Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={saving || loading}
        rows={10}
        style={{ display: 'block', marginBottom: '10px', width: '80%' }}
      />
       {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSave} disabled={saving || loading}>
        {saving ? 'Saving...' : 'Save Note'}
      </button>
      {!isNewNote && (
        <button onClick={handleDelete} disabled={saving || loading} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
          {saving ? 'Deleting...' : 'Delete Note'}
        </button>
      )}
      <button onClick={() => navigate('/dashboard')} disabled={saving} style={{ marginLeft: '10px' }}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default NoteEditor; 