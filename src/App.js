import React, { useState, useEffect } from 'react';
import './App.css';
import { useTheme } from './ThemeContext';
import Sidebar from './Sidebar';
import Apps from './pages/Apps';
import Tools from './pages/Tools';
import Extra from './pages/Extra';
import Settings from './Settings';
import About from './pages/About';
import Login from './components/Login';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('Apps');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for existing guest session
    const guestSession = localStorage.getItem('guestSession');
    if (guestSession) {
      setUser(JSON.parse(guestSession));
    }
  }, []);

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    const Component = {
      Apps,
      Tools,
      Extra,
      Settings,
      About
    }[activeTab];

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ 
            flex: 1,
            height: '100vh',
            overflow: 'auto',
            background: `linear-gradient(135deg, ${theme.background}00 0%, ${theme.background} 100%)`
          }}
        >
          <Component />
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div style={{ 
      display: 'flex',
      background: theme.background,
      color: theme.text,
      minHeight: '100vh',
      position: 'relative'
    }}>
      <Sidebar active={activeTab} onChange={setActiveTab} user={user} />
      {renderContent()}
    </div>
  );
};

export default App;