import { Map, List } from "immutable";

const initialState = Map({
  client: undefined,
  account: undefined,
  breadcrumbs: List([]),
});

const reducer = (previousState = initialState, action) => {
  switch (action.type) {
  default:
    return previousState;
  }
};

export default reducer;
