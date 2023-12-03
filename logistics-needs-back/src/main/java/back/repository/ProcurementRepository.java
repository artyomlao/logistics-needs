package back.repository;

import back.entity.ProcurementEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcurementRepository extends JpaRepository<ProcurementEntity, Long> {
}
