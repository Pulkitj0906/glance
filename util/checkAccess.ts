import axios from "axios";

export const fetchUserInfo = async () => {
  try {
    const res = await axios.get("/api/user/verify");
    return res.data.slug;
  } catch (error) {
    console.log("error fetching user info", error);
  }
};
