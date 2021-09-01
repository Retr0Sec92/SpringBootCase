package com.felece.felece_case.Models.Ticket;

import com.felece.felece_case.Models.Bus.Bus;
import com.felece.felece_case.Models.Side.TicketStatus;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "tickets")
@Builder
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class Ticket {
    @Id
    private String ticketId;
    private String userId;
    private TicketStatus ticketStatus;
    private int count;
    private List<Bus> bus;
}
