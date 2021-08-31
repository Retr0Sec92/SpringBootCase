package com.felece.felece_case.Repo.Destination;

import com.felece.felece_case.Models.Destination.Destination;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface DestinationRepo extends ReactiveMongoRepository<Destination, String> {
}
