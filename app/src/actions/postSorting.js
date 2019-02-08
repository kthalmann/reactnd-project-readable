export const SET_POST_SORT_METHOD = 'SET_POST_SORT_METHOD';

export function setPostSortMethod(sortMethod) {
  return {
    type: SET_POST_SORT_METHOD,
    sortMethod
  };
}
