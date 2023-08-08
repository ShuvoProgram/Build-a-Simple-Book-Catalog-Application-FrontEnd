import fetch from 'node-fetch'; // Assuming you're using this in a Node.js environment

export const setJwtToken = async (email: string): Promise<void> => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/token?email=${email}`
        );

        const data = await response.json();

        // SET TOKEN TO LOCAL STORAGE
        if (data.success && data.token) {
            localStorage.setItem("token", data.token);
        }
    } catch (error) {
        console.error('Error setting JWT token:', error);
    }
};
