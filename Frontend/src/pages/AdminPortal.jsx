import React, { useState } from "react";

const AdminPortal = () => {
  const [services, setServices] = useState([
    { id: 1, title: "Web Development", description: "Build a portfolio website." },
    { id: 2, title: "Graphic Design", description: "Design a company logo." },
  ]);

  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "System Maintenance", details: "Scheduled for 22nd Nov, 10 PM." },
    { id: 2, title: "New Features", details: "Check out the new user dashboard." },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col">
      {/* Header */}
      <header className="bg-indigo-700 text-white py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Admin Portal</h1>
          <p className="text-sm">Welcome, Admin!</p>
        </div>
      </header>

      <main className="container mx-auto flex-1 py-8 px-4 space-y-12">
        {/* Requested Services Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Requested Services
          </h2>
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col"
                >
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <button
                    className="mt-auto bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                    onClick={() =>
                      setServices((prev) =>
                        prev.filter((item) => item.id !== service.id)
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No requested services yet.</p>
          )}
        </section>

        {/* Announcements Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Announcements
          </h2>
          {announcements.length > 0 ? (
            <ul className="space-y-4">
              {announcements.map((announcement) => (
                <li
                  key={announcement.id}
                  className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {announcement.title}
                    </h3>
                    <p className="text-gray-600">{announcement.details}</p>
                  </div>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    onClick={() =>
                      setAnnouncements((prev) =>
                        prev.filter((item) => item.id !== announcement.id)
                      )
                    }
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">No announcements available.</p>
          )}
        </section>

        {/* Additional Admin Tools */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Admin Tools
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600">
              Add and manage features for your admin portal here.
            </p>
            <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Add Tool
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center text-sm">
          &copy; {new Date().getFullYear()} Admin Portal. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AdminPortal;
