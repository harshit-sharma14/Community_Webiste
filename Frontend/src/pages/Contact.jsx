import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log('Form Submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Section - Contact Information */}
          <div className="bg-blue-500 text-white p-6">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="mb-6">
              We'd love to hear from you! Reach out with your questions, feedback, or suggestions.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="material-icons mr-3">phone</span>
                +1 234 567 890
              </li>
              <li className="flex items-center">
                <span className="material-icons mr-3">email</span>
                contact@example.com
              </li>
              <li className="flex items-center">
                <span className="material-icons mr-3">place</span>
                123 Main Street, Your City, Country
              </li>
            </ul>
          </div>

          {/* Right Section - Contact Form */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Send Us a Message</h2>
            {submitted && (
              <p className="text-green-600 mb-4">Thank you! Your message has been sent.</p>
            )}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
