import ReactOnRails from 'react-on-rails';

import Earthquakes from '../bundles/Earthquakes/components/EarthquakesServer';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Earthquakes,
});
