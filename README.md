## Request Handling in server

We need to route the calls coming to the express backend to Next.js. For the we create a `requestHandler` out of next and pass it as the resolver for the route.

`// server.js`
```
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(()=>{
    const server = express();

    server.get("*", (req, res) => {
    return handle(req, res);
  });
})
```

---

## Nodemon

Since we have a server, we need to watch for changes in server.js file too. By default the changes in client is watched by Next.js and if any change occurs it is recompiled abd the server restarts. With nodemon we extend the watch to other JS files too.

`// package.json`
```
{
    "dev":"nodemon server.js"
}
```