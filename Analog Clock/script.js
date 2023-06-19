setInterval(() => {
    date = new Date();
    htime = date.getHours();
    mtime = date.getMinutes();
    stime = date.getSeconds();

    hrotation = 30*htime + mtime/2;
    mrotation = 6*mtime;
    srotation = 6*stime;

    hour.style.transform = `rotate(${hrotation}deg)`;
    minute.style.transform = `rotate(${mrotation}deg)`;
    second.style.transform = `rotate(${srotation}deg)`;

    var local = date.toLocaleDateString();
    document.getElementById("local-date").innerHTML = local;
}, 1000);

var zoneLocal = Intl.DateTimeFormat().resolvedOptions().timeZone;

fetch('https://api.timezonedb.com/v2.1/list-time-zone?key=YOUR_KEY&format=json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var timeZone = data.zones.find(function(zone) {
      return zone.zoneName === zoneLocal;
    });

    var place = timeZone ? timeZone.countryName : 'Unknown';
    var locationElement = document.getElementById('location');
    locationElement.textContent = zoneLocal + place;
  })
  .catch(function(error) {
    console.log('Error: ' + error);
  });
