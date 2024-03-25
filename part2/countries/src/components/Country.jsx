const Country = ({ country, onClick }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            {country.name.common} <button onClick={onClick}>show</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Country;
