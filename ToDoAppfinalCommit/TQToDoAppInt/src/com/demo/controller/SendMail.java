package com.demo.controller;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;



public class SendMail {

	public static void testSend() {
		
		String senderEmailId = "nutanjadhav881@gmail.com"; 
		String senderPass = "nutu@2912"; 

		Properties props = new Properties();
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.socketFactory.port", "465");
		props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.port", "857");
		// get Session
		Session session = Session.getDefaultInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(senderEmailId, senderPass);
			}
		});
		// compose message
		try {
			MimeMessage message = new MimeMessage(session);
			message.addRecipient(Message.RecipientType.TO, new InternetAddress("tqpriyanka@gmail.com"));
			message.setSubject("Please Add Subject Here");
			message.setText("Hi...How are you?");
			// send message
			Transport.send(message);
			System.out.println("Email Sent Successfully");
		} catch (MessagingException e)
		{
			e.printStackTrace();
		}


	}
}