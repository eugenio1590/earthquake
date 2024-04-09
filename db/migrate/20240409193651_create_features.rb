class CreateFeatures < ActiveRecord::Migration[7.0]
  def change
    create_table :features do |t|
      t.string :title
      t.string :place
      t.string :url
      t.timestamp :time
      t.boolean :tsunami
      t.decimal :lat
      t.decimal :lng

      t.timestamps
    end
  end
end
