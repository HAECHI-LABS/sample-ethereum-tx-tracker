import client from './client';

export const loadTransaction = async () => {
    return client.get('/api/tx');
}

export const generateTransaction = async () => {
    return client.post('/api/tx');
}