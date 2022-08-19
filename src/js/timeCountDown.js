export const timeCountDown = (upcomingEvent, setHours, setMinutes, setSeconds, setDays) => {

    const todayDate = new Date().getTime();
    
    if(upcomingEvent.date){
        const dateArray = upcomingEvent.date.split("-").map(dateElement => Number.parseInt(dateElement));

        const eventDate = new Date(dateArray[0], dateArray[1]-1, dateArray[2]).getTime();

        const remainingTime = eventDate - todayDate;

        const days = Math.floor(((remainingTime/(1000)) / 3600) / 24);
        
        const hours = Math.floor(((remainingTime - (days * 24 * 3600000)) / 1000) / 3600);

        const minutes = Math.ceil(((remainingTime - (hours * 3600000)- (days * 24 * 3600000))/1000) / (60));

        const seconds = 60 - Number.parseInt(-1 * ((remainingTime - (minutes * 60000) - (hours * 3600000)- (days * 24 * 3600000))/1000))

        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
        setDays(days)
    }
}