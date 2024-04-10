class Feature < ApplicationRecord
  enum magnitude_type: {  md: 0, ml: 1, ms: 2, mw: 3, me: 4, mi: 5, mb: 6, mlg: 7 }

  validates :title, :place, :url, :magnitude, :magnitude_type, :lat, :lng, presence: true
  validates :magnitude, numericality: { greater_than_or_equal_to: -1.0, less_than_or_equal_to: 10.0 }
  validates :lat, numericality: { greater_than_or_equal_to: -90.0, less_than_or_equal_to: 90.0 }
  validates :lng, numericality: { greater_than_or_equal_to: -180.0, less_than_or_equal_to: 180.0 } 

  scope :by_magnitude_type, ->(magnitude_types) { where(magnitude_type: magnitude_types) }
end
