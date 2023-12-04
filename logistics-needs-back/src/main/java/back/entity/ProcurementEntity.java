package back.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "procurement")
@Getter @Setter
@Accessors(chain = true)
public class ProcurementEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "procurement_generator")
    @SequenceGenerator(name = "procurement_generator", sequenceName = "procurement_sq", allocationSize = 1)
    private Long id;

    @Column
    private String name;

    @Column
    private String description;

    @Column
    private Long quantity;

    @Column
    private Double price;

    @Column(name = "purchase_time")
    private LocalDateTime purchaseTime;

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    @JsonIgnore
    private UserEntity user;

    @OneToMany(mappedBy = "procurement")
    private List<DocumentEntity> documents;

    @OneToMany(mappedBy = "procurement")
    private List<ProviderEntity> providers;
}
