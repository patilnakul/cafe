package com.inn.cafe.JWT;

import java.util.ArrayList;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.inn.cafe.dao.UserDao;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Slf4j
@Service

public class CustomerUserDetailsService implements UserDetailsService {

	@Autowired
	UserDao userDao ;
	private com.inn.cafe.POJO.User userDetail;
	
	
	private static final Logger log = LoggerFactory.getLogger(CustomerUserDetailsService.class);
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		log.info("inside loadUserByUsername {}" ,username);
		
		userDetail = userDao.findByEmail(username);
		if(!Objects.isNull(userDetail))
			return new User(userDetail.getEmail(),userDetail.getPassword(), new ArrayList<>());
		else
			throw new UsernameNotFoundException("User Not Found");
	}
	public com.inn.cafe.POJO.User getUserDetails(){
		
		return userDetail;
		
	}
	
}
