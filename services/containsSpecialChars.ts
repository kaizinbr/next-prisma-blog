export default function containsSpecialChars(str: string) {
    const specialChars = /[`!@#$%^&*()ç+ \-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
}
