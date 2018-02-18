import validator from 'validator';
import isEmpty from 'lodash/isEmpty';


const validateInput = (formInput) => {
  const errors = {};

  if (validator.isEmpty(formInput.type)) {
    errors.type = 'Select an exercise type';
  }

  if (!validator.isInt(formInput.count)) {
    errors.count = 'Count must be an integer';
  }

  if (!validator.isInt(formInput.repNo)) {
    errors.repNo = 'Repetition count must be an integer';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateInput;
