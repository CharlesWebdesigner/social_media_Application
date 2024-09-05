const signUser = async (user) => {
  let url = "http://localhost:5000";
  try {
    let response = await fetch(`${url}/auth/signin`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
// exports = {
//   signUser,
// };
export default signUser;
