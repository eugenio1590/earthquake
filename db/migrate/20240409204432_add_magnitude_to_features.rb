class AddMagnitudeToFeatures < ActiveRecord::Migration[7.0]
  def change
    add_column :features, :magnitude, :decimal
    add_column :features, :magnitude_type, :integer
  end
end
