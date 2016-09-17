require 'csv'
require 'descriptive_statistics'

class DataImportController < ActionController::Base

  def update
    trips = Trip.all
    trips.each do |trip|
      currentTripRpm = LogEntry.where("trip_id = ? and \"MDI_OBD_RPM\" IS NOT NULL AND \"MDI_OBD_RPM\" > 0 ", trip.id).pluck(:"MDI_OBD_RPM")
      print currentTripRpm
      if currentTripRpm.length > 0
        trip.rpm_mean = currentTripRpm.mean
        trip.rpm_var = Math.sqrt(currentTripRpm.variance)
        trip.rpm_med = currentTripRpm.median
        trip.save!
      end

      currentTripBreak = LogEntry.where("trip_id = ? and \"BEHAVE_ACC_X_PEAK\" IS NOT NULL AND \"BEHAVE_ACC_X_PEAK\" <= 0 ", trip.id).pluck(:"BEHAVE_ACC_X_PEAK")
      currentTripBreak.map{|n| n.abs()}
      print currentTripBreak
      if currentTripBreak.length > 0
        trip.break_mean = currentTripBreak.mean
        trip.break_var =  Math.sqrt(currentTripBreak.variance)
        trip.break_med = currentTripBreak.median
        trip.save!
      end

      currentTripAccel = LogEntry.where("trip_id = ? and \"BEHAVE_ACC_X_PEAK\" IS NOT NULL AND \"BEHAVE_ACC_X_PEAK\" >= 0 ", trip.id).pluck(:"BEHAVE_ACC_X_PEAK")
      currentTripAccel.map{|n| n.abs()}
      print currentTripAccel
      if currentTripAccel.length > 0
        trip.accel_mean = currentTripAccel.mean
        trip.accel_var =  Math.sqrt(currentTripAccel.variance)
        trip.accel_med = currentTripAccel.median
        trip.save!
      end

      currentTripLat = LogEntry.where("trip_id = ? and \"BEHAVE_ACC_Y_PEAK\" IS NOT NULL", trip.id).pluck(:"BEHAVE_ACC_Y_PEAK")
      currentTripLat.map{|n| n.abs()}
      print currentTripLat
      if currentTripAccel.length > 0
        trip.lat_mean = currentTripLat.mean
        trip.lat_var =  Math.sqrt(currentTripLat.variance)
        trip.lat_med = currentTripLat.median
        trip.save!
      end

    end
    render :nothing => true, :status => 200, :content_type => 'text/html', notice: 'Import Finished'
  end


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
            gyro_data = CSV.read('./data/csv/behave/' + item[0..-5] + '_BEHAVE.csv')
            rows_for_before_recorded_at = gyro_data.select {|data_row| data_row[3] == last_recorded_at}
            rows_for_before_recorded_at.each do |data_row|
              add_attribute(current_log_entry, data_row)
            end

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