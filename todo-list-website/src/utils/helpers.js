function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

function validateInput(input) {
    return input.trim() !== '';
}

function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

export { formatDate, validateInput, generateUniqueId };