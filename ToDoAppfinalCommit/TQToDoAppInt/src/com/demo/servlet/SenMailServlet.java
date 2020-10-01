package com.demo.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import com.demo.controller.SendMailController;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/SenMailServlet")
public class SenMailServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public SenMailServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		response.setContentType("text/json");
		//PrintWriter out = response.getWriter();

		try {
			
		
		//	JSONObject jsonObject = getJsonObject(request, response);
			Random rand = new Random(); 

			int m = rand.nextInt(10000);
			
	        String result=""+m;
			
			//String email = request.getParameter("email");
			//System.out.println(email);
			String SenderEmail = "nutanjadhav881@gmail.com";
			String password ="nutu@2912";
			SendMailController.sendemail("meerajadhav.mulik@gmail.com"," your otp is : "+result,SenderEmail,password);
			
		
			//System.out.println(email);
		
			
               System.out.println(result);
			//out.write(result);
			
		
			//JSONObject json = new JSONObject();
			//json.putOnce("result", result);

			//response.setHeader("Access-Control-Allow-Origin", "*");
			//response.addHeader("Access-Control-Allow-Origin", "*");
//			response.getWriter().write(json.toString());

		} catch (Exception e) {
			e.printStackTrace();
		}


	}

	public static JSONObject getJsonObject(HttpServletRequest request, HttpServletResponse response) {

		StringBuffer sb = new StringBuffer();
		String line = null;
		JSONObject jsonObject = null;

		try {
			BufferedReader reader = request.getReader();
			while ((line = reader.readLine()) != null)
				sb.append(line);
			//jsonObject = new JSONObject(sb.toString());
			String JSON = "http://www.json-generator.com/j/cglqaRcMSW?indent=4";
			jsonObject =new JSONObject(JSON);
			System.out.println(jsonObject);
		} catch (Exception e) {
			System.out.println("Error" + e);
		}

		return jsonObject;
	}


}
