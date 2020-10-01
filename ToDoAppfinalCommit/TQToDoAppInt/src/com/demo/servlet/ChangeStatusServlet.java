package com.demo.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.demo.DAOUtil.DBConnection;


@WebServlet("/ChangeStatusServlet")
public class ChangeStatusServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public ChangeStatusServlet() {
        super();
           }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int taskid=Integer.parseInt(request.getParameter("taskid"));
		PrintWriter out=response.getWriter();
		
		String status="complete";
		PreparedStatement ps=null;
		Connection con = DBConnection.getConnect();
		try {
			
			ps=con.prepareStatement("update todolist set status=? where taskid=?");
			ps.setString(1,status);
			ps.setInt(2, taskid);
			int r=ps.executeUpdate();
			if(r>0) {
				System.out.println("task completed");
				out.write("Task completed");
			}
			else
			{
				System.out.println("error occured");
				out.write("something is wrong  ");
			}
			
		}
		catch(SQLException se) {
			se.printStackTrace();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		finally {
			try {
				if(ps!=null) {
					ps.close();
				}}
			catch(SQLException se) {
					se.printStackTrace();
				}
			try {
				if(con!=null)
					con.close();
				
			}
			catch(SQLException se){
				se.printStackTrace();
			}
			
		}
	}

}
