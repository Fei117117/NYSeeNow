import json

# Read the JSON file obtained from Overpass Turbo
with open('attractions/attractions.geojson') as file:
    data = json.load(file)

# Extract the attraction names from the geoJSON data
attractions = []
processed_attractions = set()  # To store the names of already processed attractions

for feature in data['features']:
    name = feature['properties'].get('name')
    print(name)
    house_num= feature['properties'].get('addr:housenumber')
    street = feature['properties'].get('addr:street')
    city = feature['properties'].get('addr:city')
    state = feature['properties'].get('addr:state')
    postcode = feature['properties'].get('addr:postcode')
    #process the address in data to account for empty fields
    if house_num is None:
        house_num = 'NAN'
    if street is None:
        street = 'NAN'
    if city is None:
        city = 'NAN'
    if state is None:
        state = 'NAN'
    if postcode is None:
        postcode = 'NAN'

    address = house_num+' '+street+' '+city+' '+state+' '+postcode
    print(address)
    if name in attractions and name not in processed_attractions:
        attractions.append(name)
        attractions.append(address)
        processed_attractions.add(name)
        print(f"Name: {name}")
        print(f"Address: {address}")
        print("--------------")

# Write all attractions and their addresses to a JSON file
with open('attractions/processed_attractions.json', 'w') as file:
    json.dump(attractions, file, indent=2)
