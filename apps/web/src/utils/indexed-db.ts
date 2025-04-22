export type DeleteDatabaseResult = "success" | "error" | "blocked";
export const deleteDatabaseAsync = (
  name: string,
): Promise<DeleteDatabaseResult> => {
  return new Promise((resolve) => {
    const req = indexedDB.deleteDatabase(name);

    req.onsuccess = () => {
      resolve("success");
    };
    req.onerror = () => {
      resolve("error");
    };
    req.onblocked = (e) => {
      console.log(e);
      resolve("blocked");
    };
  });
};
