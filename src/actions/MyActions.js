export const setTokenAction = (token_from_login) => ({
  type: "SET_TOKEN",
  payload: token_from_login,
});

export const loadingAction = (true_or_false_loading) => ({
  type: "LOADING",
  payload: true_or_false_loading,
});

export const authorizeAction = (true_or_false_authorized) => ({
  type: "AUTHORIZE",
  payload: true_or_false_authorized,
});

export const updateProfileInfoAction = (four_things) => ({
  type: "UPDATEPROFILEINFO",
  payload: four_things,
});

export const checkLastPostAction = (last_post_date) => ({
  type: "CHECKLASTPOST",
  payload: last_post_date,
});

export const setUsernameAction = (username) => ({
  type: "SETUSERNAME",
  payload: username,
});
export const setPasswordAction = (password) => ({
  type: "SETPASSWORD",
  payload: password,
});

export const logOutAction = (nothing_here) => ({
  type: "LOGOUT",
  payload: nothing_here,
});

export const getRecentBlogAction = (res_from_getting_blog) => ({
  type: "GETRECENTBLOG",
  payload: res_from_getting_blog,
});

export const getPostsAction = (res_from_getting_posts) => ({
  type: "GETPOSTS",
  payload: res_from_getting_posts,
});

export const getHabitsAction = (res_from_getting_habits) => ({
  type: "GETHABITS",
  payload: res_from_getting_habits,
});

export const setEmailAction = (email_for_password) => ({
  type: "SETEMAIL",
  payload: email_for_password,
});

export const getExpoAction = (expo_token) => ({
  type: "GETEXPO",
  payload: expo_token,
});

export const setExpoAction = (expo_token) => ({
  type: "SETEXPO",
  payload: expo_token,
});

export const unsetExpoAction = (nothing_here) => ({
  type: "UNSETEXPO",
  payload: nothing_here,
});