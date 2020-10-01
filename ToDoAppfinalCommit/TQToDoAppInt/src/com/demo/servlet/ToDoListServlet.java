package com.demo.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.demo.bean.ToDoList;
import com.demo.controller.GetToDoList;
import com.fasterxml.jackson.databind.ObjectMapper;


@WebServlet("/ToDoListServlet")
public class ToDoListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public ToDoListServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
		String email=request.getParameter("email");
		
		System.out.println(request.getParameter("email"));
		
		List<ToDoList> tdlist=GetToDoList.todoList(email);
		
		System.out.println("wowowowow its final list"+tdlist);
		ObjectMapper om=new ObjectMapper();
		PrintWriter out=response.getWriter();
	if(tdlist!=null)
	{
		
	String todolistjson = om.writeValueAsString(tdlist);
//		response.addHeader("Access-Control-Allow-Origin", "*");
		//out.write(todolistjson);
		out.write(om.writeValueAsString(tdlist));
		System.out.println("woww response sent to react");
		
		}
		
		
	}

	
}
