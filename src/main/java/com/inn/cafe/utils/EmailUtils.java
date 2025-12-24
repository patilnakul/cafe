package com.inn.cafe.utils;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailUtils {

	@Autowired
	private JavaMailSender emailSender;

	@Value("${spring.mail.username}") // Fetch sender email from properties
	private String fromEmail;

	public void sendSimpleMessage(String to, String subject, String text, List<String> list) {

		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(fromEmail);
		message.setTo(to);
		message.setSubject(subject);
		message.setText(text);

		if (list != null && list.size() > 0)
			message.setCc(getCcArray(list));
		emailSender.send(message);
	}

	private String[] getCcArray(List<String> ccList) {
		String[] cc = new String[ccList.size()];
		for (int i = 0; i < ccList.size(); i++) {
			cc[i] = ccList.get(i);
		}
		return cc;
	}

	public void forgotEmail(String to, String subject, String password) throws MessagingException {
		MimeMessage message = emailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
		helper.setFrom(fromEmail);
		helper.setTo(to);
		helper.setSubject(subject);
		String htmlMsg = "<!DOCTYPE html>" + "<html><head><meta charset='UTF-8'>"
				+ "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" + "<style>"
				+ "body { font-family: 'Poppins', sans-serif; background-color: #fff3e5; padding: 20px; margin: 0; }"
				+ ".container { max-width: 600px; margin: auto; background-color: #ffffff; padding: 24px; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.1); }"
				+ ".banner { width: 100%; height: 180px; border-radius: 12px 12px 0 0; background: url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat; margin: -24px -24px 20px -24px; }"
				+ "h2 { color: #2e2e2e; font-size: 18px; margin-top: 0; }"
				+ "p { color: #4f4f4f; font-size: 13px; margin: 10px 0; line-height: 1.5; }"
				+ ".credentials { background-color: #f5f5f5; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 13px; color: #333; margin: 18px 0; white-space: pre-wrap; }"
				+ ".btn { display: inline-block; padding: 10px 20px; background-color: #e67e22; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 13px; margin-top: 16px; transition: background-color 0.3s ease; }"
				+ ".btn:hover { background-color: #cf711b; }"
				+ ".footer { margin-top: 30px; font-size: 11px; color: #888; display: flex; flex-wrap: wrap; gap: 12px; align-items: flex-start; border-top: 1px solid #e0e0e0; padding-top: 16px; }"
				+ ".footer-logo { max-width: 60px; height: auto; margin-right: 15px; }"
				+ ".footer-text { flex: 1; font-size: 11px; line-height: 1.4; }"
				+ "@media only screen and (max-width: 600px) {" + ".container { padding: 16px; }"
				+ "h2 { font-size: 16px; }" + "p, .credentials, .btn { font-size: 12px; }"
				+ ".btn { padding: 10px 18px; }" + ".footer { flex-direction: column; align-items: flex-start; }"
				+ ".footer-logo {   max-width: 40px;    margin-right: 10px;    margin-bottom: 10px; }" + "}"
				+ "</style></head><body>" + "<div class='container'>"
				+ "<div class='banner' aria-label='Cafe FlavourHut pizza cafe banner'></div>" + "<br>"
				+ "<h2>🍕 Welcome Back to Cafe FlavourHut!</h2>"
				+ "<p>You’ve requested to recover your login credentials. Please find them below:</p>"
				+ "<div class='credentials'>" + "<strong>Email:</strong> " + to + "<br>" + "<strong>Password:</strong> "
				+ password + "</div>" + "<p>Click the button below to log in to your account:</p>"
				+ "<a class='btn' href='http://localhost:4200'>Login Now</a>" + "<div class='footer'>"
				+ "<img class='footer-logo' src='https://i.postimg.cc/8PrJtX9v/icons8-restaurant.gif' alt='Cafe FlavourHut Logo' />"
				+ "<div class='footer-text'>"
				+ "<p>If you didn’t request this, you can safely ignore this email.<br>— The FlavourHut Team</p>"
				+ "</div></div>" + "</div></body></html>";
		helper.setText(htmlMsg, true);
		emailSender.send(message);
	}

}
//https://i.postimg.cc/Y02QL2jw/icons8-cafe.gif

//
//public void forgotEmail(String to, String subject, String password) throws MessagingException {
//    MimeMessage message = emailSender.createMimeMessage();
//    MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
//    helper.setFrom(fromEmail);
//    helper.setTo(to);
//    helper.setSubject(subject);
//
//    String htmlMsg = "<!DOCTYPE html>"
//        + "<html><head><style>"
//        + "body { font-family: 'Arial', sans-serif; background-color: #f5f5f5; padding: 20px; }"
//        + ".container { max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }"
//        + "h2 { color: #333333; }"
//        + "p { color: #555555; font-size: 16px; }"
//        + ".credentials { background-color: #f0f0f0; padding: 15px; border-radius: 6px; margin: 20px 0; font-family: monospace; }"
//        + ".btn { display: inline-block; padding: 12px 24px; background-color: #70b073; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 10px; }"
//        + ".footer { margin-top: 30px; font-size: 12px; color: #888; }"
//        + "</style></head><body>"
//        + "<div class='container'>"
//        + "<h2>👋 Hello from Cafe FlavourHut!</h2>"
//        + "<p>You’ve requested to recover your login credentials. Here they are:</p>"
//        + "<div class='credentials'>"
//        + "<strong>Email:</strong> " + to + "<br>"
//        + "<strong>Password:</strong> " + password
//        + "</div>"
//        + "<p>Click the button below to login to your account:</p>"
//        + "<a class='btn' href='http://localhost:4200'>Login Now</a>"
//        + "<p class='footer'>If you didn’t request this, you can safely ignore this email.<br>— The FlavourHut Team</p>"
//        + "</div></body></html>";
//
//    helper.setText(htmlMsg, true);
//    emailSender.send(message);
//}
//
