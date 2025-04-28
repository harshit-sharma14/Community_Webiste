import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Forum = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  
  // Assuming JWT token is stored in localStorage after user login
  const token = localStorage.getItem('authToken');  // You may store the token in localStorage or other means

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/comments', {
        headers: {
          'Authorization': `Bearer ${token}`,  // Send the token in the request header
        },
      });
  
      // Assuming response.data is an array of comments with username included
      const commentsWithUsername = response.data.map(comment => ({
        ...comment,
        username: comment.username, // Extract username from each comment
      }));
  
      setComments(commentsWithUsername);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(token)
      // Post the comment with the token for authentication
      await axios.post('http://localhost:5000/api/comments', 
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Include the token in the header
          },
          withCredentials: true 
        }
      );
      setComment('');
      fetchComments();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Forum</h2>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Messages</h3>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="mb-4 p-3 bg-white rounded-md shadow">
              {/* Display username along with the comment */}
              <div className="font-semibold text-gray-800">{comment.username}</div>
              <p className="text-gray-700 mt-2">{comment.comment}</p>
              <small className="text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </small>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <textarea
            name="comment"
            placeholder="Your message"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Forum;
