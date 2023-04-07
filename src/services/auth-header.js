export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user["auth-token"]) {
    return { authorization: `Bearer ${user["auth-token"]}` };
  } else {
    return {};
  }
}
