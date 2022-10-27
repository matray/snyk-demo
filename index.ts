import { pipe } from 'fp-ts/lib/function'
import { Request, Response } from 'express'

const express = require( "express" );
const app = express();
const port = 8082; // default port to listen

// define a route handler for the default home page
app.get( "/v1", async ( req: Request, res: Response, next) => {
    res.status(200).send( req.query.userInput );
    next()
} );

app.get("/v2", async (req: Request, res: Response, next) => {
  const reqRef = req
  const resRef = res
  pipe(
    reqRef.query.userInput,
    resRef.send.bind(resRef),
    () => next
  )
})

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );