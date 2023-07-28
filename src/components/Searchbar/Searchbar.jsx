import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  SearchContainer,
  SearchForm,
  FormButton,
  FormInput,
} from 'components/Searchbar/Searchbar.styled';
import { ImSearch } from 'react-icons/im';

const Searchbar = ({ onSubmit }) => {
  const [data, setData] = useState('');

  const handleNameChange = event => {
    setData(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (data === '') {
      return toast('Заповніть поле пошуку');
    }

    onSubmit(data);

    event.currentTarget.reset();
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <FormButton type="submit">
          <ImSearch style={{ width: 25, height: 25 }} />
        </FormButton>

        <FormInput
          onChange={handleNameChange}
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchContainer>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
