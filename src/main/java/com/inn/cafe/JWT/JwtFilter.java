package com.inn.cafe.JWT;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtil jwtutil;

	@Autowired
	private CustomerUserDetailsService service;

	Claims claims = null;

	private String username = null;

	@Override
	protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
			FilterChain filterChain) throws ServletException, IOException {
		if (httpServletRequest.getServletPath().matches("/user/login|/user/forgotPassword|/user/signUp")) {
			filterChain.doFilter(httpServletRequest, httpServletResponse);
		} else {
			String authorizationHeader = httpServletRequest.getHeader("Authorization");
			String token = null;
			{
				if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
					token = authorizationHeader.substring(7);
					username = jwtutil.extractUsername(token);
					claims = jwtutil.extractAllClaims(token);
				}
				if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
					UserDetails userDetails = service.loadUserByUsername(username);

					if (jwtutil.validateToken(token, userDetails)) {
						UsernamePasswordAuthenticationToken usernamePasswordAuthentication = new UsernamePasswordAuthenticationToken(
								userDetails, null, userDetails.getAuthorities());

						usernamePasswordAuthentication.setDetails(new WebAuthenticationDetailsSource()
								.buildDetails((HttpServletRequest) httpServletRequest));
						SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthentication);
					}
				}
				filterChain.doFilter(httpServletRequest, httpServletResponse);
			}

		}

	}

	public boolean isAdmin() {
		return "admin".equalsIgnoreCase((String) claims.get("role"));
	}

	public boolean isUser() {
		return "user".equalsIgnoreCase((String) claims.get("role"));
	}

	public String getCurrentUser() {
		return username;
	}
}
