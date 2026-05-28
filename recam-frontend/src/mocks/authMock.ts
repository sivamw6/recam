interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: "photographyCompany" | "agent";
  };
}

export const mockLogin = (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@admin.com" && password === "123") {
        resolve({
          token: "this-is-mock-admin-token",
          user: {
            id: "1",
            email,
            role: "photographyCompany",
          },
        });
      }
      if (email === "agent@agent.com" && password === "123") {
        resolve({
          token: "this-is-mock-admin-token",
          user: {
            id: "2",
            email,
            role: "agent",
          },
        });
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000);
  });
};
