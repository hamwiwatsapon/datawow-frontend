type LoginResponse = {
  id: string;
  username: string;
};

const Login = async (username: string): Promise<LoginResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/users/login`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      // Try to extract error message from response
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message ?? 'Login failed');
    }

    const data: LoginResponse = await response.json();
    cookieStore.set({
      name: 'userData',
      value: JSON.stringify(data),
      expires: Math.floor((Date.now() + 60 * 60 * 8000) / 1000), // 8 hour
    });
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export { Login };