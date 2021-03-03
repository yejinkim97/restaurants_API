import { useState, useEffect } from "react";
import { Pagination, Table, Card } from "react-bootstrap";
import queryString from "query-string";
import { useHistory } from "react-router-dom";

export default function Restaurants(props) {
  let queryBorough = queryString.parse(props.query).borough;
  const [restaurants, setRestaurants] = useState(null);
  const [page, setPage] = useState(1);
  let history = useHistory();
  if (queryBorough === undefined) {
    queryBorough = "";
  }
  useEffect(() => {
    fetch(
      `https://frozen-dusk-43857.herokuapp.com/api/restaurants?page=${page}&perPage=10&borough=${queryBorough}`
    )
      .then((res) => res.json())
      .then((rest) => {
        setRestaurants(rest);
      });
  }, [page, queryBorough]);

  console.log(restaurants);

  function previousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }
  function nextPage() {
    setPage(page + 1);
  }

  if (!restaurants) {
    return (
      <div>
        <br></br>
      <Card bg="light">
        <Card.Body>Loading Restaurants...</Card.Body>
      </Card>
      </div>
    );
  }
  if (restaurants == null) {
    return (
      <div>
        <br></br>
      <Card bg="light">
        <Card.Body>No Restaurants Found</Card.Body>
      </Card>
      </div>
    );
  } else {
    if (restaurants.length > 0) {
      return (
        <div>
          <br></br>
          <Card bg="light">
            <Card.Body>
              <Card.Title>Restaurant List</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Full list of restaurants. Optionally sorted by borough
              </Card.Subtitle>
            </Card.Body>
          </Card>
          <br></br>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Borough</th>
                <th>Cuisine</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => (
                <tr
                  key={restaurant._id}
                  onClick={() => {
                    history.push(`/restaurant/${restaurant._id}`);
                  }}
                >
                  <td>{restaurant.name}</td>
                  <td>
                    {restaurant.address.building} {restaurant.address.street}
                  </td>
                  <td>{restaurant.borough}</td>
                  <td>{restaurant.cuisine}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            <Pagination.Prev onClick={previousPage} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={nextPage} />
          </Pagination>
        </div>
      );
    } else {
      return (
        <Card>
          <Card.Body>No Restaurants Found</Card.Body>
        </Card>
      );
    }
  }
}
