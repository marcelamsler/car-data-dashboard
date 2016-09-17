require 'csv'


class DataImportController < ActionController::Base

  def import
    Dir.foreach('./data/csv/') do |item|
      next if item == '.' or item == '..'
      puts('Import file: ' + item)

      car_id = item[13, 15]
      trip = Trip.create(car_id: car_id)

      last_record = nil
      current_log_entry = nil
      CSV.foreach('./data/csv/' + item) do |row|
        is_header_row = row[0] == 'Latitude'
        unless is_header_row
          key_attributes = {LATITUDE: row[0], LONGITUDE: row[1], RECEIVED_AT: row[2], RECORDED_AT: row[3]}
          current_log_entry = LogEntry.new(trip_id: trip.id, LATITUDE: row[0], LONGITUDE: row[1], RECEIVED_AT: row[2], RECORDED_AT: row[3]) if current_log_entry.nil?

          if last_record == key_attributes
            key = row[4]
            if LogEntry.column_names.include?(key)
              value = row[5]
              current_log_entry[key] = value
            else
              puts 'missing attribute on model: ' + key
            end
          else
            current_log_entry.save!
            last_record = key_attributes
            current_log_entry = nil
          end
        end
      end

    end

    render :nothing => true, :status => 200, :content_type => 'text/html', notice: 'Import Finished'
  end
end