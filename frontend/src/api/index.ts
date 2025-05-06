import axios from 'axios';

const BASE_URL = 'http://localhost:5500';

export const api = {
  async convertToPDF(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${BASE_URL}/job`, formData);
    return response.data; // expected: { jobId: '...' }
  },

  async getStatus(jobId: string) {
    const response = await axios.get(`${BASE_URL}/job/${jobId}`);
    return response.data; // expected: { status: 'pending' | 'done', url?: string }
  }
};
