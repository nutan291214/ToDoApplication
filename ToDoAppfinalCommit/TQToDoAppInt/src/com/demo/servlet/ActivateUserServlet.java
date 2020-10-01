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
import com.demo.bean.Login;
import com.fasterxml.jackson.annotation.JsonFormat.Feature;
import com.fasterxml.jackson.databind.ObjectMapper;



@WebServlet("/ActivateUserServlet")
public class ActivateUserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
        public ActivateUserServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request,response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("text/json");
		PrintWriter out=response.getWriter();
		System.out.println("Activate user");
		
		ObjectMapper om=new ObjectMapper();
		//om.configure(Feature.AUTO_CLOSE_SOURCE, true);
		
		
		
		Login user=om.readValue(request.getInputStream(), Login.class);
		
		String email=user.getEmail();
		String password=user.getPassword();
		
		PreparedStatement ps=null;
		String status="active";
		int i=0;
		
		String query="update user set status=? where email=? and password=?";
		Connection con = DBConnection.getConnect();
		
try {
			
	        
			ps=con.prepareStatement(query);
			ps.setString(1, status);
			ps.setString(2, email);
			ps.setString(3, password);
			i=ps.executeUpdate();
			
			if(i>0) {
			
				
				String result="User Activation Successfull";
				System.out.println("user activated sucessfully");
		
				response.addHeader("Access-Control-Allow-Origin", "*");
				out.write(om.writeValueAsString(result));
			}
			else {
				String result="User Activation Failed";

				response.addHeader("Access-Control-Allow-Origin", "*");
				out.write(om.writeValueAsString(result));
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
    		}
    	}catch(SQLException se) {
    		se.printStackTrace();
    	}
    	
    	try {
    		if(con!=null) {
    			con.close();
    		}
    	}catch(SQLException se) {
			se.printStackTrace();
		}
    }

		
		
	}

}
