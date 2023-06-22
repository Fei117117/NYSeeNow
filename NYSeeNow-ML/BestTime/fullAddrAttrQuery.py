###############################################################
# This script queries the BestTime API for the best time to visit
#Use it conservatively

import requests
import json

# Read the JSON file with the processed attractions
with open('Attractions/fullAddrProcessedAttractions.json') as file:
    data = json.load(file)

url = "https://besttime.app/api/v1/forecasts"
responses = []  # List to store the responses


start=0
end=20
#the number of venues (end-start)/2
step=2
#left misspelled on purpose to avoid accidental queries
private_k='pri_b6c22e039524443298cc7c4ed37a6c9a'

for i in range(start, end, step):
    params = {
        'api_key_private': private_key,
        'venue_name': data[i],
        'venue_address': data[i + 1],
    }
    response = requests.request("POST", url, params=params)
    responses.append(response.json())

# Write the responses to a JSON file
with open('BestTime/fullAddr_1_10.json', 'w') as file:
    json.dump(responses, file)
