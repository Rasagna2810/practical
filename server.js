const exp=require('express');
const app=exp();
app.use(exp.json());
let students=[
    {id:1,name:"John",age:20},
    {id:2,name:"Jane",age:22}
];
app.get('/students',(req,res)=>{
    res.status(200).json(students);
})
app.get('/students/:id',(req,res)=>{
    const s=students.find(st=>st.id==req.params.id);
    if(s){
        res.status(200).json(s);
    }
    else{
        res.status(404).json({message:"Student not found"});
    }
})
app.post('/students',(req,res)=>{
    const newStudent=req.body;
    newStudent.id=students.length+1;
    students.push(newStudent);
    res.status(201).json(newStudent);

})
app.put('/students/:id',(req,res)=>{
    const id=req.params.id;
    const index=students.findIndex(st=>st.id==id);
    if(index!==-1){
        students[index]=req.body;
        students[index].id=id;
        res.status(200).json(students[index]);
    }
    else{
        res.status(404).json({message:"Student not found"});
    }
})
app.patch('/students/:id',(req,res)=>{
    const id=req.params.id;
    const index=students.findIndex(st=>st.id==id);
    if(index!==-1){
        students[index]={...students[index],...req.body};
        res.status(200).json(students[index]);
    }
    else{
        res.status(404).json({message:"Student not found"});
    }
})
app.delete('/students/:id',(req,res)=>{
    const id=req.params.id;
    const index=students.findIndex(st=>st.id==id);
    if(index!==-1){
        students.splice(index,1);
        res.status(200).json({message:"Student deleted"});
    }
    else{
        res.status(404).json({message:"Student not found"});
    }
})
app.listen(3000,()=>{console.log("Server is running on port 3000")})