package com.demo.servlet;

import java.io.IOException;




import java.io.PrintWriter;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.time.LocalDate;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.demo.DAOUtil.DBConnection;
import com.demo.bean.User;
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysql.jdbc.Connection;
import java.sql.SQLIntegrityConstraintViolationException;

import com.mysql.jdbc.exceptions.MySQLIntegrityConstraintViolationException;

import com.demo.bean.User;

/**
 * Servlet implementation class AddUser
 */
@WebServlet("/AddUser")
public class AddUser extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public AddUser() {
        super();
        // TODO Auto-generated constructor stub
    }
    
 

	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		resp.setContentType("text/json");
		PrintWriter out=resp.getWriter();
		
		
		ObjectMapper om=new ObjectMapper();
		User user=om.readValue(req.getInputStream(), User.class);
		System.out.println(user);
		
		String firstname=user.getFirstname();
		String lastname=user.getLastname();
		String gender=user.getGender();
		String dob=user.getDob();
		String email=user.getEmail();
		String password=user.getPassword();
		String status="Active";
		
		LocalDate ld=LocalDate.now();
		String curdate=ld.toString();
		
		String query="insert into user(firstname,lastname,gender,dob,email,password,activated_date,status) values(?,?,?,?,?,?,?,?)";
		
		java.sql.Connection con=DBConnection.getConnect();
		try {
			PreparedStatement ps=con.prepareStatement(query);
			ps.setString(1, firstname);
			ps.setString(2, lastname);
			ps.setString(3, gender);
			ps.setString(4, dob);
			ps.setString(5, email);
			ps.setString(6, password);
			ps.setString(7, curdate);
			ps.setString(8, status);
			int i=ps.executeUpdate();
			
			if(i>0) {
				dataInserted(i,req,resp,out);
			}
			
		}
		catch(MySQLIntegrityConstraintViolationException e) {
			String result="PassWord or Email Already Exist Please Enter Unique One";
//			resp.setHeader("Access-Control-Allow-Origin", "*");
//			resp.addHeader("Access-Control-Allow-Origin", "*");

			out.write(om.writeValueAsString(result));
			
			e.printStackTrace();
		}
		catch (Exception e) {

			String result="Not Inserted";
			
//			resp.setHeader("Access-Control-Allow-Origin", "*");
//			resp.addHeader("Access-Control-Allow-Origin", "*");

			out.write(om.writeValueAsString(result));
		
			e.printStackTrace();
		}
		finally{
			try {
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		
	}
	
	public void dataInserted(int i,HttpServletRequest req, HttpServletResponse resp,PrintWriter out) {
		if(i>0) {
			ObjectMapper om=new ObjectMapper();
			
			String result="Register successfully";
			
//			resp.setHeader("Access-Control-Allow-Origin", "*");
			resp.addHeader("Access-Control-Allow-Origin", "*");
			
			try {
				out.write(om.writeValueAsString(result));
				
			} catch (JsonGenerationException e) {
				
				e.printStackTrace();
			} catch (JsonMappingException e) {
				
				e.printStackTrace();
			} catch (IOException e) {
				
				e.printStackTrace();
			}
		}
		
		
	}


    

	}
