package back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Entity
@Table(name = "documents")
@Getter @Setter
@Accessors(chain = true)
public class DocumentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String name;

    @Column(name = "procurement_id")
    private Long procurementId;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id", name = "procurement_id", insertable = false, updatable = false)
    private ProcurementEntity procurement;
}
