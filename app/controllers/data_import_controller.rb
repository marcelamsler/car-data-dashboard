require 'csv'


class DataImportController < ActionController::Base

  def import
    Dir.foreach('./data/csv/') do |item|
      next if item == '.' or item == '..'
      puts('Import file: ' + item)

      car_id = item[13, 15]
      trip = Trip.create(car_id: car_id)

      last_recorded_at = nil
      current_log_entry = nil
      CSV.foreach('./data/csv/' + item) do |row|
        is_header_row = row[0] == 'Latitude'
        unless is_header_row
          recorded_at = row[3]

          current_log_entry = initializeLogEntry(recorded_at, trip, row) if current_log_entry.nil?

          if last_recorded_at == recorded_at
            add_attribute(current_log_entry, row)
          else
            current_log_entry.save!
            last_recorded_at = recorded_at
            current_log_entry = initializeLogEntry(recorded_at, trip, row)
            add_attribute(current_log_entry, row)
          end
        end
      end

    end

    render :nothing => true, :status => 200, :content_type => 'text/html', notice: 'Import Finished'
  end

  def initializeLogEntry(recorded_at, trip, row)
    log_entry = LogEntry.find_or_create_by!(RECORDED_AT: recorded_at, trip_id: trip.id)
    log_entry.attributes = {LATITUDE: row[0], LONGITUDE: row[1], RECEIVED_AT: row[2]}
    log_entry
  end

  def add_attribute(current_log_entry, row)
    key = row[4]
    if LogEntry.column_names.include?(key)
      value = row[5]
      current_log_entry[key] = value
    end
  end
end