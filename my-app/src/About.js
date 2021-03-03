import { Card } from "react-bootstrap";

export default function About() {
  return (
    <>
      <br></br>
      <Card>
        <Card.Header as="h5">About</Card.Header>
        <Card.Body>
          <Card.Title>All about me - Ye Jin Kim</Card.Title>
          <Card.Text>
            My name is Ye Jin Kim and I am currently in my fourth semester in
            the Computer Programming & Analysis program and working towards an
            Advanced Diploma at Seneca College. <br></br>
            <br></br>
            This is my assignment of WEB 422 course. For this assignment, I used
            React to create an interface for viewing restaurants and used
            "Restaurants" API on the client-side to produce a rich user
            interface for accessing data.<br></br>
            <br></br>
            To find more about me, please visit my LinkedIn and feel free to
            contact me!
          </Card.Text>

          <div
            class="LI-profile-badge"
            data-version="v1"
            data-size="medium"
            data-locale="ko_KR"
            data-type="horizontal"
            data-theme="light"
            data-vanity="yejinkim5979"
          >
            <a
              class="LI-simple-link"
              href="https://ca.linkedin.com/in/yejinkim5979?trk=profile-badge"
            >
              Ye Jin Kim
            </a>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
