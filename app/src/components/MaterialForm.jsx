import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, FormGroup } from '@material-ui/core';

function MaterialForm({
  inputs,
  inputTypes,
  state,
  handleInputChange,
  handleSubmit
}) {
  return (
    <form onSubmit={handleSubmit}>
      <FormGroup row>
        {inputs.map((input, index) => (
          <Input
            key={input.name}
            type={inputTypes[index]}
            name={input.name}
            value={state[input.name]}
            placeholder={input.name}
            onChange={handleInputChange}
          />
        ))}
        <Button
          key="submit"
          type="button"
          color="primary"
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </FormGroup>
    </form>
  );
}

MaterialForm.propTypes = {
  inputs: PropTypes.arrayOf(PropTypes.object).isRequired,
  inputTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  state: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default MaterialForm;
