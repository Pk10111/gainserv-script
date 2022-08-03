console.log("script run success");
var users = function (t) {
  var e = {};
};
var m = [
  "ProductTour",
  "NPS",
  "track",
  "checkList",
  "track",
  "hideChecklist",
  "launchChecklist",
];
const { userlove } = window;

const functionCreator = {
  ProductTour: (data) => {
    console.log("data", data);
  },
  NPS: (data) => {
    console.log("data", data);
  },
};

for (var i = 0; i < m.length; i++) {
  userlove[m[i]] = functionCreator[m[i]];
}

const getPosition = (position) => {
  switch (position.toLowerCase()) {
    case "top left":
      return { left: "100px", top: "100px", right: "auto", bottom: "auto" };
      break;
    case "top right":
      return { right: "100px", top: "100px", left: "auto", bottom: "auto" };
      break;
    case "bottom left":
      return { left: "100px", bottom: "100px", right: "auto", top: "auto" };
    case "bottom right":
      return { right: "100px", bottom: "100px", top: "auto", left: "auto" };
    default:
      return { right: "100px", bottom: "100px", top: "auto", left: "auto" };
  }
};

const createIfrmFun = () => {
  var position = "bottom right";
  var positionObj = getPosition(position);
  var iframe = document.createElement("iframe");
  iframe.allowFullscreen = true;
  iframe.style.position = "absolute";
  iframe.style.top = 0;
  iframe.style.left = 0;
  iframe.style.height = "100%";
  iframe.style.width = "100%";
  iframe.style.overflow = "hidden";
  iframe.style.zIndex = 99999999;
  iframe.style.border = 0;
  iframe.referrerPolicy = "same-origin";

  var html = `<body style="width:100%; height: 100%; margin: 0;">
  <div style="
  position: absolute; top:${positionObj.top}; right:${positionObj.right}; left:${positionObj.left}; bottom:${positionObj.bottom};">
  <div id="checklist" style="height: 200px; width: 300px; background: red; visibility:visible ">
  Foo
  </div>
  <button id="beacon" style="background: blue; position:relative; padding: 5px; margin: 5px; left: 215px;">Beacon</button>

  </div>

  </body>`;
  iframe.src = "data:text/html;charset=utf-8," + encodeURI(html);
  // iframe.src = "https://www.google.com/";
  // iframe.src = "about:blank";
  // iframe.contentWindow.origin = "anonymous";z
  // iframe.srcdoc = `<meta name=${document.referrer}" content=${iframe.contentWindow.location.origin} />`;
  var test = document.body.appendChild(iframe);
  // console.log(iframe.contentWindow.location);
  iframe.onload = () => {
    // iframe.contentWindow.postMessage("test p");

    var beacon = iframe.contentWindow.document.getElementById("beacon");
    console.log({ beacon });
    beacon.addEventListener("click", (e) => {
      e.preventDefault();

      var checklist = iframe.contentWindow.document.getElementById("checklist");
      checklist.style.visibility === "hidden"
        ? (checklist.style.visibility = "visible")
        : (checklist.style.visibility = "hidden");
    });
  };
  console.log("test", test);
};

createIfrmFun();

const beconButton = () => {
  var button = document.createElement("button");
};
