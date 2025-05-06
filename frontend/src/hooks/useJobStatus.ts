// hooks/useJobStatus.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '@/api';  // Assuming your api methods are here

const fetchJobStatus = async (id: string) => {
  const response = await api.getStatus(id);
  return response.data;
};

export const useJobStatus = (id: string) => {
  return useQuery({
    queryKey: ['jobStatus', id],
    queryFn: () => fetchJobStatus(id),
    refetchInterval: 5000,  // Poll for status every 5 seconds
  });
};