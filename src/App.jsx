import React from 'react';

// Icon components (inline SVG for simplicity)
const SalesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-blue-500">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    <path d="M12 6v1.17c0 .41.25.79.63.95l3.23 1.37c.4.17.64.58.64 1.01V12m-6-1.5V9a1.5 1.5 0 0 1 3 0v1.5"/>
    <path d="M12 12h.01"/>
  </svg>
);

const SupportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-green-500">
    <path d="M12 22a7 7 0 0 0 7-7h-4a3 3 0 0 1-3-3V8a3 3 0 0 1-3-3H5a7 7 0 0 0 7 14z"/>
    <path d="M21 15a4 4 0 0 0-4-4"/>
    <path d="M16 11a2 2 0 0 1-2-2"/>
    <path d="M3 5a4 4 0 0 1 4-4"/>
    <path d="M8 3a2 2 0 0 0 2 2"/>
  </svg>
);

const BillingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-purple-500">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

const GeneralIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-yellow-500">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);


// Card component to display department info
const ContactCard = ({ icon, title, description, color }) => {
  const colorClasses = {
    blue: 'border-blue-500/50 hover:border-blue-500',
    green: 'border-green-500/50 hover:border-green-500',
    purple: 'border-purple-500/50 hover:border-purple-500',
    yellow: 'border-yellow-500/50 hover:border-yellow-500',
  };

  const buttonClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
    yellow: 'bg-yellow-500 hover:bg-yellow-600',
  };

  return (
    <div className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-2 ${colorClasses[color]} transition-all duration-300 transform hover:-translate-y-1`}>
      <div className="flex items-center justify-center h-16 w-16 mb-6 rounded-full bg-gray-100 dark:bg-gray-900 mx-auto">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-6 h-12">{description}</p>
      <button className={`w-full py-3 px-6 rounded-lg text-white font-semibold ${buttonClasses[color]} transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${'focus:ring-' + color + '-400'}`}>
        Get in Touch
      </button>
    </div>
  );
};

function App() {
  const departments = [
    {
      icon: <SalesIcon />,
      title: "Sales Department",
      description: "For questions about pricing, plans, and partnerships.",
      color: 'blue'
    },
    {
      icon: <SupportIcon />,
      title: "Technical Support",
      description: "Get help with technical issues, bugs, or product features.",
      color: 'green'
    },
    {
      icon: <BillingIcon />,
      title: "Billing & Payments",
      description: "Manage your subscription, invoices, and payment details.",
      color: 'purple'
    },
    {
      icon: <GeneralIcon />,
      title: "General Inquiry",
      description: "For all other questions and general information.",
      color: 'yellow'
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
       {/* Background gradient shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob dark:opacity-30"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 dark:opacity-30"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 dark:opacity-30"></div>
      
      <div className="container mx-auto max-w-6xl relative">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white">
            How can we help you?
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose a department below to get in touch with our team. We're here to assist you with any questions or issues you might have.
          </p>
        </header>

        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {departments.map((dept, index) => (
            <ContactCard
              key={index}
              icon={dept.icon}
              title={dept.title}
              description={dept.description}
              color={dept.color}
            />
          ))}
        </main>
        
        <footer className="text-center mt-16 text-gray-500 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} Your Company Inc. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

