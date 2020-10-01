package com.demo.servlet;

import java.io.IOException;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.demo.DAOUtil.DBConnection;
import com.demo.bean.Login;
import com.fasterxml.jackson.databind.ObjectMapper;


@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		

		ObjectMapper om = new ObjectMapper();
		
		System.out.println("React Data= "+req.getInputStream());

		Login emailPass = om.readValue(req.getInputStream(), Login.class);
		
		System.out.println("java object= "+emailPass);
		
		String result = "Invalid";
					
		Connection con = DBConnection.getConnect();
		
		try {
			
			PreparedStatement p = con.prepareStatement("select * from user;");

			ResultSet userResult = p.executeQuery();

			while (userResult.next())
			{
				

				System.out.println(userResult.getString(6)+"  "+userResult.getString(7)+"  "+userResult.getString(9));
				

				if (userResult.getString(6).equals(emailPass.getEmail()) && userResult.getString(7).equals(emailPass.getPassword()) && userResult.getString(9).equalsIgnoreCase("active"))
				{
					result = "user";
					System.out.println(result);
					break;

				}
				else if (emailPass.getEmail().equals("admin@gmail.com") && emailPass.getPassword().equals("admin123"))
				{
					result = "admin";
					System.out.println(result);
					
					break;
				} 
				else 
				{
					System.out.println(result+" "+emailPass.getEmail());
					
				}

			}
			
			
			System.out.println("wowowowoww its me= "+result);
			PrintWriter out=resp.getWriter();
			out.write(result);

		} catch (Exception ex) {
			ex.printStackTrace();

		} finally {
			try {
				con.close();
			} catch (SQLException s) {
				s.printStackTrace();
			}
		}

	}
}
