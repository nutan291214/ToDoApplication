package com.demo.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.demo.DAOUtil.DBConnection;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/ReportServlet")
public class ReportServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    
    public ReportServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
PrintWriter out=response.getWriter();
		
		ObjectMapper om = new ObjectMapper();

		ArrayList<Integer> al=new ArrayList<>();
		
		LocalDate curDate=LocalDate.now();
		LocalDate previousDate =curDate.minusDays(7);
		
		String curdate=curDate.toString();
		String date7daysago = previousDate.toString();
		String act="Active";
		String deact="Deactivate";
		Connection con = DBConnection.getConnect();
		
		try {
			
			int actcount=activeCount(con,curdate,date7daysago,act);
			int newUsercount=newUserCount(con,curdate,date7daysago);
			int totaltask=taskCount(con,curdate,date7daysago);
			
			al.add(actcount);
			al.add(newUsercount);
			al.add(totaltask);
			
			String report=om.writeValueAsString(al);
			System.out.println(report);
			out.write(report);
		}
		catch(Exception e) {
			e.printStackTrace();
			
		}
		
	}
	
	
	public int activeCount(Connection con, String curdate,String date7daysago,String status) {
		String activequery = "select count(*) from user where status=? and activated_date between ? and ?";
		Integer acount=0;
		PreparedStatement ps=null;
		ResultSet act=null;
		
		try {
			ps=con.prepareStatement(activequery);
			ps.setString(1, status);
			ps.setString(2, date7daysago);
			ps.setString(3, curdate);
			act = ps.executeQuery();
		
			if(act.next()) {
				acount=act.getInt(1);
			}
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		return acount;
	}
	
public int newUserCount(Connection con, String curdate,String date7daysago) {
	
	int ncount=0;
	PreparedStatement ps=null;
	ResultSet user=null;
	try {
		ps=con.prepareStatement("select count(*) from user where activated_date between ? and ?");
		ps.setString(1, date7daysago);
		ps.setString(2, curdate);
		user=ps.executeQuery();
		if(user.next()) {
			ncount=user.getInt(1);
		}
		
	}
	catch(SQLException se) {
		se.printStackTrace();
	}
	
	System.out.println("new user count="+ncount);
		return ncount;
		
	}
	
	public int taskCount(Connection con, String curdate,String date7daysago) {
		
		String taskquery ="select count(*) from todolist where taskdate between ? and ?";
		Integer tcount=0;
		PreparedStatement ps=null;
		ResultSet task=null;
		
		try {
			ps=con.prepareStatement(taskquery);
			ps.setString(1, date7daysago);
			ps.setString(2, curdate);
			task = ps.executeQuery();
		
			if(task.next()) {
				tcount=task.getInt(1);
			}
		} catch (SQLException e) {
			
			e.printStackTrace();
		}
		return tcount;
	}


}
