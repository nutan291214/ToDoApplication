package com.demo.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.demo.bean.User;
import com.demo.controller.GetAllUser;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Servlet implementation class GetAllUserServlet
 */
@WebServlet("/GetAllUserServlet")
public class GetAllUserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public GetAllUserServlet() {
    	
    }
    
    
protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		
		//res.setContentType("text/json");
		PrintWriter out=res.getWriter();
		
		ObjectMapper om=new ObjectMapper();
		
			List<User> ulist=GetAllUser.getList();
			
			String userlist=om.writeValueAsString(ulist);
			res.addHeader("Access-Control-Allow-Origin", "*");
			out.write(userlist);
			
	}
    
}
