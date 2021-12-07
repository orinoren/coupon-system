package com.orinoren318598984.full_project.service;

import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@NoArgsConstructor
public class QueryUtils {
    public String getSearchQuery(Optional<List<Integer>> categorySearch , Optional<Double> maxPriceSearch,String searchInput){
        String query = "";
        if (categorySearch.isPresent()) {
            query += "(";
            for (int i = 0; i < categorySearch.get().size(); i++) {
                if (i != categorySearch.get().size() - 1) {
                    query += "c.category=" + categorySearch.get().get(i) + " " + "or" + " ";
                } else {
                    query += "c.category=" + categorySearch.get().get(i) + ")" + " ";
                }
            }
        }
        if (maxPriceSearch.isPresent()) {
            query += "and c.price<" + maxPriceSearch.get() + "\n";
            query += "and c.title Like '%" + searchInput + "%'\n";
        } else {
            query += "c.title Like '%" + searchInput + "%'\n";
        }
        query += "group by \n" + "c.id\n" + "order by count(*)\n" +
                "desc";

        return query;
    }
}
