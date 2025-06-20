import { useSuspenseQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { Employee } from "@/types/employee.type";

export function useEmployees() {
  return useSuspenseQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/employees");
        return res.data as Employee[];
      } catch (error) {
        console.error("Failed to fetch employees:", error);
        throw error;
      }
    },
  });
}
