async function fetchTrending(range) {
  let url = "https://ghapi.huchen.dev/repositories?since=" + range

  const response = await fetch(url)
  const data = await response.json()

  document.getElementById("gh-trending").innerHTML = ""

  for (var i in data) {
    if (data[i].name) {
      document.getElementById("gh-trending").innerHTML +=
        "<hr/><div style='padding-left:15px;padding-right:15px'>" +
        "<img src='" + data[i].avatar + "' style='width:15px;height:15px;margin-right:5px;vertical-align:inherit' SameSite/>" + "<a href='" + data[i].url + "' target='_blank' rel='noopener noreferrer'>" + data[i].author + " / " + data[i].name + "</a> <br/>" +
        '<span>"' + data[i].description + '"</span>' + "<br/>" +
        "<span class='badge badge-secondary' style='background-color:" + data[i].languageColor + "'>" + data[i].language + "</span> <i class='far fa-star' style='margin-left:10px'></i> " + data[i].stars + " (+" + data[i].currentPeriodStars + " today) <i class='fas fa-code-branch' style='margin-left:10px'></i> " + data[i].forks + "</div>"
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