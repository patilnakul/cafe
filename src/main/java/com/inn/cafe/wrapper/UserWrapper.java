package com.inn.cafe.wrapper;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserWrapper {
 
	@JsonProperty
	private Integer Id;
	
	@JsonProperty
	private String name;
	
	@JsonProperty
	private String email;
	
	@JsonProperty
	private String contactNumber;
	
	@JsonProperty
	private String status ;
	
	

	public UserWrapper(Integer Id, String name, String email, String contactNumber, String status) {
		super();
		this.Id = Id;
		this.name = name;
		this.email = email;
		this.contactNumber = contactNumber;
		this.status = status;
	}

	public Integer getId() {
		return Id;
	}

	public void setId(Integer Id) {
		this.Id = Id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	
	
	
}
