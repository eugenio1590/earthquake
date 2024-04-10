namespace :data_import do
  desc "Import features from external source"
  task import_features: :environment do
    response = HTTParty.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson')
    data = JSON.parse(response.body)
    data['features'].map do |feature_data|
      params = {
        payload: feature_data['id'],
        title: feature_data['properties']['title'],
        place: feature_data['properties']['place'],
        url: feature_data['properties']['url'],
        time: Time.at(feature_data['properties']['time'] / 1000), # Convert UNIX timestamp to Time object
        tsunami: feature_data['properties']['tsunami'],
        lat: feature_data['geometry']['coordinates'][1],
        lng: feature_data['geometry']['coordinates'][0],
        magnitude: feature_data['properties']['mag'],
        magnitude_type: feature_data['properties']['magType']
      }

      Feature.create!(params)
    rescue => e
      Rails.logger.error(e.message)
      next
    end
  end
end
