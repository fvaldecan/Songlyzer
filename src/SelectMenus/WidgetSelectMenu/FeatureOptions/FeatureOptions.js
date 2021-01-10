import Checkbox from "../Checkbox/Checkbox";

const FeatureOptions = ({
  features: { basic, details, audio_features },
  isChecked,
}) => {
  // disable options when features get chose
  // Ex. can't have certain features together if you want a certain graph
  // or if you choose something like 'title' and the 'energy' feature
  // you can only use the chart 'Plain Text'
  // title, album, album_type (single/album), album release_date, artist,danceability, duration_ms, energy, explicit (yes/no),
  //key, liveness, loudness, popularity, speechiness, tempo, track_number, valence
  return (
    <div>
      Feature Options
      <p>
        <b>Basic</b>
      </p>
      <ul>
        {basic.options.map((feature) => (
          <Checkbox
            key={feature}
            feature={feature}
            isDisabled={basic.disabled}
            isChecked={isChecked}
          />
        ))}
      </ul>
      <p>
        <b>Details</b>
      </p>
      <ul>
        {details.options.map((feature) => (
          <Checkbox
            key={feature}
            feature={feature}
            isDisabled={details.disabled}
            isChecked={isChecked}
          />
        ))}
      </ul>
      <p>
        <b>Audio Features</b>
      </p>
      <ul>
        {audio_features.options.map((feature) => (
          <Checkbox
            key={feature}
            feature={feature}
            isDisabled={audio_features.disabled}
            isChecked={isChecked}
          />
        ))}
      </ul>
    </div>
  );
};
export default FeatureOptions;
