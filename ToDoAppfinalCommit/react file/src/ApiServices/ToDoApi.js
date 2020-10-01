import axios from 'axios'
class ToDoApi{

    //add  user

    addUser(user){
        return axios.post('http://localhost:8081/TQToDoAppInt/AddUser',user);
    }

    Login(emailPass){
        return axios.post('http://localhost:8081/TQToDoAppInt/LoginServlet',emailPass);
    }

    // getToDoList(email){
    //     return axios.get('http://localhost:8081/TQToDoAppInt/ToDoListServlet?email='+email);
    // }

    getToDoList(email){
        return axios.get('http://localhost:8081/TQToDoAppInt/ToDoListServlet?email='+email);
    }

    addToDoList(task){
        return axios.post('http://localhost:8081/TQToDoAppInt/AddTaskServlet',task);
    }

    deleteSingleTask(taskid){
        return axios.get('http://localhost:8081/TQToDoAppInt/DeleteTaskServlet?taskid='+taskid);;
    }

    verifyEmail(){
        return axios.get('')
    }


    activateUser(idpass){
        return axios.post('http://localhost:8081/TQToDoAppInt/ActivateUserServlet',idpass);
    }

    deactivateUser(idpass){
        return axios.post('http://localhost:8081/TQToDoAppInt/DeactivateUserServlet',idpass);
    }

    changeTaskStatus(taskid){
        return axios.get('http://localhost:8081/TQToDoAppInt/ChangeStatusServlet?taskid='+taskid);
    }


    getAllUser(){
        return axios.get('http://localhost:8081/TQToDoAppInt/GetAllUserServlet');
    }

    displayReport(){
        return axios.get('http://localhost:8081/TQToDoAppInt/ReportServlet');

    }

    sendMail(email){
        console.log(email)
        return axios.post('http://localhost:8081/TQToDoAppInt/SenMailServlet',email);
    }


}

export default new ToDoApi();
