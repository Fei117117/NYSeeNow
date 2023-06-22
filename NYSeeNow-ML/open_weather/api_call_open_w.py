#This file will make a call to open weather api
#run this script for 9 days and should reach the full year for NYC
import ow_login
import requests
import json
import time

#start the time on the 1/1/2019
#make sure to start from the most recent day called
start_time=1546300800
#one hour in unix time is 3600 sec
hour=3600
#end time is 1/1/2020
end_time=1577836800


#keeps calls to 960 per day
for j in range(0,16):

    for i in range(0*j,60*j):
        current_time=start_time+hour*i
        print(current_time)
        # Connect to OpenWeather API
        #r = requests.get(ow_login.owUrl, params={'lat': ow_login.owLat, 'lon': ow_login.owLon, 'dt': time 'appid': login.owKey})

        #if r.status_code == 200:
            # If connection successful:
        #    print('Connection to OpenWeather Map successful!')
          #  data = r.json()

            # Extract the information for the current weather
        
    #wait for 61 seconds before repeating, keeps limit to 60 calls per second
    #time.sleep(61)