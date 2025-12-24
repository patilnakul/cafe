package com.inn.cafe.serviceImpl;

import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.google.common.base.Strings;
import com.inn.cafe.JWT.JwtFilter;
import com.inn.cafe.JWT.JwtUtil;
import com.inn.cafe.POJO.User;
import com.inn.cafe.constents.CafeConstants;
import com.inn.cafe.dao.UserDao;
import com.inn.cafe.service.UserService;
import com.inn.cafe.utils.CafeUtils;
import com.inn.cafe.utils.EmailUtils;
import com.inn.cafe.wrapper.UserWrapper;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Service
public  class UserServiceImpl implements UserService {

    private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserDao userDao;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private JwtFilter jwtFilter;

    @Autowired
    private EmailUtils emailUtils;

    @PersistenceContext
    private EntityManager entityManager;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        log.info("Inside SignUp: {}", requestMap);
        try {
            if (!validateSignUpMap(requestMap)) {
                return CafeUtils.getResponseEntity(CafeConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }

            if (userDao.findByEmail(requestMap.get("email")) != null) {
                return CafeUtils.getResponseEntity("Email Already Exists.", HttpStatus.BAD_REQUEST);
            }

            User user = getUserFromMap(requestMap);
            user.setPassword(new BCryptPasswordEncoder().encode(requestMap.get("password")));
            userDao.save(user);
            return CafeUtils.getResponseEntity("Successfully Registered.", HttpStatus.OK);
        } catch (Exception ex) {
            log.error("Error during sign-up", ex);
            return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private boolean validateSignUpMap(Map<String, String> requestMap) {
        return requestMap.containsKey("name") && requestMap.containsKey("contactNumber") &&
               requestMap.containsKey("email") && requestMap.containsKey("password");
    }

    private User getUserFromMap(Map<String, String> requestMap) {
        User user = new User();
        user.setName(requestMap.get("name"));
        user.setContactNumber(requestMap.get("contactNumber"));
        user.setEmail(requestMap.get("email"));
        user.setStatus("false");
        user.setRole("user");
        return user;
    }

    @Override
    public ResponseEntity<String> login(Map<String, String> requestMap) {
        log.info("Inside login: {}", requestMap);
        try {
            if (!validateLoginMap(requestMap)) {
                return CafeUtils.getResponseEntity(CafeConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }

            User user = userDao.findByEmail(requestMap.get("email"));
            if (user == null || !new BCryptPasswordEncoder().matches(requestMap.get("password"), user.getPassword())) {
                return new ResponseEntity<>("{\"message\":\"Invalid credentials.\"}", HttpStatus.UNAUTHORIZED);
            }

            if (!"true".equalsIgnoreCase(user.getStatus())) {
                return new ResponseEntity<>("{\"message\":\"Wait for admin approval.\"}", HttpStatus.BAD_REQUEST);
            }

            String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
            return new ResponseEntity<>("{\"token\":\"" + token + "\"}", HttpStatus.OK);
        } catch (Exception ex) {
            log.error("Login failed", ex);
            return new ResponseEntity<>("{\"message\":\"An error occurred.\"}", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private boolean validateLoginMap(Map<String, String> requestMap) {
        return requestMap.containsKey("email") && requestMap.containsKey("password");
    }

    @Override
    public ResponseEntity<List<UserWrapper>> getAllUser() {
        try {
            if (jwtFilter.isAdmin()) {
                return new ResponseEntity<>(userDao.getAllUser(), HttpStatus.OK);
            }
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
        } catch (Exception ex) {
            log.error("Error fetching users", ex);
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<String> update(Map<String, String> requestMap) {
        try {
            if (!jwtFilter.isAdmin()) {
                return CafeUtils.getResponseEntity(CafeConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
            
            int id = Integer.parseInt(requestMap.get("id"));
            String status = requestMap.get("status");
            
            if (!userDao.existsById(id)) {
                return CafeUtils.getResponseEntity("User does not exist", HttpStatus.NOT_FOUND);
            }

            userDao.updateStatus(status, id);
            sendMailToAllAdmin(status, userDao.findById(id).get().getEmail(), userDao.getAllAdmin());
            return CafeUtils.getResponseEntity("User status updated successfully", HttpStatus.OK);
        } catch (Exception ex) {
            log.error("Error updating user status", ex);
            return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private void sendMailToAllAdmin(String status, String userEmail, List<String> adminEmails) {
        String subject = status.equalsIgnoreCase("true") ? "Account Approved" : "Account Disabled";
        String message = "User " + userEmail + " has been " + (status.equalsIgnoreCase("true") ? "approved" : "disabled") + " by admin.";
        emailUtils.sendSimpleMessage(jwtFilter.getCurrentUser(), subject, message, adminEmails);
    }

    @Override
    public ResponseEntity<String> checkToken() {
    	
//		try {
//			
//		}catch(Exception ex) {
//			ex.printStackTrace();
//		}
    	return CafeUtils.getResponseEntity("true", HttpStatus.OK);
    }
    
//    @Override
//    public ResponseEntity<String> changePassword(Map<String, String> requestMap) {
//        try {
//            User userObj = userDao.findByEmailid(jwtFilter.getCurrentUser());
//            if (!userObj.equals(null)) {
//            	if(userObj.getPassword().equals(requestMap.get("oldPassword"))) {
//            		userObj.setPassword(requestMap.get("newPassword"));
//            		userDao.save(userObj);
//            		return CafeUtils.getResponseEntity("Password Update Successfully.", HttpStatus.OK);
//            	}
//            	return CafeUtils.getResponseEntity("Incorrect Old Pssword.",HttpStatus.BAD_REQUEST);
//            }
//            return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG,HttpStatus.INTERNAL_SERVER_ERROR );
//        } catch (Exception ex) {
//            log.error("Error changing password", ex);
//            ex.printStackTrace();
//            return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
    
    @Override
    public ResponseEntity<String> changePassword(Map<String, String> requestMap) {
        try {
            String email = jwtFilter.getCurrentUser(); // should now return valid email
            System.out.println("Email from token: " + email);

            User userObj = userDao.findByEmail(email); // update method if needed

            if (userObj == null) {
                return CafeUtils.getResponseEntity("User not found", HttpStatus.BAD_REQUEST);
            }

            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

            if (!encoder.matches(requestMap.get("oldPassword"), userObj.getPassword())) {
                return CafeUtils.getResponseEntity("Incorrect old password", HttpStatus.BAD_REQUEST);
            }

            userObj.setPassword(encoder.encode(requestMap.get("newPassword")));
            userDao.save(userObj);

            return CafeUtils.getResponseEntity("Password updated successfully", HttpStatus.OK);
        } catch (Exception ex) {
            ex.printStackTrace();
            log.error("Error changing password", ex);
            return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

	@Override
	public ResponseEntity<String> forgotPassword(Map<String, String> requestMap) {
		try {
			User user = userDao.findByEmail(requestMap.get("email"));
			if(!Objects.isNull(user) && !Strings.isNullOrEmpty(user.getEmail())) 
				
				emailUtils.forgotEmail(user.getEmail(),"Credentials By Cafe FlavourHut",user.getPassword());
				return CafeUtils.getResponseEntity("Check Your Mail For Credentials", HttpStatus.OK);
			
		}catch(Exception ex) {
			ex.printStackTrace();
		}
		
		return CafeUtils.getResponseEntity(CafeConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
