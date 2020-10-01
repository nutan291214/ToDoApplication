package com.demo.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.time.LocalDate;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.demo.DAOUtil.DBConnection;
import com.demo.bean.AddTaskToDoList;
import com.demo.bean.ToDoList;
import com.demo.bean.User;
import com.fasterxml.jackson.databind.ObjectMapper;


@WebServlet("/AddTaskServlet")
public class AddTaskServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public AddTaskServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request,response);
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		response.setContentType("text/json");
		PrintWriter out=response.getWriter();
		
		
		ObjectMapper om=new ObjectMapper();
		AddTaskToDoList todolist=om.readValue(request.getInputStream(), AddTaskToDoList.class);
		System.out.println(todolist);
		
		String taskName=todolist.getTaskname();
		String description=todolist.getDescription();
		String status="pending";
		String email=todolist.getEmail();
		
		LocalDate localdate=LocalDate.now();
		String localDate=localdate.toString();
		
		String insertQuery="insert into todolist(taskname,description,status,user_email,taskdate) values(?,?,?,?,?)";
		
		PreparedStatement preparedStmt=null;
		Connection con = DBConnection.getConnect();
		try {
			preparedStmt=con.prepareStatement(insertQuery);
			preparedStmt.setString(1,taskName);
			preparedStmt.setString(2, description);
			preparedStmt.setString(3, status);
			preparedStmt.setString(4, email);
			preparedStmt.setString(5, localDate);
			int updatedRow=preparedStmt.executeUpdate();
			
			if(updatedRow>0) {
				out.write("Task added successfully");
			}
			else {
				out.write("Something goes wrong task not added");
			}
		}
		catch(Exception e) {
			e.printStackTrace();
			
		}
		finally {
			try {
				con.close();
			}
			catch(SQLException se) {
				se.printStackTrace();
			}
		}
		
		
	}

}
