const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null;
  }

  const errorStyle = {
    background: 'lightgrey',
    border: '2px solid red',
    borderRadius: 4,
    color: 'red',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 6,
    marginBottom: 10
  };

  return <div style={errorStyle}>{message}</div>;
};

export default ErrorMessage;
