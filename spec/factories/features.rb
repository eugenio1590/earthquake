FactoryBot.define do
  factory :feature do
    title { "Title" }
    place { "Place" }
    url { "http://localhost" }
    time { Time.current }
    tsunami { false }
    lat { 40.7128 }
    lng { -74.0060 }
  end
end