export const InputValidator = (prevValue, value, maxSize) => {
    let regExp = /[^а-яА-Яa-zA-Z0-9\s]/.test(value);
    
    if (regExp || value.length > maxSize) return prevValue;

    return value;
}
