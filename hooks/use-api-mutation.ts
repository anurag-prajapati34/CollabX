import { useState } from "react";
import { useMutation } from "convex/react";


// root/hooks/use-api-mutation.ts

export const useApiMutation = (mutationFunction: any) => {
  const [pending, setPending] = useState(false);
  const apiMutation = useMutation(mutationFunction);

  const mutate = (payload: any) => {
    setPending(true);
    return apiMutation(payload)
      .finally(() => setPending(false))
      .then((result) => {
        // Optional: Handle success side effects here
        return result;
      })
      .catch((error) => {
        // Optional: Handle error side effects here
        throw error;
      });
  };

  return { mutate, pending };
};
