package back.entity;

import back.entity.enumerations.Role;
import back.entity.enumerations.Status;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@Getter @Setter
@NoArgsConstructor
@Accessors(chain = true)
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String email;

    @Column
    @JsonIgnore
    private String password;

    @Column
    private String name;

    @Enumerated(value = EnumType.STRING)
    @Column
    private Status status;

    @Enumerated(value = EnumType.STRING)
    @Column
    private Role role;

    @Column
    private LocalDateTime registrationTime;

    @OneToMany(mappedBy = "user")
    private List<ProcurementEntity> entities;
}
