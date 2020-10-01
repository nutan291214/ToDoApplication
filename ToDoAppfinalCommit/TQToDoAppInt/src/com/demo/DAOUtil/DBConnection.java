package com.demo.DAOUtil;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {
	
	private static final String url="jdbc:mysql://localhost:3306/tqproject?autoReconnect=true&useSSL=false";
	private static final String user="root";
	private static final String pass="root";
	
	private static Connection con=null;
	public final static Connection getConnect() 
	{
		try
		{
			
			Class.forName("com.mysql.cj.jdbc.Driver");
			con=DriverManager.getConnection(url,user,pass);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return con;
	}



}
