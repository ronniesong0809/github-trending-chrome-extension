async function fetchTrending(range) {
  let url = "https://ghapi.huchen.dev/repositories?since=" + range

  const response = await fetch(url)
  const data = await response.json()

  document.getElementById("gh-trending").innerHTML = ""

  for (var i in data) {
    if (data[i].name) {
      var project = "<img src='" + data[i].avatar + "'/>" + 
        "<a href='" + data[i].url + "' target='_blank' rel='noopener noreferrer'>" + data[i].author + " / " + data[i].name + "</a> <br/>"

      var description = (data[i].description!="" ? '<span>"' + data[i].description + '"</span>' + "<br/>" : "")

      var starsForks = "<span class='badge badge-secondary' style='background-color:" + data[i].languageColor + "'>" + data[i].language + "</span> " + 
        "<i class='far fa-star'></i> " + data[i].stars + "<span id='grayText'>+" + data[i].currentPeriodStars + " today</span> " + 
        "<i class='fas fa-code-branch'></i> " + data[i].forks

      document.getElementById("gh-trending").innerHTML +=
        "<hr/>" + 
        "<div id='repo'>" +
          project + description + starsForks + 
        "</div>"
    }
  }
}

var dateRange = "daily"
var button = document.getElementById("dateRange-button")
button.onclick = change;

function change() {
  if (dateRange == "daily") {
    button.className = "btn btn-outline-success"
    button.innerHTML = "Weekly"
    dateRange = "weekly"
  } else if (dateRange == "weekly") {
    button.className = "btn btn-outline-danger"
    button.innerHTML = "Monthly"
    dateRange = "monthly"
  } else {
    button.className = "btn btn-outline-primary"
    button.innerHTML = "Daily"
    dateRange = "daily"
  }
  fetchTrending(dateRange);
}

fetchTrending(dateRange);