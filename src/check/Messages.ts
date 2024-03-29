export const RUN_IDENTIFIER_FORMAT = "{1}:{2}:{3}";
export const RETURN_VALUE_MISMATCH_MESSAGE_FORMAT =
  "{1}: return value mismatch:\nexpected:{2}\nactual  :{3}\n---diff---:\n{4}";
export const UNEXPECTED_EXCEPTION_MESSAGE_FORMAT =
  "{1}: unexpected exception:{2}\nstack:\n{3}";
export const NOT_THE_EXPECTED_EXCEPTION_THROWN_FORMAT =
  "{1}:Not the expected exception thrown.\nExpected:{3}\nGot     :{2}\nstack:\n{4}";
export const EXCEPTED_EXCEPTION_NOT_THROWN_MESSAGE_FORMAT =
  "{1}: Exception expected but not thrown";
export const SIDE_EFFECT_CHECK_FAILURE_MESSAGE =
  "{1}: side effect check: {2}: did not hold:{3}";
export const RETURN_VALUE_CHECK_FAILURE_MESSAGE_FORMAT =
  "{1}: {2}: return value check did not hold:{3}\nstack:\n{4}";
export const CURRENT_RUN_IS_INCOMPLETE =
  "{1}: current run is incomplete: neither thenReturn nor thenThrow was called";
