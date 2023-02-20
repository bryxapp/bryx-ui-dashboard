
//Function converts epoch time to human readable time
export const convertEpochTime = (epochTime:number) => {
    console.log(epochTime);
    var date = new Date(0); // The 0 there is the key, which sets the date to the epoch
    date.setUTCSeconds(epochTime);
    //Return Month Day, Year Hour:Minute AM/PM no seconds
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
}
