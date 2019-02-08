import { RECEIVE_CATEGORIES } from '../actions/categories';

export function categories(state = {}, action) {
  const { type, categories } = action;

  switch (type) {
    case RECEIVE_CATEGORIES:
      if (categories) {
        return categories.reduce((obj, category) => {
          obj[category.name] = category;
          return obj;
        }, {});
      }
      return state;
    default:
      return state;
  }
}
