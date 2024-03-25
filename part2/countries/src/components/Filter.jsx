const Filter = ({ value, onChange }) => {
  return (
    <>
      find countries <input type='text' value={value} onChange={onChange} />
    </>
  );
};

export default Filter;
