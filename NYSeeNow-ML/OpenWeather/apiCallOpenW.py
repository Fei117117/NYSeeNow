#This file will make a call to open weather api
#run this script for 9 days and should reach the full year for NYC
import owLogin
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

start_time=0

#keeps calls to 960 per day
for j in range(1,17):
    start_time=start_time+hour*61*(j-1)
    for i in range((j-1)*(61*j),61*j):
        current_time=start_time+hour*i
        print(current_time)
        # Connect to OpenWeather API
        #r = requests.get(ow_login.owUrl, params={'lat': ow_login.owLat, 'lon': ow_login.owLon, 'dt': time 'appid': login.owKey})

        #if r.status_code == 200:
            # If connection successful:
        #    print('Connection to OpenWeather Map successful!')
          #  data = r.json()

            # Extract the information for the current weather
    if j==4:
        break
    #wait for 61 seconds before repeating, keeps limit to 60 calls per second
    #time.sleep()