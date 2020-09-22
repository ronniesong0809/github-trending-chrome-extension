async function fetchTrending(range) {
  let url = "https://ghapi.huchen.dev/repositories"

  const response = await fetch(url)
  const data = await response.json()

  for (var i in data) {
    if (data[i].name) {
      document.getElementById("gh-trending").innerHTML +=
        "<span class='badge badge-secondary' style='background-color:" + data[i].languageColor + "'>" + data[i].language + "</span> " + data[i].author + " / " + "<a href='" + data[i].url + "' target='_blank' rel='noopener noreferrer'>" + data[i].name + "</a><br/>" +
        "stars: " + data[i].stars + ", forks: " + data[i].forks + "<hr>"
    }
  }
}

fetchTrending();