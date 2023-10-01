import express from "express";
import lists from "../data";

const taskRouter = express.Router();

//Hent alle oppgaver for en gitt liste
taskRouter.get('/:listId/tasks', (req,res) =>{

    const id = req.params.listId;
    const list = lists.find(t=>t.id==id);

    if(list)
        res.json(list.oppgaver);
    else
        res.status(404).send('The list with index '+ id + ' not found');

})
//Hent en bestemt oppgave for en gitt liste
taskRouter.get('/:listId/tasks/:taskId', (req,res) =>{

    const taskId = req.params.taskId,
          listId = req.params.listId;

    const task = lists[listId].oppgaver.find(t=>t.id == taskId);
    if(task)
        res.json(task)
    else
        res.status(404).send(`The list with list id ${listId} and taskid ${taskId} not found`);
})

//Lag en ny oppgave for en gitt liste
taskRouter.post('/:listId/tasks', (req,res) =>{
    const id = req.params.listId;
    const task = req.body;

    if(!task.hasOwnProperty('id')||
       !task.hasOwnProperty('title')||
       !task.hasOwnProperty('ferdig')||
       !task.hasOwnProperty('listId'))
       {
        return res.status(404).send("The task is not complete");
       }
    if(lists[id].oppgaver.find(t => t.id == task.id))
    {
        res.status(404).send("A task with id " + task.id + " is already available");
    }
    else
    {
        const taskToBeAdded = lists.find(l=>l.id === task.listId);
            taskToBeAdded.oppgaver.push(task);
            res.status(202);
            res.location('lists/'+ task.id);
            res.send();
    }
})

//Slett en gitt oppgave i en bestemt liste
taskRouter.delete('/:listId/tasks/:taskId', (req, res) =>
{
    const listId = req.params.listId,
          taskId = req.params.taskId;
    
    const list = lists.find(l=>l.id == listId);//find the list 

    if(list)//if the list is found
    {
        const tasks = list.oppgaver;//the task on the list
        const index = tasks.findIndex(t=> t.id == taskId); //find the index of the task 
        if(index != -1)
        {
            tasks.splice(index, 1);
            res.json(list);
        }
    }
    else
    {
        res.status(404).send('The list with task id '+ taskId + ' not found');
    }
})
export default taskRouter;