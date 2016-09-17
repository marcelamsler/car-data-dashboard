# require 'csv'
#
# Dir.foreach('./data/csv/') do |item|
#   next if item == '.' or item == '..'
#   puts('Import file: ' + item)
#
#   CSV.foreach('./data/csv/' + item) do |row|
#     if row[0] != 'Latitude'
#       key_name = row[4]
#       if LogEntry.column_names.include?(key_name)
#         log_entry = LogEntry.find_or_create_by(LATITUDE:row[0], LONGITUDE:row[1], RECEIVED_AT:row[2], RECORDED_AT:row[3])
#         value = row[5]
#         log_entry[key_name] = value
#         log_entry.save!
#       end
#     end
#   end
#   puts LogEntry.count
#   puts('Finished Import')
# end