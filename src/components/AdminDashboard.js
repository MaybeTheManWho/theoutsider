import React, { useState, useEffect } from 'react';
import topics from '../data/topics';

// In a real application, this would be connected to a backend API
// For demonstration purposes, we'll use local state

const AdminDashboard = () => {
  const [topicsList, setTopicsList] = useState(topics);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [newTopic, setNewTopic] = useState({ name: '', description: '', items: [] });
  const [newItem, setNewItem] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simple authentication (in a real app, this would be handled by a backend)
  const handleAuthentication = (e) => {
    e.preventDefault();
    // For demonstration, use a simple password
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setIsAdding(false);
  };

  const handleAddNewTopic = () => {
    setSelectedTopic(null);
    setIsAdding(true);
    setNewTopic({ 
      name: '', 
      description: '', 
      image: '/assets/images/placeholder.jpg',
      items: [] 
    });
  };

  const handleNewTopicChange = (e) => {
    const { name, value } = e.target;
    setNewTopic({
      ...newTopic,
      [name]: value
    });
  };

  const handleAddItem = () => {
    if (newItem.trim() === '') return;
    
    if (isAdding) {
      setNewTopic({
        ...newTopic,
        items: [...newTopic.items, newItem]
      });
    } else if (selectedTopic) {
      const updatedTopic = {
        ...selectedTopic,
        items: [...selectedTopic.items, newItem]
      };
      
      setSelectedTopic(updatedTopic);
      setTopicsList(topicsList.map(topic => 
        topic.id === selectedTopic.id ? updatedTopic : topic
      ));
    }
    
    setNewItem('');
  };

  const handleRemoveItem = (index) => {
    if (isAdding) {
      setNewTopic({
        ...newTopic,
        items: newTopic.items.filter((_, i) => i !== index)
      });
    } else if (selectedTopic) {
      const updatedItems = selectedTopic.items.filter((_, i) => i !== index);
      const updatedTopic = {
        ...selectedTopic,
        items: updatedItems
      };
      
      setSelectedTopic(updatedTopic);
      setTopicsList(topicsList.map(topic => 
        topic.id === selectedTopic.id ? updatedTopic : topic
      ));
    }
  };

  const handleSaveNewTopic = () => {
    if (newTopic.name.trim() === '' || newTopic.items.length < 8) {
      alert('Please provide a name and at least 8 items for the topic');
      return;
    }
    
    const newTopicWithId = {
      ...newTopic,
      id: Math.max(...topicsList.map(t => t.id)) + 1
    };
    
    setTopicsList([...topicsList, newTopicWithId]);
    setSelectedTopic(newTopicWithId);
    setIsAdding(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="section">
        <h2 className="section-title">Admin Login</h2>
        <form onSubmit={handleAuthentication}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
              Admin Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 className="section-title">Admin Dashboard</h2>
        <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
      </div>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: '1' }}>
          <h3 style={{ marginBottom: '15px' }}>Topics</h3>
          <button 
            onClick={handleAddNewTopic}
            className="btn"
            style={{ marginBottom: '15px' }}
          >
            Add New Topic
          </button>
          
          <div style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
            {topicsList.map((topic) => (
              <div 
                key={topic.id}
                onClick={() => handleTopicSelect(topic)}
                style={{ 
                  padding: '10px 15px',
                  borderBottom: '1px solid #ddd',
                  cursor: 'pointer',
                  backgroundColor: selectedTopic?.id === topic.id ? '#f1f5f9' : 'transparent'
                }}
              >
                {topic.name} ({topic.items.length} items)
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ flex: '2' }}>
          {isAdding && (
            <div>
              <h3>Add New Topic</h3>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  Topic Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newTopic.name}
                  onChange={handleNewTopicChange}
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={newTopic.description}
                  onChange={handleNewTopicChange}
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  Items (Need at least 8)
                </label>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    style={{ flex: '1', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                  />
                  <button onClick={handleAddItem} className="btn">Add</button>
                </div>
                
                {newTopic.items.length > 0 && (
                  <div style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '10px' }}>
                    {newTopic.items.map((item, index) => (
                      <div 
                        key={index} 
                        style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          padding: '5px 0',
                          borderBottom: index < newTopic.items.length - 1 ? '1px solid #eee' : 'none'
                        }}
                      >
                        <span>{item}</span>
                        <button 
                          onClick={() => handleRemoveItem(index)}
                          style={{ 
                            background: 'none',
                            border: 'none',
                            color: '#e74c3c',
                            cursor: 'pointer'
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <button onClick={handleSaveNewTopic} className="btn btn-success">
                Save New Topic
              </button>
              <button 
                onClick={() => setIsAdding(false)} 
                className="btn btn-secondary"
                style={{ marginLeft: '10px' }}
              >
                Cancel
              </button>
            </div>
          )}
          
          {!isAdding && selectedTopic && (
            <div>
              <h3>Edit Topic: {selectedTopic.name}</h3>
              
              <div style={{ marginBottom: '15px' }}>
                <p>Topic ID: {selectedTopic.id}</p>
                <p>Description: {selectedTopic.description}</p>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  Add New Item
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    style={{ flex: '1', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                  />
                  <button onClick={handleAddItem} className="btn">Add</button>
                </div>
              </div>
              
              <div>
                <h4 style={{ marginBottom: '10px' }}>Current Items</h4>
                <div style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '10px' }}>
                  {selectedTopic.items.map((item, index) => (
                    <div 
                      key={index} 
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        padding: '8px 0',
                        borderBottom: index < selectedTopic.items.length - 1 ? '1px solid #eee' : 'none'
                      }}
                    >
                      <span>{item}</span>
                      <button 
                        onClick={() => handleRemoveItem(index)}
                        style={{ 
                          background: 'none',
                          border: 'none',
                          color: '#e74c3c',
                          cursor: 'pointer'
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {!isAdding && !selectedTopic && (
            <div style={{ textAlign: 'center', padding: '50px 0' }}>
              <p>Select a topic to edit or create a new one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;