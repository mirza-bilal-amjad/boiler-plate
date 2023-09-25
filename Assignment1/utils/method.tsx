const formateDate = () => {

};
const convertTime = (time: any) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}
export {formateDate, convertTime}
