 alert("script started");
window.userloveData = window.userloveData || [];
console.log(window.userloveData);
const Userlove = {
  anonymous: (id) => console.log("Anonymous user is identified with id", id),
};

// const setDataLayer = (data) => {
//   window.userloveData = { ...window.userloveData, ...data };
//   console.log("Data Layer:", window.userloveData);
// };

window.onload = async () => {
  const anonId = Math.floor(10000 + Math.random() * 90000);
  let visitorId = localStorage.getItem("visitorId");
  if (!visitorId) {
    localStorage.setItem("visitorId", `visitor-anon-#${anonId}`);
    visitorId = `visitor-anon-#${anonId}`;
  }

  let formStartEvent = false;
  Userlove.anonymous(visitorId);
  window.userloveData.push({ user_id: visitorId });
  const formStarted = (e) => {
    if (!formStartEvent) {
      formStartEvent = true;
      console.log("Form started");
      e.target.removeEventListener("change", formStarted);
    } else {
      e.target.removeEventListener("change", formStarted);
    }
  };
  let forms = document.getElementsByTagName("FORM");
  if (forms) {
    for (let i = 0; i < forms.length; i++) {
      if (forms[i].id !== "") {
        console.log(forms[i].id, "form loaded");
      } else if (forms[i].ariaLabel) {
        console.log(forms[i].ariaLabel, "form loaded");
      } else if (forms[i].className !== "") {
        console.log(forms[i].className, "form loaded");
      }
      forms[i].addEventListener(
        "invalid",
        (e) => {
          console.log("invalid event");
        },
        true
      );
      let children = forms[i].querySelectorAll("input");
      if (children) {
        for (let j = 0; j < children.length; j++) {
          children[j].addEventListener("change", formStarted);
          children[j].addEventListener("change", (e) => {
            if (e.target.type.toLowerCase() !== "password") {
              if (e.target.id !== "") {
                console.log(`${e.target.id} value ${e.target.value}`);
              } else if (e.target.ariaLabel) {
                console.log(`${e.target.ariaLabel} value ${e.target.value}`);
              } else if (e.target.className !== "") {
                console.log(`${e.target.className} value ${e.target.value}`);
              }
            }
          });
        }
      }
    }
  }
  console.log("page view", window.location.href);
  console.log("pathname", window.location.pathname);
  window.userloveData.push({ url: window.location.href });
  const counter = localStorage.getItem("counter");
  if (!counter) {
    localStorage.setItem("counter", 1);
  } else {
    localStorage.setItem("counter", Number(counter) + 1);
  }
  console.log("Number of Page Views:", localStorage.getItem("counter"));
  document.addEventListener("scroll", () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const pctScrolled = Math.floor(
      (scrollTop * 100) / (scrollHeight - document.documentElement.clientHeight)
    );
    if (pctScrolled === 0) {
      console.log("Top of the page");
    }
    if (pctScrolled === 25) {
      console.log("Scrolled 25%");
    }
    if (pctScrolled === 50) {
      console.log("Scrolled 50%");
    }
    if (pctScrolled === 75) {
      console.log("Scrolled 75%");
    }
    if (pctScrolled === 100) {
      console.log("Bottom of the page");
      window.userloveData.push({ reached_bottom: true });
    }
  });
  const getLocation = () => {
    return new Promise((resolve) => {
      window.navigator.geolocation.getCurrentPosition((res) => {
        resolve({
          coord: {
            lat: res.coords.latitude,
            long: res.coords.longitude,
          },
          timestamp: res.timestamp,
        });
      });
    });
  };
  const resp = await getLocation();
  const pageData = {
    browser: window.navigator.userAgentData.brands[2].brand,
    opSys: window.navigator.userAgentData.platform,
    charSet: document.characterSet,
    language: window.navigator.language,
    coord: { ...resp.coord },
    date: new Date(resp.timestamp),
  };
  window.userloveData.push(pageData);
  const getLocationObj = async () => {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pageData.coord.lat}&longitude=${pageData.coord.long}`
    );
    const location = await response.json();
    window.userloveData.push(location);
    const resp = await fetch(
      `https://restcountries.com/v3.1/alpha/${location.countryCode}?fields=currencies`
    );
    const currency = await resp.json();
    window.userloveData.push(currency);
  };
  getLocationObj();
  document.body.addEventListener("mousedown", ({ target }) => {
    let current = target;
    if (current.tagName.toLowerCase() === "path") {
      current = current.parentNode;
    }
    if (current.tagName.toLowerCase() === "a") {
      console.log("CUSTOM LINK - CLICK EVENT", current.innerText);
      window.userloveData.push({
        link_clicked: { text: current.innerText, href: current.href },
      });
      console.log("HREF: ", current.href);
      if (current.ariaLabel) {
        console.log("aria-label", current.ariaLabel);
      } else {
        console.log("No aria-label found");
      }
    } else if (target.parentNode.tagName.toLowerCase() === "a") {
      current = target.parentNode;
      console.log("CUSTOM LINK - CLICK EVENT", current.innerText);

      window.userloveData.push({
        link_clicked: { text: current.innerText, href: current.href },
      });
      console.log("HREF: ", current.href);
      if (current.ariaLabel) {
        console.log("aria-label", current.ariaLabel);
      } else {
        console.log("No aria-label found");
      }
    } else if (current.tagName.toLowerCase() === "button") {
      console.log("CUSTOM LINK - CLICK EVENT", current.innerText);
      window.userloveData.push({
        button_clicked: { text: current.innerText },
      });
      if (current.ariaLabel) {
        console.log("aria-label", current.ariaLabel);
      } else {
        console.log("No aria-label found");
      }
    } else if (target.parentNode.tagName.toLowerCase() === "button") {
      current = target.parentNode;
      console.log("CUSTOM LINK - CLICK EVENT", current.innerText);
      window.userloveData.push({
        button_clicked: { text: current.innerText },
      });
      if (current.ariaLabel) {
        console.log("aria-label", current.ariaLabel);
      } else {
        console.log("No aria-label found");
      }
    }
  });
};
