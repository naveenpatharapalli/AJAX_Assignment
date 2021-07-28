var form = document.getElementById("myForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  var search = document.getElementById("search").value;

  //ajax call (Standard)

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let res = JSON.parse(this.response); //missed initially
      console.log(res);
      var name = res.name == null ? res.login : res.name;
      document.getElementById(
        "result"
      ).innerHTML = `<div class="flip-card-inner">
      <div class="flip-card-front">
        <img src="${res.avatar_url}" class="img-thumbnail" alt="avatar">
      </div>
      <div class="flip-card-back">
        <h1>${name}</h1> 
        <a class="btn btn-primary" target="_blank" href="${res.html_url}" role="button">Git Profile</a>
      </div>
    </div>`;
    }
  };
  xhttp.open("GET", `https://api.github.com/users/${search}`, true);
  xhttp.send();
});

//fetch call working

// fetch("https://api.github.com/users/" + search)
//     .then((result) => result.json())
//     .then((data) => {
//       console.log(data);
//       document.getElementById(
//         "result"
//       ).innerHTML = `<div class="flip-card-inner">
//       <div class="flip-card-front">
//         <img src="${data.avatar_url}" class="img-thumbnail" alt="avatar">
//       </div>
//       <div class="flip-card-back">
//         <h1>${data.name}</h1>
//         <a class="btn btn-primary" target="_blank" href="${data.html_url}" role="button">Git Profile</a>
//       </div>
//     </div>`;
//     });
//});

//Ajax Jquery Not Working

// $("button").click(function () {
//   var search = document.getElementById("search").value;
//   alert(search);
//   $.ajax({
//     url: "https://api.github.com/users/" + search,
//     success: function (result) {
//       console.log("Response", result);
//       alert("Success");
//     },
//   });
// });
// });
