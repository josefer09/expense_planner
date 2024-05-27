import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

export class ReactCircularBar {
    public static progressbar() {
        return {
            CircularProgressbar,
            buildStyles,
        }
    }
}