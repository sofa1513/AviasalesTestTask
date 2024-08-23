// src/utils/ticketUtils.js
export const formatDuration = (min) => {
    const hours = Math.floor(min / 60);
    const minutes = min % 60;
    return hours === 0 ? `${minutes}м` : minutes === 0 ? 
                         `${hours}ч` : `${hours}ч ${minutes}м`;
};

export const timeInFly = (date, duration) => {
    const dates = new Date(date);
    const depHours = dates.getHours();
    const depMinutes = dates.getMinutes();
    dates.setMinutes(dates.getMinutes() + duration);
    const arrHours = dates.getHours();
    const arrMinutes = dates.getMinutes();
    return `${depHours < 10 ? "0" + depHours : depHours}:
            ${depMinutes < 10 ? "0" + depMinutes : depMinutes} - 
            ${arrHours < 10 ? "0" + arrHours : arrHours}:
            ${arrMinutes < 10 ? "0" + arrMinutes : arrMinutes}`;
};
