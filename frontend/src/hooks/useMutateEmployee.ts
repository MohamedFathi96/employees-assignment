import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Employee } from "@/types/employee.type";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner";

interface MutateEmployeePayload {
  action: "DELETE" | "EDIT" | "CREATE";
  payload: Partial<Employee> & { id?: number };
}

export function useMutateEmployee() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ action, payload }: MutateEmployeePayload) => {
      switch (action) {
        case "DELETE":
          if (!payload.id) throw new Error("ID is required for DELETE");
          return axiosInstance.delete(`/employees/${payload.id}`);
        case "EDIT":
          if (!payload.id) throw new Error("ID is required for EDIT");
          return axiosInstance.put(`/employees/${payload.id}`, payload);
        case "CREATE":
          return axiosInstance.post("/employees", payload);
        default:
          throw new Error("Invalid action");
      }
    },
    onSuccess: (_, variables) => {
      toast.success(`${variables.action} employee successful!`);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error: unknown, variables) => {
      let message = "Unknown error";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "object" && error !== null && "message" in error) {
        message = String((error as { message: unknown }).message);
      }
      toast.error(`${variables.action} employee failed: ${message}`);
    },
  });

  return {
    mutateEmployee: mutation.mutate,
    ...mutation,
  };
}
