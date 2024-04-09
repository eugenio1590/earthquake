class Feature < ApplicationRecord
  validates :title, :place, :url, :lat, :lng, presence: true
  validates :lat, numericality: { greater_than_or_equal_to: -90.0, less_than_or_equal_to: 90.0 }
  validates :lng, numericality: { greater_than_or_equal_to: -180.0, less_than_or_equal_to: 180.0 } 
end
