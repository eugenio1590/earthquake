class AddPayloadToFeatures < ActiveRecord::Migration[7.0]
  def change
    add_column :features, :payload, :string
  end
end
