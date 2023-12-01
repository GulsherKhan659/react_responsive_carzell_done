export const formatNumberWithSeparator = (number, separator) => {
    if (typeof number !== 'number') {
        return 'Invalid input';
    }

    let numberString = number.toString();

    const regex = /\B(?=(\d{3})+(?!\d))/g;
    numberString = numberString.replace(regex, separator);

    return numberString;
}

export const getFirstXCharacters = (string, x) => {
    if (typeof string !== 'string') {
        return 'Invalid input';
    }

    return string.substring(0, x);
}

export const valueIfNull = (value, defaultValue) => {
    if (value === undefined || value === null) {
        return defaultValue;
    }
    return value;
}

// function that takes a number and returns a string. If the number is below 10 then put a 0 in front of it
export const formatNumberWithLeadingZero = (number) => {
    if (typeof number !== 'number') {
        return 'Invalid input';
    }

    return number < 10 ? `0${number}` : number.toString();
}

export const isEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return regex.test(email);
};

export const setCookie = (name, value, daysToExpire) => {
    const date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

export const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null; // Cookie not found
}

export const EnsureNoneBreakingSpace = (text) => {
    return text.replace(/ /g, '\u00a0');
}

export const getFormattedDate = (date, separator) => {
    const day = formatNumberWithLeadingZero(date.getDate());
    const month = formatNumberWithLeadingZero(date.getMonth() + 1);
    const year = date.getFullYear();

    return `${day}${separator}${month}${separator}${year}`;
}