import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";


export class SwipeableAdapter {
  public static swipeableAdapter() {
    return {
      LeadingActions,
      SwipeableList,
      SwipeableListItem,
      SwipeAction,
      TrailingActions,
    };
  }
}
