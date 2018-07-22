export function isUsername(username) {
    const reg = /^[a-zA-Z0-9_-]{5,16}$/;
    return reg.test(username);
}
