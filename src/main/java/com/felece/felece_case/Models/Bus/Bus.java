package com.felece.felece_case.Models.Bus;

import com.felece.felece_case.Models.Destination.Destination;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "buses")
@Builder
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class Bus {
    @Id
    private  String id;
    private  int totalSpace;
    private  int usedSpace;
    private  Date departure;
    private  Date arrival;
    private  List<Destination> destination;
}
