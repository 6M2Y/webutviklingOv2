import express, { request, response } from "express";
import lists from "./data";
import res from "express/lib/response";
import req from "express/lib/request";
import listRouter from "./router/list-Router";
import taskRouter from "./router/task-router";


const app = express();
app.use(express.json());

const PORT = 3100;
app.listen(PORT, ()=>
{
    console.info(`Server is running on ${PORT}`);
})

//Hent en bestemt liste
app.use('/api/v1/lists',listRouter);

//Lag en ny liste
app.use('/api/v1/lists', listRouter);

//Slett en gitt liste og dens oppgaver
app.use('/api/v1/lists', listRouter)

//Hent alle oppgaver for en gitt liste
app.use('/api/v1/lists', taskRouter);


//Hent en bestemt oppgave for en gitt liste
app.use('/api/v1/lists', taskRouter);

//Lag en ny oppgave for en gitt liste
app.use('/api/v1/lists', taskRouter);

//Slett en gitt oppgave i en bestemt liste
app.use('/api/v1/lists', taskRouter);