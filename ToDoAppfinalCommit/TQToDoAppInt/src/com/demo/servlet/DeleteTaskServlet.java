package com.demo.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.demo.controller.DeleteTask;


@WebServlet("/DeleteTaskServlet")
public class DeleteTaskServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public DeleteTaskServlet() {
        super();
        System.out.println("In deleteServlet constructor");
        // TODO Auto-generated constructor stub
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		response.setContentType("application/json");
		int taskid=Integer.parseInt(request.getParameter("taskid"));
		System.out.println("delete single task id="+taskid);
		
		try {
			int result=DeleteTask.deletetask(taskid);
			System.out.println("single task="+result);
		}
		
		catch(Exception e) {
			e.printStackTrace();
		}
		
		
	}

}
