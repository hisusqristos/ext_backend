const isObject = (input: unknown): input is Record<string, unknown> => {
    return typeof input === "object" && input !== null && !Array.isArray(input);
};

const validateUser = (data: unknown) => {
    if (!isObject(data)) {
        return false
    }

    if (typeof data.username !== "string") {
        return false;
    }
    if (data.username.length > 15) {
        return false;
    }

    if (typeof data.email !== "string") {
        return false
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRe.test(data.email) !== true) {
        return false
    }

    if (!validatePassword(data.password)) {
        return false
    }

    return true
}


const validatePassword = (data: unknown) => {
    if (typeof data !== "string") {
        return false
    }

    if (data.length < 6) {
        return false
    }

    return true
}

export { validateUser, validatePassword }