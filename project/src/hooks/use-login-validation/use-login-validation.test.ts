import {act, renderHook} from '@testing-library/react';
import {useLoginValidation} from './use-login-validation';

describe('Hook: useLoginValidation', () => {
  it('should return array with 3 elements', () => {
    const {result} = renderHook(
      () => useLoginValidation()
    );

    const [validateEmail, validatePassword, isDataValid] = result.current;

    expect(result.current).toHaveLength(3);
    expect(validateEmail).toBeInstanceOf(Function);
    expect(validatePassword).toBeInstanceOf(Function);
    expect(isDataValid).toBeInstanceOf(Object);
  });

  it('should be correctly change state', () => {
    const {result} = renderHook(
      () => useLoginValidation()
    );

    const [validateEmail, validatePassword, initialValidationStatus] = result.current;

    act(() => {
      validateEmail('invalid email');
    });

    act(() => {
      validatePassword('invalid password');
    });

    let [,, isDataValid] = result.current;

    expect(initialValidationStatus).toEqual({email: true, password: true});
    expect(isDataValid).toEqual({email: false, password: false});

    act(() => {
      validateEmail('validemail@mail.com');
    });

    act(() => {
      validatePassword('validpassword11');
    });

    [,, isDataValid] = result.current;

    expect(isDataValid).toEqual({email: true, password: true});
  });
});
