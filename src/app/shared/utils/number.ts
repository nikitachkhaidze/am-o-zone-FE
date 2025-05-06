import round from 'lodash-es/round';

export const isNumberMultipleOf = (first: number, second: number) => {
  return Number.isInteger(Math.fround(first / second));
};

export const getNumberFractionDigits = (number: number) => {
  return `${number}`.split('.')[1]?.length ?? 0;
};

export const findNearestToStepValue = (value: number, step: number): number => {
  // Solution with EPSILON is taken from https://stackoverflow.com/a/11832950
  return round(Math.round((value + Number.EPSILON) / step) * step, getNumberFractionDigits(step));
};
