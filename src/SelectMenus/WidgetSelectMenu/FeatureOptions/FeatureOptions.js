import Checkbox from "../Checkbox/Checkbox";

const FeatureOptions = ({ features, isChecked }) => {
  // disable options when features get chose
  // Ex. can't have certain features together if you want a certain graph
  // or if you choose something like 'title' and the 'energy' feature
  // you can only use the chart 'Plain Text'
  // title, album, album_type (single/album), album release_date, artist,danceability, duration_ms, energy, explicit (yes/no),
  //key, liveness, loudness, popularity, speechiness, tempo, track_number, valence
  // console.log(features);
  const basic = [
    "song_title",
    "album_title",
    "artist_name",
    "album_cover",
    "artist_image",
  ];
  const details = [
    "album_type",
    "track_number",
    "release_date",
    "key",
    "duration",
    "explicit",
    "lyrics",
  ];
  const audioFeatures = [
    "acousticness",
    "danceability",
    "energy",
    "happiness",
    "liveness",
    "loudness",
    "popularity",
    "sadness",
    "speechiness",
    "tempo",
  ];
  return (
    <div>
      Feature Options
      <p>
        <b>Basic</b>
      </p>
      <ul>
        {features.map(({ name, disabled, checked }) =>
          basic.includes(name) ? (
            <Checkbox
              key={name}
              feature={name}
              isDisabled={disabled}
              isChecked={isChecked}
              checked={checked}
            />
          ) : null
        )}
      </ul>
      <p>
        <b>Details</b>
      </p>
      <ul>
        {features.map(({ name, disabled, checked }) =>
          details.includes(name) ? (
            <Checkbox
              key={name}
              feature={name}
              isDisabled={disabled}
              isChecked={isChecked}
              checked={checked}
            />
          ) : null
        )}
      </ul>
      <p>
        <b>Audio Features</b>
      </p>
      <ul>
        {features.map(({ name, disabled, checked }) =>
          audioFeatures.includes(name) ? (
            <Checkbox
              key={name}
              feature={name}
              isDisabled={disabled}
              isChecked={isChecked}
              checked={checked}
            />
          ) : null
        )}
      </ul>
    </div>
  );
};
export default FeatureOptions;
