import SpotifyAPI from "../../APIs/spotifyAPI";
const tokenReducer = async () => {
  const token = await SpotifyAPI.getToken();
  return await token;
};
export default tokenReducer;
