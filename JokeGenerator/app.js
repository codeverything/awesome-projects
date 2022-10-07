function getJoke () {
    var joke = document.getElementById("joke")
    fetch("https://api.chucknorris.io/jokes/random")
        .then((data) => data.json())
        .then((item) =>{
           joke.innerHTML = item.value
    })
    
  }