import json

#read the JSON file with the best time data
with open('BestTime/fullAddrAll_547.json') as file:
    data = json.load(file)

#separate the data based on status and write to respective files
ok_data = []
error_data = []

for item in data:
    if item['status'] == 'OK':
        ok_data.append(item)
    elif item['status'] == 'Error':
        error_data.append(item)

# Write the OK data to a new JSON file
with open('BestTime/okFullAddrAll.json', 'w') as file:
    json.dump(ok_data, file)

# Write the Error data to a new JSON file
with open('BestTime/errorFullAddrAll.json', 'w') as file:
    json.dump(error_data, file)

