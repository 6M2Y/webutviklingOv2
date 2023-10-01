import express from "express";
import lists from "../data";


const listRouter = express.Router();

listRouter.get('/:id', (request, response) =>{
    const id = request.params.id;

    const list = lists.find(t => t.id == id)
    if(list)
        response.json(list);
    else
        response.status(404).send(`A list with id ${id} not found`);
});

listRouter.post('/', (request, response) =>{
    const list = request.body;

    if(!list.hasOwnProperty('id')||
    !list.hasOwnProperty('title')||
    !list.hasOwnProperty('oppgaver'))
    {
        return response.status(404).send(`The list is not complete! It needs id, title, atleast one oppgave`);
    }
    if(lists.find(t=>t.id == list.id))
    {
        response.status(404).send(`The list with id ${list.id} is already available`);
    }
    else
    {
        lists.push(list);
        response.status(202);
        response.location('lists/' + list.id);
        response.send();
    }

})

listRouter.delete('/:listId',(req,res) =>{

    const id = req.params.listId;
    const listIndex = lists.findIndex(t=>t.id == id);

    if(listIndex != -1)
    {
        lists.splice(listIndex,1);
        res.json(lists);
    }
    else
    {
        res.status(404).send('The list with index '+ id + ' not found');
    }
})



export default listRouter;