package com.orinoren318598984.full_project.model;

public enum CategoryEnum {
	FOOD(1l), ELECTRICITY(2l), RESTAURANT(3l), VACATION(4l), HOME_PRODUCTS(5l), CLOTHING_PRODUCTS(6l);

	private Long categoryEnumId;

	private CategoryEnum(Long categoryEnumId) {
		this.categoryEnumId = categoryEnumId;
	}

	public Long getCategoryEnumId() {
		return categoryEnumId;
	}

}
