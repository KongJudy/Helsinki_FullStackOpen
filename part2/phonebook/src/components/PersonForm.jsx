const PersonForm = ({
  onSubmit,
  nameValue,
  nameChange,
  numberValue,
  numberChange
}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          name:
          <input type='text' value={nameValue} onChange={nameChange} />
        </div>
        <div>
          number:
          <input type='tel' value={numberValue} onChange={numberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
