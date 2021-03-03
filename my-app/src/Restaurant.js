import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Card, CardDeck } from "react-bootstrap";
import moment from "moment";
export default function Restaurant(props) {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://frozen-dusk-43857.herokuapp.com/api/restaurants/${props.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.hasOwnProperty("_id")) {
          setRestaurant(data);
        } else {
          setRestaurant(null);
        }
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [props.id]);

  if (loading) {
    return (
      <Card>
        <Card.Body>Loading Restaurants...</Card.Body>
      </Card>
    );
  } else {
    if (restaurant == null) {
      return (
        <Card>
          <Card.Body>Unable to find Restaurant with id: {props.id}</Card.Body>
        </Card>
      );
    } else {
      return (
        <>
          <br></br>
          <Card bg="light">
            <Card.Body>
              <Card.Title>{restaurant.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {restaurant.address.building} {restaurant.address.street}
              </Card.Subtitle>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
          <br></br>
          <MapContainer
            style={{ height: "400px" }}
            center={[restaurant.address.coord[1], restaurant.address.coord[0]]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[
                restaurant.address.coord[1],
                restaurant.address.coord[0],
              ]}
            ></Marker>
          </MapContainer>
          <hr></hr>
          <h3>Ratings</h3>

          <CardDeck>
            {restaurant.grades.map((rest, id) => {
              return (
                <Card key={`${id}`}>
                  <Card.Header>Grade: {rest.grade}</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      Completed: {moment(rest.date).format("L")}
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </CardDeck>
          <hr></hr>
        </>
      );
    }
  }
}
