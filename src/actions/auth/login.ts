"use server"
import api from '@/lib/axios';

export async function Login(data: {
    email: string,
    password: string
}) {
    try {
        const res = await api.post('/auth/login', data, { withCredentials: true });
        return res.data;
    } catch (error: any) {
        console.error('Register failed:', error?.response?.data || error.message);
        throw new Error(error?.response?.data?.message || 'Registration failed');
    }
}