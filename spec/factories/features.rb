FactoryBot.define do
  factory :feature do
    title { "Title" }
    place { "Place" }
    url { "http://localhost" }
    time { Time.current }
    tsunami { false }
    magnitude_type { :md }
    magnitude { 7.0 }
    lat { 40.7128 }
    lng { -74.0060 }
    sequence(:payload) { |n| "payload#{n}"}
  end
end