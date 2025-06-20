import { useSuspenseQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { Department } from "@/types/employee.type";

export function useDepartments() {
  return useSuspenseQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const res = await axiosInstance.get("/departments");
      return res.data as Department[];
    },
  });
}
