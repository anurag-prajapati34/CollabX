import { useState } from "react";
import { useMutation } from "convex/react";
import { toast } from "sonner";

export const useApiMutation =  (mutationFunction: any) => {
  const [pending, setPending] = useState(false);
  const apiMuation = useMutation(mutationFunction);
  const mutate = (payload: any) => {
    setPending(true);
    apiMuation(payload)
      .finally(() => setPending(false))
      .then((result) => {
        //TODO:Redirect board/{id}
        toast.success("Board Created");
        return result;
      })
      .catch((error) => {
        toast.error("Failed to create board")
        throw error;
      });
  };

  return {mutate,pending};

};
