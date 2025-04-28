// src/components/CommentForm.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CommentForm = ({ onCommentAdded }) => {
  const [text, setText] = useState('');
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;

    try {
      const response = await axios.post('http://localhost:5000/api/comments', { text }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      onCommentAdded(response.data);
      setText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your comment..."
        className="w-full p-2 border border-gray-300 rounded"
        rows="4"
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Post Comment
      </button>
    </form>
  );
};

export default CommentForm;