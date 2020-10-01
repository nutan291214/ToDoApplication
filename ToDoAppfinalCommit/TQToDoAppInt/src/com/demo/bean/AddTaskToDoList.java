package com.demo.bean;

public class AddTaskToDoList {
	private String taskname;
	private String description;
	private String email;
	public AddTaskToDoList() {
		super();
	}
	public AddTaskToDoList(String taskname, String description, String email) {
		super();
		this.taskname = taskname;
		this.description = description;
		this.email = email;
	}
	public String getTaskname() {
		return taskname;
	}
	public void setTaskname(String taskname) {
		this.taskname = taskname;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	@Override
	public String toString() {
		return "AddTaskToDoList [taskname=" + taskname + ", description=" + description + ", email=" + email + "]";
	}
	

}
