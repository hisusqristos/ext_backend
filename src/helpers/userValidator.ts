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

    if (typeof data.password !== "string") {
        return false;
    }
    if (data.password.length < 6) {
        return false;
    }
    return true
}

export { validateUser }