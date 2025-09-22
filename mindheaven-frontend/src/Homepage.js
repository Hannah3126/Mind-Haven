import React from 'react';

function HomePage({ goToLogin }) {
  return (
    <div style={styles.container}>
      <h1>Welcome to Mindheaven</h1>
      <p>Your mental wellness companion.</p>
      <button style={styles.button} onClick={goToLogin}>
        Go to Login
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: '#1a1a2e',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    background: '#8EC5FC',
    color: '#000',
    fontWeight: 'bold',
  },
};

export default HomePage;
