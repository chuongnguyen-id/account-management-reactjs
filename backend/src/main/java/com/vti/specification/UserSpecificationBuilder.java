package com.vti.specification;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.vti.dto.filter.UserFilter;
import com.vti.entity.User;

public class UserSpecificationBuilder {

	private UserFilter filter;
	private String search;

	public UserSpecificationBuilder(UserFilter filter, String search) {
		this.filter = filter;
		this.search = search;
	}

	@SuppressWarnings("deprecation")
	public Specification<User> build() {

		SearchCriteria seachCriteria = new SearchCriteria("name", "Like", search);
		SearchCriteria minTotalMemberCriteria = new SearchCriteria("totalMember", ">=", filter.getMinTotalMember());
		SearchCriteria maxTotalMemberCriteria = new SearchCriteria("totalMember", "<=", filter.getMaxTotalMember());

		Specification<User> where = null;

		// search
		if (!StringUtils.isEmpty(search)) {
			where = new UserSpecification(seachCriteria);
		}

		// min totalMember filter
		if (filter.getMinTotalMember() != 0) {
			if (where != null) {
				where = where.and(new UserSpecification(minTotalMemberCriteria));
			} else {
				where = new UserSpecification(minTotalMemberCriteria);
			}
		}

		// max totalMember filter
		if (filter.getMaxTotalMember() != 0) {
			if (where != null) {
				where = where.and(new UserSpecification(maxTotalMemberCriteria));
			} else {
				where = new UserSpecification(maxTotalMemberCriteria);
			}
		}

		return where;
	}
}
