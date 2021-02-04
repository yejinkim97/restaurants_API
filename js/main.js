/*********************************************************************************
 * WEB422 – Assignment 2
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Ye Jin Kim      Student ID: 163291180         Date: Feb 4th, 2021
 *
 *
 ********************************************************************************/
let restaurantData = [];
let currentRestaurant = {};
let page = 1;
const perPage = 10;
let map = null;

function avg(grades) {
  let total = 0;
  for (let i = 0; i < grades.length; i++) {
    total = +grades[i].score;
  }
  return (total / grades.length).toFixed(2);
}

const tableRows = _.template(`
<% _.forEach(restaurants, function(restaurant) {  %>
    <tr data-id= <%-restaurant._id%>>
    <td><%-restaurant.name%></td>
    <td><%-restaurant.cuisine%></td>
    <td><%-restaurant.address.building%> <%-restaurant.address.street%></td>
    <td><%-avg(restaurant.grades)%></td>
    </tr>
    <% }); %>
`);

function loadRestaurantData() {
  fetch(
    `https://frozen-dusk-43857.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("fetching data");

      restaurantData = data;
      let returnedRows = tableRows({ restaurants: data });
      $("#restaurant-table tbody").html(returnedRows);
      $("#current-page").html(page);
    })
    .catch((err) => {
      console.log(`Error fetching from server: ${err}`);
    });
}

$(function () {
  console.log("DOM is ready!");
  loadRestaurantData();

  //Additional css
  $("#css tr").hover(
    function () {
      $(this).addClass("hover");
    },
    function () {
      $(this).removeClass("hover");
    }
  );

  $("#restaurant-table tbody").on("click", "tr", function () {
    var dataId = $(this).attr("data-id");
    console.log(dataId);

    for (let i = 0; i < restaurantData.length; i++) {
      if (restaurantData[i]._id == dataId) {
        currentRestaurant = restaurantData[i];
        console.log(currentRestaurant);
        $(".modal-title").html(currentRestaurant.name);
        $("#restaurant-address").html(
          `${currentRestaurant.address.building} ${currentRestaurant.address.street}`
        );

        $("#restaurant-modal").modal({
          backdrop: "static",
          keyboard: false,
        });
      }
    }
  });

  $("#previous-page").on("click", function () {
    if (page > 1) {
      page--;
      loadRestaurantData();
    }
  });

  $("#next-page").on("click", function () {
    page++;
    loadRestaurantData();
  });

  $("#restaurant-modal").on("shown.bs.modal", function () {
    map = new L.Map("leaflet", {
      center: [
        currentRestaurant.address.coord[1],
        currentRestaurant.address.coord[0],
      ],
      zoom: 18,
      layers: [
        new L.TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),
      ],
    });
    L.marker([
      currentRestaurant.address.coord[1],
      currentRestaurant.address.coord[0],
    ]).addTo(map);
  });
  $("#restaurant-modal").on("hidden.bs.modal", function () {
    map.remove();
  });
});
