let imgArr = [
  "img/eleanor.jpg",
  "img/charger.jpg",
  "img/chevrolet.jpg",
  "img/eleanor.jpg",
];
$(document).ready(() => {
  $("body").append(
    '<div id="zoom"><div><img /><button id="close">&#10799;</button><span id = "left_sp"><button id="left_arr">&#60;</button></span><span id="right_sp"><button id="right_arr">&#62;</button></span></div></div>'
  );
  $("#zoom")
    .css({
      position: "fixed",
      "z-index": "95",
      top: "0",
      left: "0",
      width: "100%",
      height: "100vh",
      background: "rgba(0,0,0,.8)",
      display: "none",
    })
    .click(close);
  $("#zoom>div").css({
    width: "70vw",
    height: "80vh",
    border: "10px solid #fff",
    background: "#fff",
    position: "relative",
    margin: "auto",
  });
  $("#zoom>div>img")
    .css({ width: "100%", height: "100%", "object-fit": "cover" })
    .click((e) => e.stopPropagation()); //деактивация клика на елементе
  $("#close, #left_arr, #right_arr")
    .css({
      position: "absolute",
      top: "-20px",
      right: "-20px",
      width: "26px",
      height: "26px",
      outline: "none",
      border: "2px solid #fff",
      "border-radius": "50%",
      background: "#000",
      font: "1.2em/.5 Arial",
      color: "#fff",
      "box-shadow": "1px 1px0 black",
      cursor: "pointer",
    })
    .click(close);

  $("#left_sp, #right_sp")
    .css({
      position: "absolute",
      "z-index": "99",
      display: "inline-block",
      height: "100%",
      cursor: "pointer",
    })
    .width(() => $("#zoom>div").width() / 4);
  $("#left_sp")
    .css({ left: "0" })
    .hover(
      function () {
        $("#left_arr").fadeIn();
      },
      function () {
        $("#left_arr").fadeOut();
      }
    );
  //.click(()=> prev());
  $("#right_sp")
    .css({ right: "0" })
    .hover(
      function () {
        $("#right_arr").fadeIn();
      },
      function () {
        $("#right_arr").fadeOut();
      }
    );
  //.click(()=> next())

  $("#left_arr, #right_arr").css({ top: "50%", display: "none" });
  $("#right_arr").css("right", "0");
  $("#left_arr").css("left", "0");

  $("#container img").click(function () {
    let imgIndex = $(this).index("img");
    $("#zoom").fadeIn().css("display", "flex");
    $("#zoom>div>img").attr("src", imgArr[imgIndex]);

    $("#left_sp, #left_arr").click(function prev(e) {
      e.stopPropagation();
      --imgIndex;
      if (imgIndex <= 0) {
        imgIndex = 0;
        $("#left_arr").css("opacity", ".5");
      } else $("#left_arr").css("opacity", "1");
      if (imgIndex >= 3) $("#right_arr").css("opacity", ".5");
      else $("#right_arr").css("opacity", "1");

      $("#zoom>div>img").attr("src", imgArr[imgIndex]);
    });
    $("#right_sp, #right_arr").click(function next(e) {
      e.stopPropagation();
      ++imgIndex;
      if (imgIndex >= 3) {
        imgIndex = 3;
        $("#right_arr").css("opacity", ".5");
      } else $("#right_arr").css("opacity", "1");
      if (imgIndex <= 0) $("#left_arr").css("opacity", ".5");
      else $("#left_arr").css("opacity", "1");

      $("#zoom>div>img").attr("src", imgArr[imgIndex]);
    });
  });

  function close() {
    $("#zoom").fadeOut();
  }
});
