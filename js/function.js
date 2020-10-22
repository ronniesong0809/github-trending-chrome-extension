async function fetchTrending(range) {
  let url = "https://gtrend.yapie.me/repositories?since=" + range

  const response = await fetch(url)
  const data = await response.json()

  function dateRange(range) {
    if (range == "daily")
      return "today"
    else if (range == "weekly")
      return "this week"
    else
      return "this month"
  }

  document.getElementById("gh-trending").innerHTML = ""

  for (var i in data) {
    if (data[i].name) {
      var project = "<a href='https://github.com/" + data[i].author + "' target='_blank' rel='noopener noreferrer'><img src='" + data[i].avatar + "'/></a>" +
        "<a href='" + data[i].url + "' target='_blank' rel='noopener noreferrer'>" + data[i].author + " / " + data[i].name + "</a> <br/>"

      var description = (data[i].description != "" ? '<span>"' + data[i].description + '"</span>' + "<br/>" : "")

      var starsForks = "<span class='badge badge-secondary' style='background-color:" + data[i].languageColor + "'>" + data[i].language + "</span> " +
        "<a href='" + data[i].url + "/stargazers' target='_blank' rel='noopener noreferrer'>" +
        "<i class='fas fa-star'></i><span id='starFork'>" + data[i].stars.toLocaleString() + "</span>" +
        "</a>" +
        " <span class='popup' id='grayText'>&uarr;" + data[i].currentPeriodStars.toLocaleString() +
        "<span class='popupText'>" + data[i].currentPeriodStars + " stars " + dateRange(range) + "</span> " +
        "</span>" +
        "<a href='" + data[i].url + "/network/members' target='_blank' rel='noopener noreferrer'>" +
        "<i class='fas fa-code-branch'></i><span id='starFork'>" + data[i].forks.toLocaleString() + "</span>" +
        "</a>"

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
