var form = document.getElementById("myForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  var search = document.getElementById("search").value;
  var search = search.split(" ").join("");

  sessionStorage.setItem("username", search);

  //ajax call (Standard)

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let res = JSON.parse(this.response); //missed initially
      console.log(res);
      var name = res.name == null ? res.login : res.name;
      document.getElementById("result").innerHTML = `
      <div class="flip-card-inner">
      <div class="flip-card-front">
        <img src="${res.avatar_url}" class="img-thumbnail" alt="avatar">
        <h1>${name}</h1> 
      </div>
      <div class="flip-card-back">
        <h1>${name}</h1> 
        <a class="btn btn-primary" target="_blank" href="${res.html_url}" role="button">Git Profile</a>
        <button type="button" target="_blank" onClick = "ModalEvent()" class="btn btn-primary" data-toggle="modal" data-target="#myModal">Git Repo's</button>
      </div>
    </div> `;
    }
    if (this.status == 404 && this.readyState == 4) {
      alert("user not found");
    }
    if (this.status != 200 && this.status != 404 && this.readyState == 4) {
      alert("Something Went Wrong " + this.status);
    }
  };
  xhttp.open("GET", `https://api.github.com/users/${search}`, true);
  xhttp.send();
});

function ModalEvent() {
  var xhr = new XMLHttpRequest();
  var user = sessionStorage.getItem("username");
  var inHtm = "";
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let res = JSON.parse(this.response); //missed initially
      console.log(res);
      for (const item of res) {
        inHtm += `<tr>
          <td>${item.name}</td>
          <td><a class="btn btn-primary" target="_blank" href="${item.clone_url}" role="button">Git Repo</a></td>
        </tr>`;
      }
      document.getElementById("modelbody").innerHTML = inHtm;
    }
    if (this.status != 200 && this.readyState == 4) {
      alert("Something Went Wrong" + this.status);
    }
  };
  xhr.open("GET", `https://api.github.com/users/${user}/repos`, true);
  xhr.send();
}

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
