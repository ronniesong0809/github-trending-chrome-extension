async function fetchTrending(range) {
  let url = "https://ghapi.huchen.dev/repositories"

  const response = await fetch(url)
  const data = await response.json()

  for (var i in data) {
    if (data[i].name) {
      document.getElementById("gh-trending").innerHTML +=
        "<hr/><div style='padding-left:15px;padding-right:15px'>" +
        "<span class='badge badge-secondary' style='background-color:" + data[i].languageColor + "'>" + data[i].language + "</span> <a href='" + data[i].url + "' target='_blank' rel='noopener noreferrer'>" + data[i].author + " / " + data[i].name + "</a><br/>" +
        '<span>"' + data[i].description + '"</span>' + "<br/>" +
        "<i class='far fa-star'></i> " + data[i].stars + " (+" + data[i].currentPeriodStars + " today) <i class='fas fa-code-branch' style='margin-left:10px'></i> " + data[i].forks + "</div>"
    }
  }
}

fetchTrending();