class CreateCars < ActiveRecord::Migration[5.0]
  def change
    create_table :cars do |t|
      t.integer :car_id
      t.numeric :rpm_avg
      t.numeric :brake_avg
      t.numeric :accel_avg
      t.numeric :lat_avg
    end
  end
end
