package com.demo.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.demo.DAOUtil.DBConnection;

public class DeleteTask {
	
	public static int deletetask(int taskId) {
		
		PreparedStatement st=null;
		int row=0;
		final String deleteQry="delete from todolist where taskid=?";
		Connection con = DBConnection.getConnect();
		try {
			st=con.prepareStatement(deleteQry);
			st.setInt(1, taskId);
			row=st.executeUpdate();
			System.out.println("Affected row"+row);
			
			
		}
		catch (SQLException se) {
			se.printStackTrace();
			// TODO: handle exception
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		finally {
			try {
				if(st!=null) {
					st.close();
					st=null;
				}
			}
			catch(SQLException ss) {
				ss.printStackTrace();
			}
			try {
				if(con!=null) {
					con.close();
					con=null;
				}
			}catch(SQLException se1) {
				se1.printStackTrace();
			}
		}
		return row;
	}

}
