import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as tripService from '../../services/tripService';
import { Button } from "react-bootstrap";
//import GoogleMapComponent from "./addMoreDetails/GoogleMaps";
import styles from './TripDetails.module.css'


export default function TripDetails() {
    const [trip, setTrip] = useState({});

    const { _id } = useParams();

    // const checkUser = async () => {
    //     const response = await fetch(`http://localhost:3030/users/me`, { method: 'GET', headers: {
    //         'X-Authorization': localStorage.getItem('accessToken')
    //     } })
    //     const data = await response.json();
    //     console.log(data);
    // }

    

    useEffect(() => {
        tripService.getOne(_id)
            .then(result => setTrip(result));
    }, [_id]);

    return (
        <div>
            <h1>{trip.title} details</h1>

            <div className={styles.buttonContainer}>
                <Button className={styles.addTripButton} variant="outline-info">Edit/ Update</Button> {' '}
                <Button className={styles.addTripButton} variant="outline-info" >Share</Button>{' '}

            </div>
            {/* <div>
                <h1>My React Google Maps App</h1>
                <GoogleMapComponent />
            </div> */}
            <div>
                <h1>Destination: {trip.destination}</h1>
                <p>Start date: {trip.startDate}</p>
                <p>End date: {trip.endDate}</p>
            </div>

        </div>

    )
}