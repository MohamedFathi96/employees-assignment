import { useSuspenseQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { Role } from "@/types/employee.type";

export function useRoles() {
  return useSuspenseQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const res = await axiosInstance.get("/roles");
      return res.data as Role[];
    },
  });
}
