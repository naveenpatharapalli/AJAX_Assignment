var form = document.getElementById("myForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  var search = document.getElementById("search").value;

  fetch("https://api.github.com/users/" + search)
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      document.getElementById(
        "result"
      ).innerHTML = `<div class="flip-card-inner">
      <div class="flip-card-front">
        <img src="${data.avatar_url}" class="img-thumbnail" alt="avatar">
      </div>
      <div class="flip-card-back">
        <h1>${data.name}</h1> 
        <a class="btn btn-primary" target="_blank" href="${data.html_url}" role="button">Git Profile</a>
      </div>
    </div>`;
    });
});
