import React from 'react';
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
      <FormGroup row={true}>
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

export default MaterialForm;
