import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import styles from './ItineraryDetailsCard.module.css';
import {
    Chart,
    LinearScale,
    PointElement,
    TimeScale,
    TimeSeriesScale,
    Tooltip,
    Legend,
    CategoryScale,
    BarElement,
} from 'chart.js';
import 'chartjs-adapter-moment';
import moment from "moment";

// Register the necessary components and scales
Chart.register(
    LinearScale,
    PointElement,
    TimeScale,
    TimeSeriesScale,
    Tooltip,
    Legend,
    CategoryScale,
    BarElement

);

const TripEditPage = () => {
    const [tripObj, setTripObj] = useState(null)
    const { state } = useLocation();
    const [tripAttractions, setTripAttractions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [attractions, setAttractions] = useState([]);


    useEffect(() => {
        const fetchAttractions = async () => {
            const response = await axios.get(`/attractions/fetch`);
            setAttractions(response.data);
            console.log(response.data); // Add this line to check the response
        }
        fetchAttractions();
    }, []);


    useEffect(() => {
        const fetchTripAttractions = async () => {
            const tripId = state?.trip_id;
            const username = state?.username;
            const response = await axios.get(`/trip/tripAttraction/${username}/${tripId}`);
            setTripAttractions(response.data);
            setIsLoading(false);
            console.log(response.data); // Add this line to check the response
        }
        if (state?.username && state?.trip_id) {
            fetchTripAttractions();
        }
    }, [state]);


    const handleInputChange = (index, event) => {
        const values = [...tripAttractions];
        if (event.target.name === "date") {
            values[index].date = event.target.value;
        } else {
            values[index].time = event.target.value;
        }
        setTripAttractions(values);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const tripDetails = tripAttractions.map((attraction) => {
            const { date, time, attractionId, prediction } = attraction;
            let visitTime = time + ":00";
            return {
                attractionId,
                date,
                time: visitTime,
                // Only stringify prediction if it's not already a string
                prediction: typeof prediction === 'string' ? prediction : JSON.stringify(prediction),
            };
        });


        try {
            // Change the URL to match your backend endpoint
            const response = await axios.put(`/trip/update/${state.username}/${state.trip_id}`, tripDetails);


            if (response.status === 200) {
                console.log("Data successfully updated");
            } else {
                console.log("Data update failed");
            }
        } catch (error) {
            console.error(error);
        }
    };


    const data = (dayBusyness) => ({
        labels: [...Array(24).keys()].map(i => `${i}:00`),
        datasets: [
            {
                label: 'Busyness',
                data: typeof dayBusyness === 'string' ? JSON.parse(dayBusyness) : dayBusyness,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    });

    const options = {
        scales: {
            x: {
                type: 'category'
            },
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className={styles.ItnDetailsCard}>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {tripAttractions.map((tripAttraction, index) => {
                        // Match attraction id to get the correct attraction object
                        const matchedAttraction = attractions.find(attraction => attraction.attractionId === tripAttraction.attractionId);
                        return (
                            <div key={index}>
                                <div>{matchedAttraction ? matchedAttraction.name : 'Attraction not found'}</div>
                                <label>
                                    Date:
                                    <input
                                        type="date"
                                        name="date"
                                        value={tripAttraction.date}
                                        onChange={event => handleInputChange(index, event)}
                                    />
                                </label>
                                <label>
                                    Time:
                                    <input
                                        type="time"
                                        name="time"
                                        value={tripAttraction.time}
                                        onChange={event => handleInputChange(index, event)}
                                    />
                                </label>
                                <Bar data={data(tripAttraction.prediction)} options={options} />
                            </div>
                        );
                    })}
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );

};

export default TripEditPage;
