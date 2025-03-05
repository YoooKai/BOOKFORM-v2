import { writable } from "svelte/store";

export const isMobile = writable(typeof window !== 'undefined' && window.innerWidth <= 768);

if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
        isMobile.set(window.innerWidth <= 768);
    });
}

export function transformDate(date: string | Date): string {
    if (typeof date == 'string') {
        date = new Date(date);
    }

    let month: number | string = date.getMonth() + 1;
    let day: number | string = date.getDate();
    let hour: number | string = date.getHours();
    let minute: number | string = date.getMinutes();

    if (month < 10) {
        month = '0' + month;
    }

    if (day < 10) {
        day = '0' + day;
    }

    if (hour < 10) {
        hour = '0' + hour;
    }

    if (minute < 10) {
        minute = '0' + minute;
    }

    const newDate = `${date.getFullYear()}-${month}-${day}T${hour}:${minute}`;
    return newDate;
}

export function adaptDate(date: string, iso: boolean){

    const dateTime = new Date(date);

    let day = "0" + dateTime.getDate();
    let month = "0" + (dateTime.getMonth() + 1);
    let year = dateTime.getFullYear();

    if (iso) {
        return year  + '-' + month.substr(-2) + '-' + day.substr(-2);
    }
    
    return day.substr(-2) + '/' + month.substr(-2) + '/' + year
}

export function getTomorrowDate() {
        let dateTomorrow: Date = new Date();
        let date = new Date();
        let date2 = new Date(date.getTime());
        dateTomorrow.setDate(date2.getDate() + 1);

        return new Date(dateTomorrow);
}

export function truncateFloat(num: number, decimalPlaces: number) {
    const factor = Math.pow(10, decimalPlaces);
    return Math.floor(num * factor) / factor;
}