const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const msgStyle = {
    background: 'lightgrey',
    border: '2px solid green',
    borderRadius: 4,
    color: 'green',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 6,
    marginBottom: 10
  };

  return <div style={msgStyle}>{message}</div>;
};

export default Notification;
