package back.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
public class ProcurementModel {

    private String name;
    private String description;
    private Long quantity;
    private Double price;
    private LocalDateTime purchaseTime;
    private Long userId;
}

