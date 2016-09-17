# Dir.foreach('/path/to/dir') do |item|
#   next if item == '.' or item == '..'
#   # do work on real items
# end
require 'csv'

Dir.foreach('./data/csv/') do |item|
  next if item == '.' or item == '..'
  puts('Import file: ' + item)

  CSV.foreach('./data/csv/' + item) do |row|
    if row[0] != 'Latitude'
      if LogEntrie.column_names.include?(row[4])
        logentrie = LogEntrie.find_or_create_by(LATITUDE:row[0], LONGITUDE:row[1], RECEIVED_AT:row[2], RECORDED_AT:row[3])
        logentrie[row[4]] = row[5]
        logentrie.save!
      end
    end
  end
  puts LogEntrie.count
  puts('Finished Import')
end