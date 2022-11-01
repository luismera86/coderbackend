// @deno-types="https://deno.land/x/servest@v1.3.4/types/react/global.d.ts"
import React from "https://dev.jspm.io/react@16.13";
// @deno-types="https://deno.land/x/servest@v1.3.4/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest@v1.3.4/app.ts";

const app = createApp();
const arrayColor = [];

app.handle("/", async (req) => {
  const color = req.query;

  arrayColor.push(color.get("color"))
  
  await req.respond({    
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),

    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>Servest</title>
        </head>
        <body>
          <div style={{padding: "20", margin: "0 auto", display: "flex", justifyContent: "center"}}>
            <form action="/" style={{border: "1px solid", width: "50%", textAlign: "center"}}>
              <h2>Ingresar Color</h2>
              <input
                type="text"
                id="color"
                name="color"
                placeholder="Name color..."
              />
              <br />
              <input 
                style={{margin: "10px"}} 
                type="submit" 
                name="btnColor" 
                value="Enviar" 
              />
            </form>
          </div>
          <div style={{textAlign: "center" }}> 
            {
              arrayColor.map((inputColor => 
                  <label 
                    style={{
                      color: inputColor,
                      marginRight: "2px",  
                      padding: "5px",
                      backgroundColor: inputColor == "black" ? "white" : "black",
                      fontWeight: "bold",
                      fontSize: "34px",
                      fontFamily: "arial",
                    }}
                  >
                    {inputColor.charAt(0).toUpperCase()}
                  </label>
              ))
            }
          </div>
        </body>
      </html>,
    ),
  });
});

app.listen({ port: 8080 });
