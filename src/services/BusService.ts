export default {
  // NOTE: I'm not using type definition for the return value of this method due to the fact that it can return an Error object and it's known as bad practice,
  // If it was validator added such as "Zod" I would create schema and validate the return value IMO it's the safest way to handle this kind of situation.
  /**
   * Fetches bus stops data from the OpenAPI served on port 3000.
   * Prior to using this method, ensure that the OpenAPI server is running by executing `npm run api`.
   *
   * @returns {Promise<any>} A promise that resolves with the fetched bus stops data.
   * @throws {Error} If the request to fetch bus stops fails.
   */
  fetchBusStops: async () => {
    try {
      const response = await fetch("http://localhost:3000/stops");
      const data = await response.json();

      return data;
    } catch (error) {
      throw new Error(
        "Failed to fetch bus stops, have you started the OpenAPI server?"
      );
    }
  },
};
