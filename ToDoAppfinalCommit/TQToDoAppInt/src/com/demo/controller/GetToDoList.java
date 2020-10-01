package com.demo.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.demo.DAOUtil.DBConnection;
import com.demo.bean.*;

public class GetToDoList {

	public static List<ToDoList> todoList(String email) {

		ArrayList<ToDoList> todolist = new ArrayList<>();

		try {

			Connection con = DBConnection.getConnect();
			PreparedStatement preparedstmt = con.prepareStatement("select * from todolist where user_email=?;");
			//PreparedStatement preparedstmt = con.prepareStatement("select * from todolist;");
			preparedstmt.setString(1, email);

			ResultSet rs = preparedstmt.executeQuery();

			if (rs != null) {
				while (rs.next()) {

					ToDoList tdl = new ToDoList();
					tdl.setTaskid(rs.getInt(1));
					tdl.setTaskname(rs.getString(2));
					tdl.setDescription(rs.getString(3));
					tdl.setStatus(rs.getString(4));

					todolist.add(tdl);
					System.out.println(tdl);

				}

				return todolist;
			} else {
				return null;
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
			return null;

		}

	}

}
