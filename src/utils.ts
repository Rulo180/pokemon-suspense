type PromiseResult<T> = T extends Promise<infer U> ? U : never;

interface Resource<T> {
  read: () => T;
}

function createResource<T>(promise: Promise<T>): Resource<PromiseResult<T>> {
  let status: "pending" | "success" | "error" = "pending";
  let result: PromiseResult<T>;

  const wrappedPromise = promise.then(
    (resolved) => {
      status = "success";
      result = resolved as PromiseResult<T>;
    },
    (rejected) => {
      status = "error";
      result = rejected as any; // Adjust the type based on the expected error type
    }
  );

  return {
    read() {
      if (status === "pending") throw wrappedPromise;
      if (status === "error") throw result;
      if (status === "success") return result;
      throw new Error("This should be impossible");
    },
  };
}

export { createResource };
export type { Resource };
