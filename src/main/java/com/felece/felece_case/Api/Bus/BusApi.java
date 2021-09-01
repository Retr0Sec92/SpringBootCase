package com.felece.felece_case.Api.Bus;

import com.felece.felece_case.Models.Bus.Bus;
import com.felece.felece_case.Models.Search.BusSearch;
import com.felece.felece_case.Services.Bus.BusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/v1/bus")
@RequiredArgsConstructor
public class BusApi {
    private final BusService busService;

    @GetMapping
    public ResponseEntity<Flux<Bus>> getDestinations() {
        return ResponseEntity.ok().body(busService.getAllBuses());
    }

    @PostMapping("/search")
    public ResponseEntity<Flux<Bus>> getBusSearch(@RequestBody BusSearch busSearch) {
        return ResponseEntity.ok().body(busService.getBusSearch(busSearch));
    }

    @PostMapping
    public ResponseEntity<Flux<Bus>> saveDestination(@RequestBody Bus bus) {
        return ResponseEntity.ok().body(busService.saveBus(bus));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Flux<Bus>> deleteDestination(@PathVariable String id) {
        return ResponseEntity.ok().body(busService.deleteBus(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Flux<Bus>> updateDestination(@PathVariable String id ,@RequestBody Bus bus) {
        return ResponseEntity.ok().body(busService.updateBus(id,bus));
    }
}
