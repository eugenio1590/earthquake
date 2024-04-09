class FeatureSerializer
  include JSONAPI::Serializer

  set_type :feature

  attributes :id, :title, :place, :time, :tsunami, :magnitude

  attribute :mag_type do |object|
    object.magnitude_type
  end

  attribute :coordinates do |object|
    {
      longitude: object.lng,
      latitude: object.lat
    }
  end

  link :external_url do |object|
    object.url
  end
end