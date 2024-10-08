let url = "http://localhost:5000";
const create = async (params, credentials, post) => {
  try {
    let response = await fetch(`${url}/api/posts/new/` + params.userId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: post,
    });
    // post.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const listByUser = async (params, credentials) => {
  try {
    let response = await fetch(`${url}/api/posts/by/` + params.userId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const listNewsFeed = async (params, credentials, signal) => {
  try {
    let response = await fetch(`${url}/api/posts/feed/` + params.userId, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log("error from newsF", err);
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await fetch(`${url}/api/posts/` + params.postId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const like = async (params, credentials, postId) => {
  try {
    let response = await fetch(`${url}/api/posts/like/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify({ userId: params.userId, postId: postId }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const unlike = async (params, credentials, postId) => {
  try {
    let response = await fetch(`${url}/api/posts/unlike/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify({ userId: params.userId, postId: postId }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const comment = async (params, credentials, postId, comment) => {
  try {
    let response = await fetch(`${url}/api/posts/comment/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify({
        userId: params.userId,
        postId: postId,
        comment: comment,
      }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const uncomment = async (params, credentials, postId, comment) => {
  try {
    let response = await fetch(`${url}/api/posts/uncomment`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify({
        userId: params.userId,
        postId: postId,
        comment: comment,
      }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export {
  listNewsFeed,
  listByUser,
  create,
  remove,
  like,
  unlike,
  comment,
  uncomment,
};
