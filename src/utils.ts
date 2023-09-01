type PromiseResult<T> = T extends Promise<infer U> ? U : never;

interface Resource<T> {
  read: () => T;
}

/**
 * Creates a resource object that wraps around a Promise. It allows for synchronous reads
 * from the Promise once it's resolved or rejected.
 *
 * @template T - The type of the data returned by the Promise.
 * @param {Promise<T>} promise - The Promise to create a resource for.
 * @returns {Resource<PromiseResult<T>>} A resource object with a `read` method.
 */
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

/**
 * Preloads an image by creating an HTML `img` element with the specified source (`src`).
 * It returns a Promise that resolves when the image is fully loaded.
 *
 * @param {string} src - The URL of the image to preload.
 * @returns {Promise<string>} A Promise that resolves with the source URL when the image is loaded.
 */
function preloadImage(src: string) {
  return new Promise((resolve) => {
    const img = document.createElement("img");
    img.src = src;
    img.onload = () => resolve(src);
  });
}

export { createResource, preloadImage };
export type { Resource };
