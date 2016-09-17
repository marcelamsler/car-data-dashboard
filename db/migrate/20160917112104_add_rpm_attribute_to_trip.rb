class AddRpmAttributeToTrip < ActiveRecord::Migration[5.0]
  def change
    change_table :trips do |t|
      t.numeric :rpm_mean
      t.numeric :rpm_var
      t.numeric :rpm_med
    end
  end
end
