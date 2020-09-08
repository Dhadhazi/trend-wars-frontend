import { selectHeadList } from "./selectors";

export const newHeadList = (headList: number[]) => {
  return {
    type: "NEW_HEAD_LIST",
    payload: {
      headList,
    },
  };
};

export const newHead = (newhead: number) => {
  return (dispatch: Function, getState: Function) => {
    const headlist = selectHeadList(getState());
    headlist.push(newhead);
    dispatch(newHeadList(headlist));
  };
};
