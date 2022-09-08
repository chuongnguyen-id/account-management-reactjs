package com.vti.service;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.vti.dto.ChangePublicProfileDTO;
import com.vti.dto.UserDTO;
import com.vti.dto.filter.UserFilter;
import com.vti.entity.User;

public interface IUserService extends UserDetailsService {

//	void createUser(User user);

	User findUserByEmail(String email);

	User findUserByUserName(String username);

	void activeUser(String token);

	void sendConfirmUserRegistrationViaEmail(String email);

	boolean existsUserByEmail(String email);

	boolean existsUserByUserName(String userName);

	void resetPasswordViaEmail(String email);

	void resetPassword(String token, String newPassword);

	void sendResetPasswordViaEmail(String email);

	UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
	
	void changeUserProfile(String username, ChangePublicProfileDTO dto);

	Page<User> getAllUsers(Pageable pageable, UserFilter filter, String search);

	void deleteUsers(List<Integer> ids);

	void updateUser(int id, UserDTO form) throws Exception;

	User getUserByID(int id);

	User createUser(@Valid UserDTO form) throws Exception;

}
