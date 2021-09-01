package com.felece.felece_case.Repo.Bus;

import com.felece.felece_case.Models.Bus.Bus;
import com.felece.felece_case.Models.Destination.Destination;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface BusRepo extends ReactiveMongoRepository<Bus, String> {
    @Query(value = "{ destination: { $all: [?0] } }")
    public Flux<Bus> findInDestinations(Destination destination);
}
