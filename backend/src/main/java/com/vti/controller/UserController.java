package com.vti.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vti.dto.ChangePublicProfileDTO;
import com.vti.dto.ProfileDTO;
import com.vti.dto.UserDTO;
import com.vti.dto.filter.UserFilter;
import com.vti.entity.User;
import com.vti.service.IUserService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/v1/users")
@Validated
public class UserController {

	@Autowired
	private IUserService userService;
	
	@GetMapping()
	public ResponseEntity<?> getAllUsers(
			Pageable pageable, 
			UserFilter filter,
			@RequestParam(required = false) 
			String search) {
		Page<User> entities = userService.getAllUsers(pageable, filter, search);
		return new ResponseEntity<>(entities, HttpStatus.OK);
	}

	@GetMapping(value = "/email/{email}")
	public ResponseEntity<?> existsUserByEmail(@PathVariable(name = "email") String email) {
		// get entity
		boolean result = userService.existsUserByEmail(email);

		// return result
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@GetMapping(value = "/userName/{userName}")
	public ResponseEntity<?> existsUserByUserName(@PathVariable(name = "userName") String userName) {
		// get entity
		boolean result = userService.existsUserByUserName(userName);

		// return result
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@GetMapping("/activeUser")
	// validate: check exists, check not expired
	public ResponseEntity<?> activeUserViaEmail(@RequestParam String token) {
		// active user
		userService.activeUser(token);

		return new ResponseEntity<>("Active success!", HttpStatus.OK);
	}

	// resend confirm
	@GetMapping("/userRegistrationConfirmRequest")
	// validate: email exists, email not active
	public ResponseEntity<?> resendConfirmRegistrationViaEmail(@RequestParam String email) {

		userService.sendConfirmUserRegistrationViaEmail(email);

		return new ResponseEntity<>("We have sent an email. Please check email to active account!", HttpStatus.OK);
	}

	// reset password confirm
	@GetMapping("/resetPasswordRequest")
	// validate: email exists, email not active
	public ResponseEntity<?> sendResetPasswordViaEmail(@RequestParam String email) {

		userService.resetPasswordViaEmail(email);

		return new ResponseEntity<>("We have sent an email. Please check email to reset password!", HttpStatus.OK);
	}

	// resend reset password
	@GetMapping("/resendResetPassword")
	// validate: email exists, email not active
	public ResponseEntity<?> resendResetPasswordViaEmail(@RequestParam String email) {

		userService.sendResetPasswordViaEmail(email);

		return new ResponseEntity<>("We have sent an email. Please check email to reset password!", HttpStatus.OK);
	}

	@GetMapping("/resetPassword")
	// validate: check exists, check not expired
	public ResponseEntity<?> resetPasswordViaEmail(@RequestParam String token, @RequestParam String newPassword) {

		// reset password
		userService.resetPassword(token, newPassword);

		return new ResponseEntity<>("Reset Password success!", HttpStatus.OK);
	}

	@GetMapping("/profile")
	// validate: check exists, check not expired
	public ResponseEntity<?> getUserProfile(Authentication authentication) {
		
		// get username from token
		String username = authentication.getName();
		
		// get user info
		User user = userService.findUserByUserName(username);
		
        // convert user entity to user dto
		ProfileDTO profileDto = new ProfileDTO(
        		user.getUserName(), 
        		user.getEmail(), 
        		user.getFirstName(), 
        		user.getLastName(),
        		user.getRole(),
        		user.getStatus().toString(),
        		user.getAvatarUrl());

		return new ResponseEntity<>(profileDto, HttpStatus.OK);
	}
	
	@PutMapping("/profile")
	// validate: check exists, check not expired
	public ResponseEntity<?> changeUserProfile(Authentication authentication, @RequestBody ChangePublicProfileDTO dto) {
		
		// get username from token
		String username = authentication.getName();
		
		userService.changeUserProfile(username, dto);
		
		return new ResponseEntity<>("Change Profile Successfully!", HttpStatus.OK);
	}

//	@PostMapping()
//	public ResponseEntity<?> createUser(@Valid @RequestBody UserDTO dto) {
//		// create User
//		userService.createUser(dto.toEntity());
//
//		return new ResponseEntity<>("Create successfully!", HttpStatus.OK);
//	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<?> getUserByID(@PathVariable(name = "id") int id) {
		return new ResponseEntity<>(userService.getUserByID(id), HttpStatus.OK);
	}
	
//	@PutMapping(value = "/{id}")
//	public ResponseEntity<?> updateUser(@PathVariable(name = "id") int id, @RequestBody UserDTO form) {
//		userService.updateUser(id, form);
//		return new ResponseEntity<String>("Update successfully!", HttpStatus.OK);
//	}
	
//	@DeleteMapping(value = "/{ids}")
//	public ResponseEntity<?> deleteUsers(@PathVariable(name = "ids") List<Integer> ids) {
//		userService.deleteUsers(ids);
//		return new ResponseEntity<String>("Delete successfully!", HttpStatus.OK);
//	}
	@PostMapping()
	public ResponseEntity<?> createUser(@RequestBody @Valid UserDTO form){
		System.out.println("Data Create => " + form.toString());
		try {
			User user = userService.createUser(form);
			if (user != null) {
				return new ResponseEntity<>(user, HttpStatus.OK);
			} else {
				return new ResponseEntity<>("Create Failed!", HttpStatus.BAD_REQUEST);
			}
			
		} catch (Exception e) {
			return new ResponseEntity<>("Create Failed: " + e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		
	}

	@PutMapping(value = "/{id}")
	public String updateUser(@PathVariable(value = "id") int id, @RequestBody UserDTO form){
		System.out.println("Data Update => " + form.toString());
		try {
			userService.updateUser(id, form);
			return "Update Completed!";
		} catch (Exception e) {
			return "Update Failed: " + e.getMessage();
		}
	}
	
	@DeleteMapping
	public void deleteUsers(@RequestParam(value = "ids") List<Integer> ids){
		userService.deleteUsers(ids);
	}
}
