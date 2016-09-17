class CreateTrips < ActiveRecord::Migration[5.0]
  def change
    create_table :trips do |t|
      t.string :rating
      t.integer :car_id

      t.timestamps
    end
  end
end
