import requests
import json

# Read the JSON file with top 12 attractions
with open('top_12_Attractions.json') as file:
    data = json.load(file)

url = "https://besttime.app/api/v1/forecasts"
responses = []  # List to store the responses
key='pri_b6c22e039524443298cc7c4ed37a6c9a'

for i in range(0, len(data), 2):
    params = {
        'api_key_private': keyyyy,
        'venue_name': data[i],
        'venue_address': data[i + 1],
    }
    response = requests.request("POST", url, params=params)
    responses.append(response.json())

# Write the responses to a JSON file
with open('responses.json', 'w') as file:
    json.dump(responses, file)
