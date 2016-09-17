class AddAttributesToTrip < ActiveRecord::Migration[5.0]
  def change
    change_table :trips do |t|
      t.numeric :break_mean
      t.numeric :break_var
      t.numeric :break_med

      t.numeric :accel_mean
      t.numeric :accel_var
      t.numeric :accel_med

      t.numeric :lat_mean
      t.numeric :lat_var
      t.numeric :lat_med
      end
  end
end