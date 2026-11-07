export const adminAuthApi = {
  loadGenders: async () => {
    return {
      data: {
        genders: [
          { gender_id: 1, gender: "Male" },
          { gender_id: 2, gender: "Female" },
          { gender_id: 3, gender: "Prefer not to say" }
        ]
      }
    };
  }
};
