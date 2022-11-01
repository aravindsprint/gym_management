import dayjs from "dayjs";
import JSConfetti from 'js-confetti'


const day_js = dayjs();

console.log("dayjs()",day_js);
 
const date1 = dayjs().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A') // display 


const jsConfetti = new JSConfetti()

jsConfetti.addConfetti()