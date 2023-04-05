# RobloxIPBanSystem
This project is a website that can be used by any roblox game in order to fetch the user's IP, allowing them to be IP banned afterwards. Works with HTTP requests through an express server.

## DISCLAIMER

This project uses the TCP/IP Protocole and stores the users IPs in a databse. It is to know that this project is NOT TO BE USED FOR ANY NON ETHICAL THINGS. I do not take any responsability if illegal uses are done with this website, and I will not support it.


The CSS part of this project was NOT MADE BY ME. The server side and the JS was made entirely by me.


### EVERYTHING MADE BY ME IS CLAIMED AND CANNOT BE SOLD

## How does it work?

The website will firstly ask for the user to enter their ROBLOX username. Through a secured express server, the website will send a GET request to ROBLOX username API with the following code block:

`Frontend`

```js
    async function request(){
    await new Promise(r => setTimeout(r, 2000));
    getReq.addEventListener("load", listener);
    getReq.open("GET", `${window.location}getUser`, true);
    getReq.send();
    }
```
    
`Backend`

```js
     app.get("/getUser", (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        fetch(`https://auth.roblox.com/v1/usernames?username=${username}`)
        .then((response) => {
            response.json().then((json) => {
                 res.send(json);
                 res.end();
            })
        })
    });
```

The website will then proceed to do a ReCaptcha, which will, when completed, push the user's datas into the database. This will as well fetch the user's IP :

`Frontend`

```html
<form action="/pushUser" method="POST" style="display: none;" id="captcha" target="dummyframe">
        <div class="g-recaptcha" data-sitekey="6LdQWJwkAAAAAO235_US0rIEyP3LMzQpz1vycOKA" data-theme="dark"></div>
        <br/>
        <input id="button" type="submit" value="Submit" class="button" onclick="end()">
    </form>
```

`Backend`

```js
app.post('/pushUser', (req, res) => {
    if(!db.get("Users").find({
        Name: username
    }).value())
    {
        db.get("Users").push({
        Name: username,
        IP: IP,
        Verif_Date: date
      }).write();
    }
});
```

`Backend 2`

```js
    $.getJSON('https://api.ipgeolocation.io/ipgeo?apiKey=' + apiKey, function(data) {
        IP = JSON.stringify(data, null, 2).split("\"")[3];
    });
```

Lastly, the code will check if the user is part of the blacklist. If no, then everything is done!

`Frontend`

```js
    fetch(`${window.location}blackList`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => response.json())
    .then(response => {

      if(isNull && name != "*"){
        if(IP == "" || IP == " " || IP == "undefined" || IP == null){
        failMessage2.style.display="block";
    }

      if(response){
      mainForm.style.display="none";
      text2.style.display="block";
    }

    else{
      captchaForm.style.display="block";
      mainForm.style.display="none";
    }
    }

    else failMessage.style.display="block";
    });
```


## How to use?

It is very simple. My website is coming with 2 express server links for ROBLOX :

`/roLink`

```js
    app.post("/roLink", (req, res) => {
      if(db.get("Users").find({
        Name: JSON.stringify(req.body).split("\"")[3]
    }).value()) res.send(true);
    else res.send(false);
    });
```

`/blacklist`

```js
    app.post("/blackList", (req, res) => {
      if(db2.get("Blacklist").find({
        IP: JSON.stringify(req.body).split("\"")[3]
    }).value()) res.send(true);
    else res.send(false);
    });
```

All you have to do is send a post request to one of these URL. Here is the format for both :

```json
{
  "headers" : 
    {
    "Content-Type" : "application/json"
    },
    
  "body" :
    {
    "username" : "[username]"
    }
}
```

The rest is all up to you. Thanks!

## Additional Informations

Default Port : 8080

Node.js packages : lowdb, express, body-parser, path

APIs used : [ReCaptcha](https://developers.google.com/recaptcha), [IPGeoLocation](https://ipgeolocation.io/), [ROBLOX Auth2 Usernames](https://auth.roblox.com/docs#!/Usernames/get_v2_usernames)

---

**With love, Daegatoya** ❤️
         
<p align="center">

![My Discord](https://discord-readme-badge.vercel.app/api?id=852663698803130389)
</p>
