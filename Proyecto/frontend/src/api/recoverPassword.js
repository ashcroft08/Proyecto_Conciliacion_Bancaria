import axios from "./axios";

export const sendRecoveryCodeRequest = async (email) => {
    return await axios.post("/recoverpassword", { email });
};

export const validateRecoveryCodeRequest = async (email, code) => {
    return await axios.post("/validate-recovery-code", { email, code });
};

export const resetPasswordRequest = async (email, code, newPassword) => {
    return await axios.post("/reset-password", { email, code, newPassword });
};
