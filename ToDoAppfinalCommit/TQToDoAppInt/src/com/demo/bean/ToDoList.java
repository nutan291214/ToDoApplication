package com.demo.bean;

public class ToDoList {
	private String taskname;
	private String description;
	private String status;
	private int taskid;
	
	
	public ToDoList() {
		super();
	}
	public ToDoList(String taskname, String description, String status, int taskid) {
		super();
		this.taskname = taskname;
		this.description = description;
		this.status = status;
		this.taskid = taskid;
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
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getTaskid() {
		return taskid;
	}
	public void setTaskid(int taskid) {
		this.taskid = taskid;
	}
	@Override
	public String toString() {
		return "ToDoList [taskname=" + taskname + ", description=" + description + ", status=" + status + ", taskid="
				+ taskid + "]";
	}
	
	

}
