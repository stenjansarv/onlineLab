const passwordValidDefinition =
[
    {
      minLength: 8,
      errorMessage: 'Your password must be at least six characters long.',
    },
    {
      maxLength: 32,
      errorMessage: 'Your password cannot be longer than 32 characters.',
    },
    {
      regex: /.*\d/,
      errorMessage: 'Your password must contain at least one digit.',
    },
    {
      regex: /.*[a-z]/,
      errorMessage: 'Your password must contain at least one lower case letter.'
    },
    {
      regex: /.*[A-Z]/,
      errorMessage: 'Your password must contain at least one upper case letter.'
    },
    {
      regex: /.*[a-zA-Z]/,
      errorMessage: 'Your password must contain at least one letter.',
    },
    {
      regex: /.*[!@#$%^&*() =+_-]/,
      errorMessage: 'Your password must contain at least one symbol in this list !@#$%^&*()=+_- or a space.',
    },
]


export const validatePasswordUI = (password) => {
	const errors = [];

  for (let i = 0; i < passwordValidDefinition.length; i++) {
    const validator = passwordValidDefinition[i];
    let valid = true;
    
    if (validator.hasOwnProperty('regex'))
      if (password.search(validator.regex) < 0) valid = false;

    if (validator.hasOwnProperty('minLength'))
      if (password.length < validator.minLength) valid = false;

    if (validator.hasOwnProperty('maxLength'))
      if (password.length > validator.maxLength) valid = false;
      
    if (!valid) errors.push(validator.errorMessage);
  }

  if (errors.length > 0) {
    throw new Error(errors.join('\n'))
  }
}